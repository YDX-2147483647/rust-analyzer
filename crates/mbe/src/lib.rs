//! `mbe` (short for Macro By Example) crate contains code for handling
//! `macro_rules` macros. It uses `TokenTree` (from `tt` package) as the
//! interface, although it contains some code to bridge `SyntaxNode`s and
//! `TokenTree`s as well!
//!
//! The tests for this functionality live in another crate:
//! `hir_def::macro_expansion_tests::mbe`.

mod expander;
mod parser;
mod syntax_bridge;
mod to_parser_input;

#[cfg(test)]
mod benchmark;

use span::{Edition, Span, SyntaxContextId};
use stdx::impl_from;
use tt::iter::TtIter;

use std::fmt;

use crate::parser::{MetaTemplate, MetaVarKind, Op};

// FIXME: we probably should re-think  `token_tree_to_syntax_node` interfaces
pub use ::parser::TopEntryPoint;
pub use tt::{Delimiter, DelimiterKind, Punct};

pub use crate::syntax_bridge::{
    desugar_doc_comment_text, parse_exprs_with_sep, parse_to_token_tree,
    parse_to_token_tree_static_span, syntax_node_to_token_tree, syntax_node_to_token_tree_modified,
    token_tree_to_syntax_node, DocCommentDesugarMode, SpanMapper,
};

pub use crate::syntax_bridge::dummy_test_span_utils::*;

#[derive(Debug, PartialEq, Eq, Clone)]
pub enum ParseError {
    UnexpectedToken(Box<str>),
    Expected(Box<str>),
    InvalidRepeat,
    RepetitionEmptyTokenTree,
}

impl ParseError {
    fn expected(e: &str) -> ParseError {
        ParseError::Expected(e.into())
    }

    fn unexpected(e: &str) -> ParseError {
        ParseError::UnexpectedToken(e.into())
    }
}

impl fmt::Display for ParseError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ParseError::UnexpectedToken(it) => f.write_str(it),
            ParseError::Expected(it) => f.write_str(it),
            ParseError::InvalidRepeat => f.write_str("invalid repeat"),
            ParseError::RepetitionEmptyTokenTree => f.write_str("empty token tree in repetition"),
        }
    }
}

#[derive(Debug, PartialEq, Eq, Clone, Hash)]
pub enum ExpandError {
    BindingError(Box<Box<str>>),
    UnresolvedBinding(Box<Box<str>>),
    LeftoverTokens,
    ConversionError,
    LimitExceeded,
    NoMatchingRule,
    UnexpectedToken,
    CountError(CountError),
}

impl_from!(CountError for ExpandError);

impl ExpandError {
    fn binding_error(e: impl Into<Box<str>>) -> ExpandError {
        ExpandError::BindingError(Box::new(e.into()))
    }
}

impl fmt::Display for ExpandError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ExpandError::NoMatchingRule => f.write_str("no rule matches input tokens"),
            ExpandError::UnexpectedToken => f.write_str("unexpected token in input"),
            ExpandError::BindingError(e) => f.write_str(e),
            ExpandError::UnresolvedBinding(binding) => {
                f.write_str("could not find binding ")?;
                f.write_str(binding)
            }
            ExpandError::ConversionError => f.write_str("could not convert tokens"),
            ExpandError::LimitExceeded => f.write_str("Expand exceed limit"),
            ExpandError::LeftoverTokens => f.write_str("leftover tokens"),
            ExpandError::CountError(e) => e.fmt(f),
        }
    }
}

// FIXME: Showing these errors could be nicer.
#[derive(Debug, PartialEq, Eq, Clone, Hash)]
pub enum CountError {
    OutOfBounds,
    Misplaced,
}

impl fmt::Display for CountError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            CountError::OutOfBounds => f.write_str("${count} out of bounds"),
            CountError::Misplaced => f.write_str("${count} misplaced"),
        }
    }
}

/// Index of the matched macro arm on successful expansion.
pub type MatchedArmIndex = Option<u32>;

/// This struct contains AST for a single `macro_rules` definition. What might
/// be very confusing is that AST has almost exactly the same shape as
/// `tt::TokenTree`, but there's a crucial difference: in macro rules, `$ident`
/// and `$()*` have special meaning (see `Var` and `Repeat` data structures)
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct DeclarativeMacro {
    rules: Box<[Rule]>,
    err: Option<Box<ParseError>>,
}

#[derive(Clone, Debug, PartialEq, Eq)]
struct Rule {
    lhs: MetaTemplate,
    rhs: MetaTemplate,
}

impl DeclarativeMacro {
    pub fn from_err(err: ParseError) -> DeclarativeMacro {
        DeclarativeMacro { rules: Box::default(), err: Some(Box::new(err)) }
    }

