searchState.loadedDescShard("base_db", 0, "base_db defines basic database traits. The concrete DB is …\nPath relative to a file.\nPath relative to a file.\nOptional build metadata identifier. This comes after <code>+</code> in …\nA panic payload indicating that execution of a salsa query …\n<code>CrateGraph</code> is a bit of information which turns a set of …\nOrigin of the crates.\nContains the error value\nEncapsulate a bunch of raw <code>.set</code> calls on the database.\nHandle to a file in <code>Vfs</code>\nSilly workaround for cyclic deps between the traits\nA set of <code>VfsPath</code>s identified by <code>FileId</code>s.\nCrates that are provided by the language, like std, core, …\nCrates that are non member libraries.\nCrates that are workspace members.\nContains the success value\nThe query was operating on revision R, but there is a …\nOptional pre-release identifier on a version string. This …\nThe query was blocked on another thread, and that thread …\nCrates that are from the rustc workspace.\nA <code>VersionReq</code> with no constraint on the version numbers it …\nDatabase which stores all significant input facts: source …\nWe don’t want to give HIR knowledge of source roots, …\nRepresentative struct for the query group.\nRepresentative struct for the query group.\nFiles are grouped into source roots. A source root is a …\n<strong>SemVer version</strong> as defined by https://semver.org.\n<strong>SemVer version requirement</strong> describing the intersection of …\nPath in <code>Vfs</code>.\nFile that this path is relative to.\nFile that this path is relative to.\nReturns the <code>AbsPath</code> representation of <code>self</code> if <code>self</code> is on …\nRuns <code>f</code>, and catches any salsa cancellation.\nCompare the major, minor, patch, and pre-release value of …\nThe crate graph.\nReturns all crates in the graph, sorted in topological …\nA name used in the package’s project declaration: for …\nExtends this crate graph by adding a complete disjoint …\nGet the id corresponding to <code>path</code> if it exists in the set.\nPath to a file, relative to the root of its source root. …\nText of the file.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nGet access to extra methods pertaining to this query. You …\nGet access to extra methods pertaining to this query. You …\nGet access to extra methods pertaining to this query. You …\nGet access to extra methods pertaining to this query. You …\nGet access to extra methods pertaining to this query. You …\nGet access to extra methods pertaining to this query. You …\nGet access to extra methods pertaining to this query. You …\nGet access to extra methods pertaining to this query. You …\nGet access to extra methods pertaining to this query. You …\nGet access to extra methods pertaining to this query. You …\nLike <code>in_db</code>, but gives access to methods for setting the …\nLike <code>in_db</code>, but gives access to methods for setting the …\nLike <code>in_db</code>, but gives access to methods for setting the …\nLike <code>in_db</code>, but gives access to methods for setting the …\nLike <code>in_db</code>, but gives access to methods for setting the …\nLike <code>in_db</code>, but gives access to methods for setting the …\nLike <code>in_db</code>, but gives access to methods for setting the …\nLike <code>in_db</code>, but gives access to methods for setting the …\nLike <code>in_db</code>, but gives access to methods for setting the …\nLike <code>in_db</code>, but gives access to methods for setting the …\nInsert the <code>file_id, path</code> pair into the set.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nSysroot or crates.io library.\nWhether this dependency is to be added to the depending …\nWhether this dependency is a sysroot injected one.\nIterate over this set’s ids.\nCreates a new <code>VfsPath</code> with <code>path</code> adjoined to <code>self</code>.\nReturns the number of stored paths.\nEvaluate whether the given <code>Version</code> satisfies the version …\nReturns <code>self</code>’s base name and file extension.\nCreates a crate name, checking for dashes in the string …\nCreate <code>Version</code> with an empty pre-release and build …\nCreate a path from string. Input should be a string …\nCreates an “in-memory” path from <code>/</code>-separated string.\nCreates a crate name, unconditionally replacing the dashes …\nReturns the <code>VfsPath</code> without its final component, if there …\nParses the file into the syntax tree.\nCreate <code>Version</code> by parsing from string representation.\nCreate <code>VersionReq</code> by parsing from string representation.\nReturns the set of errors obtained from parsing the file …\nPath relative to <code>anchor</code>’s containing directory.\nPath relative to <code>anchor</code>’s containing directory.\nGet the path corresponding to <code>file</code> if it exists in the set.\nRemove the last component of <code>self</code> if there is one.\nThe cfg options that could be used by the crate\nCrates whose root’s source root is the same as the …\nRemove the crate from crate graph. If any crates depend on …\nRemoves all crates from this crate graph except for the …\nGet the id of the file corresponding to <code>path</code>.\nSet the value of the <code>compressed_file_text</code> input.\nSet the value of the <code>compressed_file_text</code> input with a …\nSet the value of the <code>crate_graph</code> input.\nSet the value of the <code>crate_graph</code> input with a specific …\nSet the value of the <code>data_layout</code> input.\nSet the value of the <code>data_layout</code> input with a specific …\nSet the value of the <code>file_source_root</code> input.\nSet the value of the <code>file_source_root</code> input with a …\nSet the value of the <code>source_root</code> input.\nSet the value of the <code>source_root</code> input with a specific …\nSet the value of the <code>toolchain</code> input.\nSet the value of the <code>toolchain</code> input with a specific …\nContents of the source root.\nCrates whose root fool is in <code>id</code>.\nReturns <code>true</code> if <code>other</code> is a prefix of <code>self</code>.\nReturns an iterator over all transitive dependencies of …\nReturns all transitive reverse dependencies of the given …")