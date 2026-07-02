# Nice Prototypes Storybook

Comprehensive documentation and interactive playground for the Nice React component library ecosystem.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Running Storybook

```bash
npm run storybook
```

Storybook will start at http://localhost:6006

### Building Storybook

```bash
npm run build-storybook
```

The static build will be created in `storybook-static/` directory.

## 📦 Documented Packages

This Storybook documents the following packages:

### React Components

- **nice-react-flex** - Responsive flexbox container
- **nice-react-typography** - Semantic typography component
- **nice-react-tile** - Full-width container with backgrounds
- **nice-react-button** - Feature-rich button component
- **nice-react-icon** - Icon library with 30+ SVG icons

### Utilities

- **nice-css-variables** - CSS design tokens
- **nice-toolkit** - Workspace CLI for linking, scaffolding, dev/watch, and orchestrated publishing of nice-\* packages

## 📖 Documentation Structure

```
stories/
├── Introduction.mdx              # Welcome page and overview
├── Flex.stories.tsx              # Flex component examples
├── Typography.stories.tsx        # Typography component examples
├── Tile.stories.tsx              # Tile component examples
├── Button.stories.tsx            # Button component examples
├── Icon.stories.tsx              # Icon component examples
├── CSSVariables.mdx              # CSS variables documentation
└── NpmLink.mdx                   # nice-toolkit documentation
```

## 🎨 Features

- **Interactive Examples** - Live component playground with controls
- **Comprehensive Coverage** - All components, props, and use cases documented
- **Code Examples** - Copy-paste ready code snippets
- **Responsive Testing** - See how components respond to different screen sizes
- **Theme Switching** - Test light/dark mode variants
- **Accessibility** - Built-in a11y testing with Storybook addons

## 🛠️ Development

### Project Structure

```
niceprototypes-storybook/
├── .storybook/
│   ├── main.ts           # Storybook configuration
│   ├── preview.ts        # Global story settings
│   └── preview-head.html # CSS variables import
├── stories/
│   ├── *.stories.tsx     # Component stories
│   └── *.mdx             # Documentation pages
├── package.json
├── tsconfig.json
└── README.md
```

### Adding New Stories

1. Create a new `.stories.tsx` file in `stories/`:

```typescript
import type { Meta, StoryObj } from "@storybook/react"
import YourComponent from "your-package"

const meta = {
  title: "Components/YourComponent",
  component: YourComponent,
  tags: ["autodocs"],
} satisfies Meta<typeof YourComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // Your props
  },
}
```

2. Start Storybook to see your new story

### Adding Documentation Pages

Create `.mdx` files for standalone documentation:

```mdx
import { Meta } from "@storybook/blocks"

<Meta title="Documentation/YourTopic" />

# Your Topic

Your documentation content here...
```

## 🔧 Configuration

### Package Dependencies

The Storybook uses these packages from npm:

```json
{
  "dependencies": {
    "nice-react-flex": "^1.0.3",
    "nice-react-typography": "^1.3.3",
    "nice-react-tile": "^2.0.6",
    "nice-react-button": "^3.2.3",
    "nice-react-icon": "^1.1.2",
    "nice-css-variables": "^1.0.4"
  }
}
```

### Local Development with Packages

This project uses two tools to enable hot module reloading with symlinked packages:

#### 1. nice-toolkit — Handles npm linking

When you `npm link` React packages, each linked package brings its own copy of React, causing "Invalid hook call" errors. `nice-toolkit` solves this by removing React, React DOM, and styled-components from linked packages' `node_modules`.

```bash
# Install globally (optional)
npm install -g nice-toolkit

# Link all configured Nice packages from nice-storybook directory
npx nice-toolkit

# After running npm install in any linked package, re-run:
npx nice-toolkit
# or to unlink first:
npx nice-toolkit --unlink
```

#### 2. nice-vite-watcher — Enables HMR

Vite doesn't watch symlinked packages by default. The `nice-vite-watcher` plugin adds watching for linked package dist folders and enables source aliases for true HMR.

The configuration is in `.storybook/main.ts`:

```typescript
import { viteWatcher, getSourceAliases } from "nice-vite-watcher"

// All linked packages and their local paths
const linkedPackages = {
  "nice-react-flex": `${NICE_PACKAGES_BASE}/nice-react-flex`,
  "nice-react-typography": `${NICE_PACKAGES_BASE}/nice-react-typography`,
  // ... more packages
}

// Packages that can use source aliases (no special build transforms)
// These get TRUE HMR with state preservation
const sourceAliasablePackages = [
  "nice-react-flex",
  "nice-react-typography",
  "nice-react-styles",
  "nice-react-button",
]
```

