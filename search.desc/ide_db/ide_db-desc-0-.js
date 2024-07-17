searchState.loadedDescShard("ide_db", 0, "This crate defines the core datastructure representing IDE …\nType alias for a hashmap using the <code>fx</code> hash algorithm.\nType alias for a hashmap using the <code>fx</code> hash algorithm.\nA speedy hash algorithm for use within rustc. The hashmap …\nRepresentative struct for the query group.\nThis module provides functionality for querying callable …\nThis module defines the <code>Assist</code> data structure. The actual …\n<code>base_db</code> is normally also needed in places where <code>ide_db</code> is …\n<code>NameDefinition</code> keeps information about the element we want …\nDocumentation attribute related utilities.\nSee <code>FamousDefs</code>.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nRandom assortment of ide helpers for high-level ide …\nGet access to extra methods pertaining to this query. You …\nLike <code>in_db</code>, but gives access to methods for setting the …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nThis module has the functionality to search the project …\nSee <code>Label</code>\nSee <code>PathTransform</code>.\nrust-analyzer is lazy and doesn’t compute anything …\nRename infrastructure for rust-analyzer. It is used …\nRustdoc specific doc comment handling\nImplementation of find-usages functionality.\nThis modules defines type to represent changes to the …\nThis module handles fuzzy-searching of functions, structs …\nFunctionality for obtaining data related to traits from …\nThis module contains structures for filtering the expected …\nFunctionality for generating trivial constructors\nReturns information about the call argument this token is …\nReturns a <code>hir::Callable</code> this token is a part of and its …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nAll assists should be resolved.\nUnique identifier of the assist, should not be shown to …\nA way to control how many assist to resolve during the …\nNo assists should be resolved.\nRename the just inserted item.\nOnly a certain assist should be resolved.\nHold the <code>AssistId</code> data of a certain assist to resolve. The …\nShow the parameter hints popup.\nThe id of the assist.\nThe command to execute after the assist is applied.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nShort description of the assist, as shown in the UI.\nComputing source change sometimes is much more costly then …\nTarget ranges are used to sort assists: the smaller the …\n<code>None</code> in <code>if let None = Some(82) {}</code>. Syntactically, it is a …\nThe specific situation where we have an extern crate decl …\nOn a first blush, a single <code>ast::Name</code> defines a single …\nThis is similar to <code>NameClass</code>, but works for <code>ast::NameRef</code> …\n<code>field</code> in <code>if let Foo { field } = foo</code>. Here, <code>ast::Name</code> both …\n<code>Definition</code> defined by this name.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nTextual range of the identifier which will change when …\nA struct to map text ranges from <code>Documentation</code> back to …\nHolds documentation\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nMaps a <code>TextRange</code> relative to the documentation string back …\nHelps with finding well-know things inside the standard …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nGenerated by <code>cargo codegen lint-definitions</code>, do not edit …\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nChecks if the given lint is equal or is contained by the …\nConverts the mod path struct into its ast representation.\nPicks the token with the highest rank returned by the …\nIterates all <code>ModuleDef</code>s and <code>Impl</code> blocks of the given file.\nLook up accessible paths for items.\nHandle syntactic aspects of inserting a new <code>use</code> item.\nHandle syntactic aspects of merging UseTrees.\nRequires items with names that exactly match the given …\nRequires items with names contain all letters from the …\nA struct to find imports in the project, given a certain …\nA candidate for import, derived during various IDE …\nAn import (not necessary the only one) that corresponds a …\nA name that will be used during item lookups.\nA path, qualified (<code>std::collections::HashMap</code>) or not (…\nPath import for a given name, qualified or not.\nRequires items with names that match the given string by …\nA trait associated function (with no self parameter) or an …\nA trait import needed for a given associated item access. …\nA trait method with self parameter. For ‘…\nThe associated item name that the trait to import should …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nThe path to use in the <code>use</code> statement for a given candidate …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nAn item that will be imported with the import path given.\nThe name the item (struct, trait, enum, etc.) should have.\nThe path import candidate, resolved.\nRequires imports to match exactly instead of fuzzily.\nRequires imports to by prefix instead of fuzzily.\nOptional qualifier before name.\nA type of the item that has the associated item accessed …\nThis may return non-absolute paths if a part of the …\nCauses paths to start with <code>crate</code> where applicable, …\nCauses paths to always start with either <code>self</code>, <code>super</code>, <code>crate</code>…\nMerge imports from the same crate into a single use …\nHow imports should be grouped into use statements.\nFlatten imports so that each has its own use statement.\nMerge imports from the same module into a single use …\nMerge all imports into a single use statement as long as …\nCauses paths to not use a self, super or crate prefix.\nDo not change the granularity of any imports and preserve …\nDetermines the containing syntax node in which to insert a …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nInsert an import path into the given file/node. A <code>merge</code> …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nMerge imports from the same crate into a single use …\nMerges all descendant use tree lists with only one child …\nWhat type of merges are allowed.\nMerge imports from the same module into a single use …\nStyle to follow when normalizing a use tree.\nMerge all imports into a single use statement as long as …\nSame as default but wraps the root use tree in a use tree …\nTraverses both paths until they differ, returning the …\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nMerge <code>rhs</code> into <code>lhs</code> keeping both intact. Returned AST is …\nMerge <code>rhs</code> into <code>lhs</code> keeping both intact. Returned AST is …\nNormalizes a use item by:\nNormalizes a use tree (see <code>try_normalize_import</code> doc).\nSearch for the name in the associated items only.\nThree possible ways to search for the name in associated …\nA value to use, when uncertain which limit to pick.\nSearch for the name in other items only.\nSearch for the name in both associated and other items.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nSearches for importable items with the given name in the …\nA type to specify UI label, like an entry in the list of …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\n<code>PathTransform</code> substitutes path in SyntaxNodes in bulk.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nWe’re indexing many crates.\nthe crates that we are currently priming.\nthe total number of crates that have finished priming\nthe total number of crates we want to prime.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nContains the error value\nContains the success value\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nGenerally, <code>search_scope</code> returns files that might contain …\nGet a flags value with all known bits set.\nThe bitwise and (<code>&amp;</code>) of the bits in two flags values.\nThe bitwise and (<code>&amp;</code>) of the bits in two flags values.\nThe bitwise or (<code>|</code>) of the bits in two flags values.\nThe bitwise or (<code>|</code>) of the bits in two flags values.\nGet the underlying bits value.\nThe bitwise exclusive-or (<code>^</code>) of the bits in two flags …\nThe bitwise exclusive-or (<code>^</code>) of the bits in two flags …\nThe bitwise negation (<code>!</code>) of the bits in a flags value, …\nWhether all set bits in a source flags value are also set …\nThe intersection of a source flags value with the …\nGet a flags value with all bits unset.\nBuild an empty search scope.\nThe bitwise or (<code>|</code>) of the bits in each flags value.\nBuild a empty search scope spanning the text range of the …\nBuild a empty search scope spanning the given files.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nConvert from a bits value.\nConvert from a bits value exactly.\nConvert from a bits value, unsetting any unknown bits.\nThe bitwise or (<code>|</code>) of the bits in each flags value.\nGet a flags value with the bits of a flag with the given …\nLimit the search to a given <code>SearchScope</code>.\nEnable searching for <code>Self</code> when the definition is a type or …\nThe bitwise or (<code>|</code>) of the bits in two flags values.\nThe bitwise and (<code>&amp;</code>) of the bits in two flags values.\nWhether any set bits in a source flags value are also set …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nWhether all known bits in this flags value are set.\nWhether all bits in this flags value are unset.\nYield a set of contained flags values.\nYield a set of contained named flags values.\nBuild a search scope spanning the given module and all its …\nThe node of the reference in the (macro-)file\nThe bitwise negation (<code>!</code>) of the bits in a flags value, …\nThe range of the reference in the original file\nThe intersection of a source flags value with the …\nCall <code>insert</code> when <code>value</code> is <code>true</code> or <code>remove</code> when <code>value</code> is …\nLimit the search to a given <code>SearchScope</code>.\nBuild a empty search scope spanning the given file.\nThe intersection of a source flags value with the …\nThe intersection of a source flags value with the …\nThe bitwise exclusive-or (<code>^</code>) of the bits in two flags …\nThe bitwise exclusive-or (<code>^</code>) of the bits in two flags …\nThe bitwise or (<code>|</code>) of the bits in two flags values.\nA placeholder snippet (e.g. <code>${0:placeholder}</code>).\nA group of placeholder snippets, e.g.\nA tabstop snippet (e.g. <code>$0</code>).\nAdds a snippet to move the cursor selected over <code>node</code>\nAdds a snippet to move the cursor selected over <code>nodes</code>\nAdds a snippet to move the cursor selected over <code>token</code>\nAdds a tabstop snippet to place the cursor after <code>node</code>\nAdds a tabstop snippet to place the cursor after <code>token</code>\nAdds a tabstop snippet to place the cursor before <code>node</code>\nAdds a tabstop snippet to place the cursor before <code>token</code>\nInserts all of the snippets into the given text.\nRemove specified <code>range</code> of text.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCreates a new SourceChange with the given label from the …\nAppend specified <code>text</code> at the given <code>offset</code>\nInserts a <code>TextEdit</code> and potentially a <code>SnippetEdit</code> for the …\nInserts a <code>TextEdit</code> for the given <code>FileId</code>. This properly …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nGets the underlying snippet index + text range Tabstops …\nReturns a copy of the <code>node</code>, suitable for mutation.\nMaps the original, immutable <code>SyntaxNode</code> to a …\nRenames the item at the cursor position after the assist …\nReplaces specified <code>range</code> of text with a given string.\nKeeps track of where to place snippets\nTriggers the parameter hint popup after the assist is …\nRepresentative struct for the query group.\nSpecifies whether we want to include associated items in …\nThe symbol indices of modules that make up a given crate.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nGet access to extra methods pertaining to this query. You …\nGet access to extra methods pertaining to this query. You …\nGet access to extra methods pertaining to this query. You …\nGet access to extra methods pertaining to this query. You …\nLike <code>in_db</code>, but gives access to methods for setting the …\nLike <code>in_db</code>, but gives access to methods for setting the …\nLike <code>in_db</code>, but gives access to methods for setting the …\nLike <code>in_db</code>, but gives access to methods for setting the …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nThe set of roots for crates.io libraries. Files in …\nThe symbol index for a given source root within …\nThe set of “local” (that is, from the current …\nThe symbol index for a given module. These modules should …\nSet the value of the <code>library_roots</code> input.\nSet the value of the <code>library_roots</code> input with a specific …\nSet the value of the <code>local_roots</code> input.\nSet the value of the <code>local_roots</code> input with a specific …\nTools to work with format string literals for the …\nTools to work with expressions present in format string …\nReturns the argument unchanged.\nUtilities for formatting macro expanded nodes until we get …\nNB: only valid to call with Output from …\nCalls <code>U::from(self)</code>.\nVarious helper functions to work with SyntaxNodes.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nEnum for representing extracted format string args. Can …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nParser for a format-like string. It is more allowing in …\nAdd placeholders like <code>$1</code> and <code>$2</code> in place of …\nRenders a <code>SyntaxNode</code> with whitespace inserted between …\nCalls <code>cb</code> on each expression inside <code>expr</code> that is at “tail …\nParses the input token tree as comma separated plain paths.\nPreorder walk all the expression’s child expressions …\nReturns the <code>let</code> only if there is exactly one (that is, …\nPreorder walk all the expression’s child expressions.\nPreorder walk all the pattern’s sub patterns.\nPreorder walk all the expression’s child patterns.\nPreorder walk all the type’s sub types.\nGiven the <code>impl</code> block, returns the list of associated items …\nGiven the <code>impl</code> block, attempts to find the trait this <code>impl</code> …\nEnum types that implement <code>std::ops::Try</code> trait.\nReturns the argument unchanged.\nReturns <code>Some(..)</code> if the provided type is an enum that …\nCalls <code>U::from(self)</code>.\ngiven a type return the trivial constructor (if one exists)")