    /// The old, `macro_rules! m {}` flavor.
    pub fn parse_macro_rules(
        tt: &tt::Subtree<Span>,
        edition: impl Copy + Fn(SyntaxContextId) -> Edition,
        // FIXME: Remove this once we drop support for rust 1.76 (defaults to true then)
        new_meta_vars: bool,
    ) -> DeclarativeMacro {
        // Note: this parsing can be implemented using mbe machinery itself, by
        // matching against `$($lhs:tt => $rhs:tt);*` pattern, but implementing
        // manually seems easier.
        let mut src = TtIter::new(tt);
        let mut rules = Vec::new();
        let mut err = None;

        while src.len() > 0 {
            let rule = match Rule::parse(edition, &mut src, new_meta_vars) {
                Ok(it) => it,
                Err(e) => {
                    err = Some(Box::new(e));
                    break;
                }
            };
            rules.push(rule);
            if let Err(()) = src.expect_char(';') {
                if src.len() > 0 {
                    err = Some(Box::new(ParseError::expected("expected `;`")));
                }
                break;
            }
        }

        for Rule { lhs, .. } in &rules {
            if let Err(e) = validate(lhs) {
                err = Some(Box::new(e));
                break;
            }
        }

        DeclarativeMacro { rules: rules.into_boxed_slice(), err }
    }

    /// The new, unstable `macro m {}` flavor.
    pub fn parse_macro2(
        args: Option<&tt::Subtree<Span>>,
        body: &tt::Subtree<Span>,
        edition: impl Copy + Fn(SyntaxContextId) -> Edition,
        // FIXME: Remove this once we drop support for rust 1.76 (defaults to true then)
        new_meta_vars: bool,
    ) -> DeclarativeMacro {
        let mut rules = Vec::new();
        let mut err = None;

        if let Some(args) = args {
            cov_mark::hit!(parse_macro_def_simple);

            let rule = (|| {
                let lhs = MetaTemplate::parse_pattern(edition, args)?;
                let rhs = MetaTemplate::parse_template(edition, body, new_meta_vars)?;

                Ok(crate::Rule { lhs, rhs })
            })();

            match rule {
                Ok(rule) => rules.push(rule),
                Err(e) => err = Some(Box::new(e)),
            }
        } else {
            cov_mark::hit!(parse_macro_def_rules);
            let mut src = TtIter::new(body);
            while src.len() > 0 {
                let rule = match Rule::parse(edition, &mut src, new_meta_vars) {
                    Ok(it) => it,
                    Err(e) => {
                        err = Some(Box::new(e));
                        break;
                    }
                };
                rules.push(rule);
                if let Err(()) = src.expect_any_char(&[';', ',']) {
                    if src.len() > 0 {
                        err = Some(Box::new(ParseError::expected(
                            "expected `;` or `,` to delimit rules",
                        )));
                    }
                    break;
                }
            }
        }

        for Rule { lhs, .. } in &rules {
            if let Err(e) = validate(lhs) {
                err = Some(Box::new(e));
                break;
            }
        }

        DeclarativeMacro { rules: rules.into_boxed_slice(), err }
    }

    pub fn err(&self) -> Option<&ParseError> {
        self.err.as_deref()
    }

    pub fn num_rules(&self) -> usize {
        self.rules.len()
    }

    pub fn expand(
        &self,
        tt: &tt::Subtree<Span>,
        marker: impl Fn(&mut Span) + Copy,
        new_meta_vars: bool,
        call_site: Span,
        def_site_edition: Edition,
    ) -> ExpandResult<(tt::Subtree<Span>, MatchedArmIndex)> {
        expander::expand_rules(&self.rules, tt, marker, new_meta_vars, call_site, def_site_edition)
    }
}

impl Rule {
    fn parse(
        edition: impl Copy + Fn(SyntaxContextId) -> Edition,
        src: &mut TtIter<'_, Span>,
        new_meta_vars: bool,
    ) -> Result<Self, ParseError> {
        let lhs = src.expect_subtree().map_err(|()| ParseError::expected("expected subtree"))?;
        src.expect_char('=').map_err(|()| ParseError::expected("expected `=`"))?;
        src.expect_char('>').map_err(|()| ParseError::expected("expected `>`"))?;
        let rhs = src.expect_subtree().map_err(|()| ParseError::expected("expected subtree"))?;

        let lhs = MetaTemplate::parse_pattern(edition, lhs)?;
        let rhs = MetaTemplate::parse_template(edition, rhs, new_meta_vars)?;

        Ok(crate::Rule { lhs, rhs })
    }
}

