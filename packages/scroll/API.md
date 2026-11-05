# API Reference

Complete API reference for @niceprototypes/scroll.

## Table of Contents

- [Components](#components)
  - [Scroll](#scroll)
  - [Scroll root](#scroll-root)
  - [Scroll sticky](#scroll-sticky)
  - [Scroll fade](#scroll-fade)
  - [StickySectionLinks](#stickysectionlinks)
  - [StickySection](#stickysection)
- [Hooks](#hooks)
  - [useScroll](#usescroll)
  - [useScrollEnd](#usescrollend)
- [Types](#types)

---

## Components

### Scroll

Every scrolling element and every page scroll behaviour. Without `root`, `sticky` or `fade` it is the scroll container (with `follow`, pinned to the end); HTML attributes pass through to the element.

#### Props

```typescript
type ScrollProps = React.HTMLAttributes<HTMLElement> & {
  as?: ScrollAsType
  axis?: ScrollAxisType
  showScrollbar?: boolean
  ref?: React.Ref<HTMLElement>
  root?: ScrollRootType
  follow?: ScrollFollowType
  sticky?: boolean | ScrollStickyOptionsType
  fade?: boolean | ScrollFadeOptionsType
  children?: ReactNode
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `"div" \| "nav" \| "ul"` | `"div"` | Element to render |
| `axis` | `"x" \| "y" \| "both"` | `"y"` | Direction the content scrolls in |
| `showScrollbar` | `boolean` | `undefined` | Show the scrollbar. Unset, the `scroll.scrollbarWidth` token decides (hidden by default) |
| `ref` | `React.Ref<HTMLElement>` | `undefined` | The scroll container element |
| `root` | `true \| HTMLElement \| RefObject<HTMLElement \| null>` | `undefined` | Marks the page scroller. See [Scroll root](#scroll-root) |
| `follow` | `boolean` | `undefined` | Pins the scroll position to the end while the content grows. See [useScrollEnd](#usescrollend) |
| `sticky` | `boolean \| ScrollStickyOptionsType` | `undefined` | Keeps the children at the top of the root. See [Scroll sticky](#scroll-sticky) |
| `fade` | `boolean \| ScrollFadeOptionsType` | `undefined` | Fades the children with their place in the root's view. See [Scroll fade](#scroll-fade) |

#### Usage

```tsx
import { Scroll } from '@niceprototypes/scroll'

<Scroll axis="x" showScrollbar>{wideContent}</Scroll>
```

---

### Scroll root

Centralized scroll manager that provides a single RAF-batched scroll listener and the sticky stack for optimal performance.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `root` | `true \| HTMLElement \| RefObject<HTMLElement \| null>` | `true` for the window, or the element the page scrolls in (an app shell region) |

#### Usage

```tsx
import { Scroll } from '@niceprototypes/scroll'

function App() {
  return (
    <Scroll root>
      {/* Your app components */}
    </Scroll>
  )
}
```

#### Implementation Details

- Creates a single scroll event listener for the root
- Uses `requestAnimationFrame` to batch scroll updates
- Provides scroll position to all child components via context
- Manages registration and positioning of all sticky elements
- Calculates cumulative offsets for proper stacking
- Uses passive event listeners for better scroll performance
- Automatically cleans up listeners on unmount
- Renders only its children

---

### Scroll sticky

Creates a sticky element that remains at the top of the root when scrolled.

#### Options

```typescript
type ScrollStickyOptionsType = {
  order?: number
  onChange?: (isSticky: boolean) => void
}
```

| Option | Type | Default | Description |
|------|------|---------|-------------|
| `order` | `number` | `0` | Stacking order (lower numbers appear above) |
| `onChange` | `(isSticky: boolean) => void` | `undefined` | Callback fired when sticky state changes |

`sticky={true}` uses the defaults.

#### Usage

```tsx
import { Scroll } from '@niceprototypes/scroll'

function Header() {
  const handleStickyChange = (isSticky: boolean) => {
    console.log('Sticky state:', isSticky)
  }

  return (
    <Scroll sticky={{ order: 0, onChange: handleStickyChange }}>
      <nav>Navigation</nav>
    </Scroll>
  )
}
```

#### Stacking Order

Elements with lower `order` values appear above elements with higher values:

```tsx
<Scroll sticky={{ order: 0 }}>Top element</Scroll>
<Scroll sticky={{ order: 1 }}>Second element (below first)</Scroll>
<Scroll sticky={{ order: 2 }}>Third element (below second)</Scroll>
```

#### Implementation Details

- Automatically registers with the nearest `<Scroll root>`
- Under a window root the element is fixed, with a spacer of its height in the document flow
- Under an element root the element is CSS sticky, with a zero-height sentinel
- Hides on scroll down and shows on scroll up
- Reads the `scroll.sticky.zIndex`, `scroll.sticky.animationDuration` and `scroll.sticky.animationEasing` tokens
- Outside a `<Scroll root>` it renders its children in place

---

### Scroll fade

Applies opacity transitions to elements based on scroll position within the root's view. Needs a `<Scroll root>` above it.

#### Options

```typescript
type ScrollFadeOptionsType = {
  start?: number
  peak?: number
  end?: number
  opacity?: readonly [number, number, number]
}
```

| Option | Type | Default | Description |
|------|------|---------|-------------|
| `start` | `number` | `0` | Scroll progress % where fade begins (0-100) |
| `peak` | `number` | `50` | Scroll progress % where peak opacity is reached |
| `end` | `number` | `100` | Scroll progress % where fade ends |
| `opacity` | `[number, number, number]` | `[0, 1, 0]` | Opacity before `start`, at `peak` and after `end` (0-1) |

`fade={true}` uses the defaults.

#### Scroll Position Calculation

The scroll position is calculated as a percentage based on the element's position in the viewport:

- `0%` - Element bottom is at viewport bottom (just entering)
- `50%` - Element center is at viewport center
- `100%` - Element top is at viewport top (just exiting)

#### Usage Examples

**Fade in only:**
```tsx
<Scroll fade={{ start: 20, peak: 50 }}>
  <Content />
</Scroll>
```

**Fade in and out:**
```tsx
<Scroll fade={{ start: 10, peak: 50, end: 90, opacity: [0.2, 1, 0.2] }}>
  <Content />
</Scroll>
```

**Parallax-style subtle fade:**
```tsx
<Scroll fade={{ start: 0, peak: 30, end: 60, opacity: [0.5, 1, 0.5] }}>
  <BackgroundImage />
</Scroll>
```

#### Implementation Details

- Uses `getBoundingClientRect()` to track element position
- Calculates opacity based on current scroll position
- Updates on every scroll event (RAF batched)
- Applies a CSS transition from the `scroll.fade.animationDuration` and `scroll.fade.animationEasing` tokens

---

### StickySectionLinks

Navigation component with smooth scrolling and automatic active section detection.

#### Props

```typescript
interface StickySectionLinksProps {
  links: StickySectionLink[]
  renderLink?: (link: StickySectionLink, isActive: boolean, onClick: (e: React.MouseEvent) => void) => ReactNode
  renderWrapper?: (children: ReactNode) => ReactNode
  className?: string
}

interface StickySectionLink {
  href: string
  label: string
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `links` | `StickySectionLink[]` | Required | Array of navigation links |
| `renderLink` | `function` | `undefined` | Custom renderer for individual links |
| `renderWrapper` | `function` | `undefined` | Custom renderer for the wrapper container |
| `className` | `string` | `undefined` | CSS class for the wrapper |

#### Usage

**Basic usage:**
```tsx
<StickySectionLinks
  links={[
    { href: '#intro', label: 'Introduction' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' }
  ]}
/>
```

**Custom link rendering:**
```tsx
<StickySectionLinks
  links={links}
  renderLink={(link, isActive, onClick) => (
    <CustomLink
      href={link.href}
      onClick={onClick}
      active={isActive}
    >
      {link.label}
    </CustomLink>
  )}
/>
```

**Custom wrapper rendering:**
```tsx
<StickySectionLinks
  links={links}
  renderWrapper={(children) => (
    <nav className="custom-nav">
      <ul className="nav-list">{children}</ul>
    </nav>
  )}
/>
```

#### Features

- **Smooth Scrolling**: Custom smooth scroll animation (300ms ease-in-out)
- **Active Detection**: Uses IntersectionObserver for efficient active section tracking
- **Sticky Offset**: Automatically accounts for sticky header heights
- **Customizable**: Full control over link and wrapper rendering

#### Implementation Details

- Uses IntersectionObserver to detect which section is in view
- Calculates proper scroll offset considering sticky elements
- Implements custom smooth scroll with RAF
- Updates active state based on intersection events
- Requires target elements to have matching IDs (use with `StickySection`)

---

### StickySection

Wrapper component that provides a type-safe way to create sections with IDs for navigation.

#### Props

```typescript
interface StickySectionProps {
  id: string
  children: ReactNode
  as?: keyof JSX.IntrinsicElements
  render?: (props: { id: string; children: ReactNode }) => ReactNode
  className?: string
  style?: CSSProperties
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | Required | Unique identifier for the section |
| `children` | `ReactNode` | Required | Content to render |
| `as` | `keyof JSX.IntrinsicElements` | `"section"` | HTML element type to use |
| `render` | `function` | `undefined` | Custom render function |
| `className` | `string` | `undefined` | CSS class name |
| `style` | `CSSProperties` | `undefined` | Inline styles |

#### Usage

**Basic usage:**
```tsx
<StickySection id="about">
  <h2>About Us</h2>
  <p>Content here...</p>
</StickySection>
```

**Using different element:**
```tsx
<StickySection id="hero" as="div">
  <Hero />
</StickySection>
```

**Custom render function:**
```tsx
<StickySection
  id="custom"
  render={({ id, children }) => (
    <article id={id} className="custom-wrapper">
      <div className="inner">{children}</div>
    </article>
  )}
>
  <Content />
</StickySection>
```

#### Implementation Details

- Simple wrapper that ensures sections have proper IDs
- Supports custom rendering for flexibility
- Works seamlessly with `StickySectionLinks`
- Type-safe component for better DX

---

## Hooks

### useScroll

Hook to access the current scroll position from anywhere within a `<Scroll root>`.

#### Signature

```typescript
function useScroll(): number
```

#### Returns

- `number` - Current vertical scroll position in pixels

#### Usage

```tsx
import { useScroll } from '@niceprototypes/scroll'

function MyComponent() {
  const scrollY = useScroll()

  return <div>Scrolled {scrollY}px</div>
}
```

#### Throws

Throws an error if used outside of a `<Scroll root>`:
```
Error: useScroll must be used within a <Scroll root>
```

#### Implementation Details

- Subscribes to scroll updates from the nearest `<Scroll root>`
- Updates are RAF-batched for performance
- Automatically unsubscribes on unmount
- Initial value is set immediately on mount

---

### useScrollEnd

The end state of the nearest `<Scroll follow>`.

#### Signature

```typescript
function useScrollEnd(): { atEnd: boolean; scrollToEnd: (behavior?: ScrollBehavior) => void }
```

#### Returns

- `atEnd` - True while the scroll position is pinned to the end
- `scrollToEnd(behavior?)` - Scrolls to the end and pins it. `behavior` defaults to `"smooth"`; under `prefers-reduced-motion: reduce` the scroll is instant

#### Behaviour

- Opens at the end; content growth (children added, text streamed in, a child resizing) scrolls to the end instantly while pinned
- Scrolling up farther than the `scroll.follow.threshold` token from the end releases the pin; reaching the end pins it again
- The threshold is read from the element's computed `--np--scroll--follow--threshold`, as px

#### Throws

```
Error: useScrollEnd must be used within a <Scroll follow>
```

---

## Types

### Exported Types

```typescript
// Scroll
export type ScrollAxisType = "x" | "y" | "both"

export type ScrollAsType = "div" | "nav" | "ul"

export type ScrollRootType = true | HTMLElement | React.RefObject<HTMLElement | null>

export type ScrollStickyOptionsType = {
  order?: number
  onChange?: (isSticky: boolean) => void
}

export type ScrollFadeOptionsType = {
  start?: number
  peak?: number
  end?: number
  opacity?: readonly [number, number, number]
}

export type ScrollFollowType = boolean

export type ScrollProps = React.HTMLAttributes<HTMLElement> & {
  as?: ScrollAsType
  axis?: ScrollAxisType
  showScrollbar?: boolean
  ref?: React.Ref<HTMLElement>
  root?: ScrollRootType
  follow?: ScrollFollowType
  sticky?: boolean | ScrollStickyOptionsType
  fade?: boolean | ScrollFadeOptionsType
  children?: React.ReactNode
}

// Section Links
export interface StickySectionLink {
  href: string
  label: string
}

export interface StickySectionLinksProps {
  links: StickySectionLink[]
  renderLink?: (
    link: StickySectionLink,
    isActive: boolean,
    onClick: (e: React.MouseEvent) => void
  ) => ReactNode
  renderWrapper?: (children: ReactNode) => ReactNode
  className?: string
}

// Section
export interface StickySectionProps {
  id: string
  children: ReactNode
  as?: keyof JSX.IntrinsicElements
  render?: (props: { id: string; children: ReactNode }) => ReactNode
  className?: string
  style?: CSSProperties
}
```

### Importing Types

```typescript
import type {
  ScrollProps,
  ScrollAxisType,
  ScrollAsType,
  ScrollRootType,
  ScrollStickyOptionsType,
  ScrollFadeOptionsType,
  StickySectionLink,
  StickySectionLinksProps,
  StickySectionProps
} from '@niceprototypes/scroll'
```

---

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires `IntersectionObserver` support (for `StickySectionLinks`)
- Requires `requestAnimationFrame` support
- Consider polyfills for older browsers

---

## Performance Considerations

1. **Single Scroll Listener**: Only one scroll event listener for the entire app
2. **RAF Batching**: All scroll updates are batched with `requestAnimationFrame`
3. **Passive Listeners**: Scroll listener uses `{ passive: true }` for better performance
4. **Efficient Updates**: Components only update when necessary
5. **IntersectionObserver**: Used for active section detection instead of scroll calculations

---

## Migration Guide

### From Multiple Scroll Listeners

**Before:**
```tsx
useEffect(() => {
  const handleScroll = () => {
    setScrollY(window.scrollY)
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

**After:**
```tsx
const scrollY = useScroll()
```

### From CSS-only Sticky

**Before:**
```tsx
<div style={{ position: 'sticky', top: 0 }}>
  Header
</div>
```

**After:**
```tsx
<Scroll sticky={{ order: 0 }}>
  <Header />
</Scroll>
```

Benefits: Automatic stacking, callbacks, and better control.

---

## Advanced Patterns

### Conditional Sticky Behavior

```tsx
function ConditionalSticky({ children, shouldBeSticky }) {
  const [isSticky, setIsSticky] = useState(false)

  return shouldBeSticky ? (
    <Scroll sticky={{ onChange: setIsSticky }}>
      {children}
    </Scroll>
  ) : (
    children
  )
}
```

### Scroll-based Animations

```tsx
function ScrollAnimation() {
  const scrollY = useScroll()
  const opacity = Math.min(scrollY / 300, 1)

  return <div style={{ opacity }}>{/* content */}</div>
}
```

### Multiple Sticky Sections

```tsx
<Scroll root>
  <Scroll sticky={{ order: 0 }}>
    <GlobalHeader />
  </Scroll>

  <Scroll sticky={{ order: 1 }}>
    <SubHeader />
  </Scroll>

  <Scroll sticky={{ order: 2 }}>
    <StickySectionLinks links={links} />
  </Scroll>

  <StickySection id="content">
    <Content />
  </StickySection>
</Scroll>
```