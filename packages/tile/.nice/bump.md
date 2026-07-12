[2026-06-12 17:30] major: Change Tile maxWidth from a pixel number to a CSS length string ("980px" not 980); add minWidth, minHeight, and maxHeight props for sizing the tile box
[2026-06-19 19:44] patch: Migrate getToken-family calls to the options-object signature (nice-styles major). Internal refactor — rendered output unchanged; rebuild required for dependents.
[2026-06-21 21:06] patch: Drive prop-set background-color, color and background-size from tile component tokens (getTileToken) instead of the core tokens, overridable per-subtree via --np--tile--*. Rendered output unchanged at defaults

[2026-07-11 12:10] patch: TileLayout's OuterFlex spacing prop -> padding, tracking nice-react-flex's spacing->padding rename. Rendered output unchanged.
