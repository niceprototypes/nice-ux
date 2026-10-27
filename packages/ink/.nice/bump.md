[2026-09-14 22:30] major: Remove getInkToken export and src/tokens wrappers — component tokens are read with getToken(name, variant, { prefix: "ink" }) from @niceprototypes/styles
[2026-09-16 15:11] patch: getToken call sites migrated to the token address form
[2026-09-16 16:21] minor: color prop accepts the object form — { name, transform } for channel-adjusted colours
[2026-09-25 19:10] patch: Declare nice-* runtime packages as peer dependencies with a file: devDependency for local builds
[2026-09-26 16:03] minor: Ink forwards an id prop to its element, so a heading or span can be an in-page anchor target.
[2026-09-26 16:19] major: Ink renders a <span> by default (was <p>). Pass as="p" where a paragraph element is needed.
[2026-10-15 15:30] minor: Add an italic prop to Ink that renders the text with font-style: italic
[2026-10-15 15:30] patch: Ink reads its own ink.fontFamily / ink.fontSize / ink.fontWeight / ink.lineHeight tokens, so setTokens({ ink: { … } }) now restyles it