fn validate(pattern: &MetaTemplate) -> Result<(), ParseError> {
    for op in pattern.iter() {
        match op {
            Op::Subtree { tokens, .. } => validate(tokens)?,
            Op::Repeat { tokens: subtree, separator, .. } => {
                // Checks that no repetition which could match an empty token
                // https://github.com/rust-lang/rust/blob/a58b1ed44f5e06976de2bdc4d7dc81c36a96934f/src/librustc_expand/mbe/macro_rules.rs#L558
                let lsh_is_empty_seq = separator.is_none() && subtree.iter().all(|child_op| {
                    match *child_op {
                        // vis is optional
                        Op::Var { kind: Some(kind), .. } => kind == MetaVarKind::Vis,
                        Op::Repeat {
                            kind: parser::RepeatKind::ZeroOrMore | parser::RepeatKind::ZeroOrOne,
                            ..
                        } => true,
                        _ => false,
                    }
                });
                if lsh_is_empty_seq {
                    return Err(ParseError::RepetitionEmptyTokenTree);
                }
                validate(subtree)?
            }
            _ => (),
        }
    }
    Ok(())
}

pub type ExpandResult<T> = ValueResult<T, ExpandError>;

#[derive(Debug, Clone, Eq, PartialEq)]
pub struct ValueResult<T, E> {
    pub value: T,
    pub err: Option<E>,
}

impl<T: Default, E> Default for ValueResult<T, E> {
    fn default() -> Self {
        Self { value: Default::default(), err: Default::default() }
    }
}

impl<T, E> ValueResult<T, E> {
    pub fn new(value: T, err: E) -> Self {
        Self { value, err: Some(err) }
    }

    pub fn ok(value: T) -> Self {
        Self { value, err: None }
    }

    pub fn only_err(err: E) -> Self
    where
        T: Default,
    {
        Self { value: Default::default(), err: Some(err) }
    }

    pub fn zip_val<U>(self, other: U) -> ValueResult<(T, U), E> {
        ValueResult { value: (self.value, other), err: self.err }
    }

    pub fn map<U>(self, f: impl FnOnce(T) -> U) -> ValueResult<U, E> {
        ValueResult { value: f(self.value), err: self.err }
    }

    pub fn map_err<E2>(self, f: impl FnOnce(E) -> E2) -> ValueResult<T, E2> {
        ValueResult { value: self.value, err: self.err.map(f) }
    }

    pub fn result(self) -> Result<T, E> {
        self.err.map_or(Ok(self.value), Err)
    }
}

impl<T: Default, E> From<Result<T, E>> for ValueResult<T, E> {
    fn from(result: Result<T, E>) -> Self {
        result.map_or_else(Self::only_err, Self::ok)
    }
}

fn expect_fragment<S: Copy + fmt::Debug>(
    tt_iter: &mut TtIter<'_, S>,
    entry_point: ::parser::PrefixEntryPoint,
    edition: ::parser::Edition,
) -> ExpandResult<Option<tt::TokenTree<S>>> {
    use ::parser;
    let buffer = tt::buffer::TokenBuffer::from_tokens(tt_iter.as_slice());
    let parser_input = to_parser_input::to_parser_input(&buffer);
    let tree_traversal = entry_point.parse(&parser_input, edition);
    let mut cursor = buffer.begin();
    let mut error = false;
    for step in tree_traversal.iter() {
        match step {
            parser::Step::Token { kind, mut n_input_tokens } => {
                if kind == ::parser::SyntaxKind::LIFETIME_IDENT {
                    n_input_tokens = 2;
                }
                for _ in 0..n_input_tokens {
                    cursor = cursor.bump_subtree();
                }
            }
            parser::Step::FloatSplit { .. } => {
                // FIXME: We need to split the tree properly here, but mutating the token trees
                // in the buffer is somewhat tricky to pull off.
                cursor = cursor.bump_subtree();
            }
            parser::Step::Enter { .. } | parser::Step::Exit => (),
            parser::Step::Error { .. } => error = true,
        }
    }

    let err = if error || !cursor.is_root() {
        Some(ExpandError::binding_error(format!("expected {entry_point:?}")))
    } else {
        None
    };

    let mut curr = buffer.begin();
    let mut res = vec![];

    while curr != cursor {
        let Some(token) = curr.token_tree() else { break };
        res.push(token.cloned());
        curr = curr.bump();
    }

    *tt_iter = TtIter::new_iter(tt_iter.as_slice()[res.len()..].iter());
    let res = match &*res {
        [] | [_] => res.pop(),
        [first, ..] => Some(tt::TokenTree::Subtree(tt::Subtree {
            delimiter: Delimiter::invisible_spanned(first.first_span()),
            token_trees: res.into_boxed_slice(),
        })),
    };
    ExpandResult { value: res, err }
}
