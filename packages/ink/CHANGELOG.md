# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.2] - 2025-11-12

### Changed

- **Refactored CSS fallback handling**: Split CSS variables and fallback values into separate props
  - `$size` now defaults to `var(--typography-size-default)` with `$sizeFallback` defaulting to `1rem`
  - `$weight` now defaults to `var(--typography-weight-default)` with `$weightFallback` defaulting to `normal`
  - `$fontFamily` now defaults to `var(--font-family-heading)` with `$fontFamilyFallback` defaulting to `inherit`
  - CSS now outputs both the variable and fallback as separate declarations for better browser compatibility

### Added

- **New service**: `getEffectiveColor` - Extracts color determination logic into a dedicated service
  - Consistent with existing `getEffectiveFontWeight` and `getEffectiveLineHeight` services
  - Handles status-based color vs custom color logic

### Improved

- Better separation of concerns in styled component props
- More maintainable and testable code structure

## [3.0.1] - 2025-11-11

### Changed

- **Updated `nice-styles` to v2.0.1**: Upgraded dependency from v1.1.1 to v2.0.1
  - Adopts semantic naming convention (e.g., `fontSize.default` instead of `FONT_SIZE_3`)
  - Uses "reverse" naming instead of "inverse" (e.g., `backgroundColorReverse`)
  - No breaking changes for this package - all CSS variable names remain compatible
  - Improved TypeScript constants for design tokens

### Added

- **New shade variant status types**: Added support for content color shade variants from `nice-styles` v2.0+
  - New status types: `darker`, `dark`, `light`, `lighter`
  - These map to `--content-color-darker`, `--content-color-dark`, `--content-color-light`, `--content-color-lighter`
  - Enables fine-grained control over text color shades

### Documentation

- Updated README examples to use semantic naming from `nice-styles` v2.0.0+
  - Changed examples from `FONT_SIZE_3, CONTENT_COLOR_SUCCESS` to `fontSize.default, contentColor.success`
- Updated all documentation to reflect the new `nice-styles` API
- Clarified distinction between core status colors (from `nice-styles`), shade variants (from `nice-styles`), and extended status colors (custom)
- Added comprehensive status color examples showing all available types

## [3.0.0] - 2025-01-10

### Breaking Changes

- **BREAKING**: Replaced `nice-css-variables` dependency with `nice-styles`
  - `nice-css-variables` has been deprecated in favor of `nice-styles`
  - The `nice-styles` package provides the same CSS variables with additional features:
    - Modular CSS imports for better performance
    - TypeScript constants for all design token values
    - Better organized with individual CSS files per category
  - No code changes required in components, only package.json update needed

### Migration

If you were using `nice-css-variables`:

```bash
npm uninstall nice-css-variables
npm install nice-styles
```

Update your CSS imports:

```css
/* Old */
@import 'nice-css-variables';

/* New - import all variables */
@import 'nice-styles/variables.css';

/* Or import selectively for better performance */
@import 'nice-styles/static/css/content-color.css';
@import 'nice-styles/static/css/font-size.css';
```

TypeScript/JavaScript usage:

```typescript
// New: You can now import constants directly
import { CONTENT_COLOR_SUCCESS, FONT_SIZE_3 } from 'nice-styles'
```

## [2.0.0] - 2025-01-09

### Breaking Changes

- **BREAKING**: Changed `size` prop from `number` to `string` type
  - Previously: `size={3}` (integer values 1-6)
  - Now: `size="1rem"` or `size="var(--text-lg)"` (any valid CSS size value or variable)

- **BREAKING**: Changed `weight` prop from `number` to `string` type
  - Previously: `weight={500}` (integer values)
  - Now: `weight="500"` or `weight="var(--font-semibold)"` (any valid CSS weight value or variable)

- **BREAKING**: Removed `getCssVariable` utility function
  - Component now uses CSS custom properties directly with fallbacks

### Added

- New CSS custom properties for flexible theming:
  - `--typography-size-default`: Default font size (fallback: `1rem`)
  - `--typography-weight-default`: Default font weight (fallback: `normal`)
  - `--typography-weight-heading`: Heading weight for h1, h2, h3 (fallback: `600`)

- New exported types:
  - `AlignType`: Text alignment options
  - `LineHeightType`: Line height options

- Comprehensive JSDoc documentation for all components, types, and utilities
- Full README documentation with updated examples and migration guide

### Changed

- Alphabetized all type definitions and props for better organization
- Updated `StatusType` to be alphabetically ordered
- Enhanced heading weight defaults to use `var(--typography-weight-heading, 600)`
- Improved TypeScript type consistency across the codebase

### Migration Guide

To migrate from v1.x to v2.0:

1. Update `size` prop values from numbers to strings:
   ```tsx
   // Before (v1.x)
   <Typography size={3}>Text</Typography>

   // After (v2.0)
   <Typography size="1rem">Text</Typography>
   // or use CSS variables
   <Typography size="var(--text-base)">Text</Typography>
   ```

2. Update `weight` prop values from numbers to strings:
   ```tsx
   // Before (v1.x)
   <Typography weight={500}>Text</Typography>

   // After (v2.0)
   <Typography weight="500">Text</Typography>
   // or use CSS variables
   <Typography weight="var(--font-medium)">Text</Typography>
   ```

3. Define required CSS custom properties in your application:
   ```css
   :root {
     --typography-size-default: 1rem;
     --typography-weight-default: normal;
     --typography-weight-heading: 600;
     --line-height-default: 1.5;
     --line-height-condensed: 1.25;
   }
   ```

## [1.3.5] - Previous Release

### Changed
- Dependency updates and bug fixes

## [1.3.4] - Previous Release

### Changed
- Minor improvements and optimizations

## [1.3.3] - Previous Release

### Added
- Heading font family support

## [1.3.2] - Previous Release

### Changed
- Documentation improvements

## [1.3.1] - Previous Release

### Fixed
- Bug fixes and stability improvements

## [1.3.0] - Previous Release

### Added
- Enhanced typography features

## [1.2.0] - Previous Release

### Added
- Additional status types

## [1.1.0] - Previous Release

### Added
- Line height controls

## [1.0.0] - Initial Release

### Added
- Initial release with core typography features
- Semantic HTML element support (h1-h4, p, span)
- Size and weight system with CSS variables
- Status-based colors
- Code font support
- Antialiasing and legibility optimizations
- TypeScript support