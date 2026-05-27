[2026-05-27 00:15] major: Rename mode prop → theme prop across Tile, TileContent, ContentMain, TileLayout; consume renamed Theme component and ThemeType from nice-react-styles.

- TileProps.mode?: ModeType → theme?: ThemeType
- ContentMainProps.mode?: ModeType → theme?: ThemeType
- TileContentProps.mode?: ModeType → theme?: ThemeType
- Tile.tsx: Mode import → Theme import; <Mode name={mode}> wrap → <Theme name={theme}>
- ContentMain.tsx / TileContent.tsx / TileLayout.tsx: mode destructure → theme; mode={mode} pass-through → theme={theme}
- getTileToken / getTileTokenKey / getTileTokenValue: variantOrMode/mode parameters → variantOrTheme/theme

Consumer migration: every Tile/TileContent/ContentMain call site passing mode={…} must rename to theme={…}.
