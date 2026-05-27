[2026-05-27 00:45] major: Rename mode prop → theme prop on Typography; TypographyModeType → TypographyThemeType; consume renamed Theme component and ThemeType from nice-react-styles.

- TypographyProps.mode?: TypographyModeType → theme?: TypographyThemeType
- Type alias TypographyModeType → TypographyThemeType
- Namespace entry TypographyTypes.Mode → TypographyTypes.Theme
- Typography.tsx: Mode import → Theme import; mode destructure → theme; <Mode name={mode}> wrap → <Theme name={theme}>; antialiased default still derives from theme === "night"
- getTypographyToken / getTypographyTokenKey / getTypographyTokenValue: variantOrMode/mode parameters → variantOrTheme/theme

Consumer migration: every <Typography> call site passing mode={…} must rename to theme={…}.
