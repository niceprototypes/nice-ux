[2026-05-27 00:30] major: Rename mode prop → theme prop on Image; ImageModeType → ImageThemeType; consume renamed Theme component and ThemeType from nice-react-styles.

- ImageProps.mode?: ImageModeType → theme?: ImageThemeType
- Type alias ImageModeType → ImageThemeType
- Namespace entry ImageTypes.Mode → ImageTypes.Theme
- Image.tsx: Mode import → Theme import; withMode helper → withTheme; <Mode name={mode}> wrap → <Theme name={theme}>
- getImageToken / getImageTokenKey / getImageTokenValue: variantOrMode/mode parameters → variantOrTheme/theme

Consumer migration: every <Image> call site passing mode={…} must rename to theme={…}.

[2026-05-26 02:15] minor: Add aspectRatio prop to Image — string-typed CSS aspect-ratio value applied via the shared sharedStyles fragment, so it works for both as="img" and as="div" rendering paths.
