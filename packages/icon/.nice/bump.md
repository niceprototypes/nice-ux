[2026-05-27 01:00] major: Rename mode prop → theme prop on Icon; consume renamed Theme component and ThemeType from nice-react-styles.

- IconProps.mode?: ModeType → theme?: ThemeType
- Icon.tsx: Mode import → Theme import; mode destructure → theme; withMode helper → withTheme; <Mode name={mode}> wrap → <Theme name={theme}>
- getIconToken / getIconTokenKey / getIconTokenValue: variantOrMode/mode parameters → variantOrTheme/theme

Consumer migration: every <Icon> call site passing mode={…} must rename to theme={…}.

Note: "outlined mode" in getIcon.ts JSDoc refers to icon rendering style (outlined vs filled), not theming — left unchanged.
