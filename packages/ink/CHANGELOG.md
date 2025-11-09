# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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