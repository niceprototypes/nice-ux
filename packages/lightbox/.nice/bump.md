[2026-09-14 22:30] major: Remove getLightboxToken export and src/tokens wrappers — component tokens are read with getToken(name, variant, { prefix: "lightbox" }) from nice-react-styles
[2026-09-16 15:11] patch: getToken call sites migrated to the token address form
[2026-09-25 19:12] patch: Declare nice-* runtime packages as peer dependencies with a file: devDependency for local builds
