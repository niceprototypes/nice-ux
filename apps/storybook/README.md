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

### React Hooks
- **nice-react-device-detector** - Mobile device detection

### Utilities
- **nice-css-variables** - CSS design tokens
- **nice-npm-link** - Enhanced npm linking tool

## 📖 Documentation Structure

```
stories/
├── Introduction.mdx              # Welcome page and overview
├── Flex.stories.tsx              # Flex component examples
├── Typography.stories.tsx        # Typography component examples
├── Tile.stories.tsx              # Tile component examples
├── Button.stories.tsx            # Button component examples
├── Icon.stories.tsx              # Icon component examples
├── useDeviceDetector.stories.tsx # Device detector hook examples
├── CSSVariables.mdx              # CSS variables documentation
└── NpmLink.mdx                   # nice-npm-link documentation
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
import { Meta } from '@storybook/blocks'

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
    "nice-react-device-detector": "^1.1.0",
    "nice-css-variables": "^1.0.4"
  }
}
```

### Local Development with Packages

To develop with local versions of the packages:

1. Install nice-npm-link:
```bash
npm install -g nice-npm-link
```

2. Link local packages:
```bash
nnl ../nice-react-flex
nnl ../nice-react-typography
nnl ../nice-react-tile
nnl ../nice-react-button
nnl ../nice-react-icon
nnl ../nice-react-device-detector
```

3. Start watch mode in each package:
```bash
cd ../nice-react-flex && npm run dev &
cd ../nice-react-typography && npm run dev &
# ... etc
```

4. Start Storybook - changes will hot reload:
```bash
npm run storybook
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

### Hooks
- useDeviceDetector: http://localhost:6006/?path=/docs/hooks-usedevicedetector--docs

### Documentation
- CSS Variables: http://localhost:6006/?path=/docs/documentation-css-variables--docs
- npm-link: http://localhost:6006/?path=/docs/documentation-nice-npm-link--docs

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