[2026-05-23 20:07] patch: Drop unused `rollup-plugin-peer-deps-external` devDependency — externalization is now handled by `nice-configuration/rollup`'s built-in peerDependencies reader. No build-output change.
[2026-05-19 14:37] patch: Adapt to nice-styles getConstant flip — getGapSize drops .var accessor (getConstant now returns the bare CSS variable string). Public API unchanged.
[2026-05-20 15:09] major: Rename Flex prop `mode` to `type` (FlexModeType → FlexTypeType) to disambiguate from day/night ModeType. Consumers must rename `mode` to `type` on `<Flex>`.