#### Quick Start for Local Development

```bash
# 1. Install dependencies
npm install

# 2. Link all Nice packages
npx nice-toolkit

# 3. Start Storybook with HMR
npm run dev
```

#### HMR Behavior by Package

| Category           | HMR Behavior               | Packages                                                                                                 |
| ------------------ | -------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Source-aliased** | True HMR — state preserved | nice-react-flex, nice-react-typography, nice-react-styles, nice-react-button |
| **Dist-watched**   | Full reload — automatic    | nice-react-icon (uses SVGR transforms)                                                                   |

#### Editing Source-Aliased Packages

Changes appear instantly with HMR. No build step needed.

```bash
# Edit nice-react-flex/src/components/Flex.tsx
# → Storybook hot-reloads immediately
```

#### Editing Dist-Watched Packages (nice-react-icon)

Changes require the package's build to run first.

```bash
# Terminal 1: Start nice-react-icon in watch mode
cd ../nice-react-icon
npm run dev

# Terminal 2: Start Storybook
cd ../nice-storybook
npm run dev

# Edit nice-react-icon/src/...
# → Package rebuilds → Storybook detects dist change → Full reload
```

#### Adding a New Linked Package

1. Clone the package to `~/Code/`

2. Add to `linkedPackages` in `.storybook/main.ts`:

   ```typescript
   const linkedPackages = {
     // ...existing packages
     "nice-react-new-package": `${NICE_PACKAGES_BASE}/nice-react-new-package`,
   }
   ```

3. If the package doesn't use special build transforms (SVGR, PostCSS), add to `sourceAliasablePackages`:

   ```typescript
   const sourceAliasablePackages = [
     // ...existing packages
     "nice-react-new-package",
   ]
   ```

4. Re-run linking:

   ```bash
   npx nice-toolkit
   ```

5. Restart Storybook

#### Troubleshooting Local Development

**"Invalid hook call" error**: Multiple React instances running.

```bash
npx nice-toolkit
```

**Changes not appearing**:

- Source-aliased packages: Check the terminal for Vite errors
- Dist-watched packages: Ensure `npm run dev` is running in the package directory

**After npm install in a linked package**: The linking is broken.

```bash
npx nice-toolkit --unlink
npm install
npx nice-toolkit
```

**Storybook won't start**: Clear caches and restart.

```bash
rm -rf node_modules/.cache node_modules/.vite
npm run dev
```

## 📚 Using the Documentation

### For Component Users

1. **Browse Components** - Navigate through the sidebar to explore components
2. **Interactive Controls** - Use the Controls panel to modify props in real-time
3. **View Code** - Click "Show code" to see implementation examples
4. **Copy Examples** - Copy code snippets for your own projects

### For Component Developers

1. **API Reference** - Auto-generated from TypeScript types
2. **Use Cases** - See how components are used in different scenarios
3. **Best Practices** - Learn recommended patterns and anti-patterns
4. **Integration Examples** - See how components work together

## 🎯 Viewing Specific Stories

### Components

- Flex: http://localhost:6006/?path=/docs/components-flex--docs
- Typography: http://localhost:6006/?path=/docs/components-typography--docs
- Tile: http://localhost:6006/?path=/docs/components-tile--docs
- Button: http://localhost:6006/?path=/docs/components-button--docs
- Icon: http://localhost:6006/?path=/docs/components-icon--docs

### Documentation

- CSS Variables: http://localhost:6006/?path=/docs/documentation-css-variables--docs
- toolkit: http://localhost:6006/?path=/docs/documentation-nice-toolkit--docs

## 🚢 Deployment

### Deploy to Vercel

```bash
npm run build-storybook
vercel --prod ./storybook-static
```

### Deploy to Netlify

```bash
npm run build-storybook
netlify deploy --prod --dir=storybook-static
```

### Deploy to GitHub Pages

```bash
npm run build-storybook
# Copy storybook-static to your gh-pages branch
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add or update stories
4. Test locally with `npm run storybook`
5. Submit a pull request

## 📄 License

MIT

## 🔗 Links

- [NPM Organization](https://www.npmjs.com/~niceprototypes)
- [GitHub Organization](https://github.com/niceprototypes)

---

Built with ❤️ using [Storybook](https://storybook.js.org/)
