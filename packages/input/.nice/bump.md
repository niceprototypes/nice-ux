[2026-05-27 01:15] major: Rename mode prop → theme prop on Input; consume renamed Theme component and ThemeType from nice-react-styles.

- InputProps.mode?: ModeType → theme?: ThemeType
- Namespace entry InputTypes.Mode → InputTypes.Theme
- Input.tsx: Mode import → Theme import; mode destructure → theme; <Mode name={mode}> wrap → <Theme name={theme}>
- getInputToken / getInputTokenKey / getInputTokenValue: variantOrMode/mode parameters → variantOrTheme/theme
- getStatusToken JSDoc: "mode-awareness via cascade" → "theme-awareness via cascade"

Consumer migration: every <Input> call site passing mode={…} must rename to theme={…}.
