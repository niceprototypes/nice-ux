[2026-09-14 22:30] major: Remove getImageToken export and src/tokens wrappers — component tokens are read with getToken(name, variant, { prefix: "image" }) from nice-react-styles
[2026-09-16 15:11] patch: getToken call sites migrated to the token address form
[2026-09-17 14:34] minor: borderColor accepts the object form — { name, transform } for channel-adjusted colours, resolved through resolveColorProp
