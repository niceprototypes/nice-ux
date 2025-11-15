import type { Meta, StoryObj } from "@storybook/react"
import Typography from "nice-react-typography"
import "nice-styles/variables.css"

/**
 * # Styles (nice-styles)
 *
 * A comprehensive collection of CSS custom properties (variables) for consistent design tokens.
 *
 * ## Why Use Nice Styles?
 *
 * - **Centralized Design System**: Define once, use everywhere
 * - **Runtime Theming**: Change values dynamically without rebuilding
 * - **No JavaScript Overhead**: Pure CSS with browser-native support
 * - **Framework Agnostic**: Works with any framework or vanilla CSS
 * - **Modular Imports**: Import only what you need for optimal performance
 *
 * ## Installation
 *
 * ```bash
 * npm install nice-styles
 * ```
 *
 * ## Usage
 *
 * ### Import All Variables
 * ```css
 * @import 'nice-styles/variables.css';
 * ```
 *
 * ### Import Individual Categories
 * ```css
 * @import 'nice-styles/static/css/border-radius.css';
 * @import 'nice-styles/static/css/gap-size.css';
 * ```
 */

// Dummy component to hold stories
const CSSVariablesDemo = () => null

const meta = {
  title: "Styles/Constants",
  component: CSSVariablesDemo,
  parameters: {
    layout: "padded",
    controls: { disable: true },
  },
} satisfies Meta<typeof CSSVariablesDemo>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Complete reference of all available CSS constants.
 */
export const Constants: Story = {
  args: {},
  render: () => {
    let rowIndex = 0
    const VariableRow = ({ name, value, demo }: { name: string; value?: string; demo?: React.ReactNode }) => {
      const currentIndex = rowIndex++
      return (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "8px 1em",
          backgroundColor: currentIndex % 2 === 0 ? "transparent" : "rgba(0, 0, 0, 0.02)",
        }}>
          <div style={{ minWidth: "24em" }}>
            <Typography as="span" code size="0.875rem">
              {name}
            </Typography>
          </div>
          {demo}
          {value && (
            <Typography as="span" code size="0.875rem" color="var(--content-color-light)">
              {value}
            </Typography>
          )}
        </div>
      )
    }

    const SectionHeader = ({ children }: { children: React.ReactNode }) => (
      <div
        style={{
          margin: "24px 0 12px 0",
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: "8px",
        }}
      >
        <Typography as="h3" size="1rem" weight="600">
          {children}
        </Typography>
      </div>
    )

    return (
      <div style={{ maxWidth: "900px" }}>
        <SectionHeader>Animation</SectionHeader>
        <VariableRow name="--animation-duration-default" value="300ms" />
        <VariableRow name="--animation-duration-slow" value="600ms" />
        <VariableRow name="--animation-easing-default" value="ease-in-out" />

        <SectionHeader>Background Colors</SectionHeader>
        <VariableRow
          name="--background-color-default"
          value="hsla(0, 100%, 100%, 1)"
          demo={<span style={{ color: "var(--background-color-default)", fontSize: "1.5rem" }}>⬤</span>}
        />
        <VariableRow
          name="--background-color-active"
          value="hsla(210, 10%, 96%, 1)"
          demo={<span style={{ color: "var(--background-color-active)", fontSize: "1.5rem" }}>⬤</span>}
        />

        <SectionHeader>Border Colors</SectionHeader>
        <VariableRow
          name="--border-color-dark"
          value="hsla(210, 8%, 58%, 1)"
          demo={<div style={{
            width: "80px",
            height: "40px",
            backgroundColor: "white",
            border: "2px solid var(--border-color-dark)",
            borderRadius: "4px",
          }} />}
        />
        <VariableRow
          name="--border-color-darker"
          value="hsla(210, 10%, 25%, 1)"
          demo={<div style={{
            width: "80px",
            height: "40px",
            backgroundColor: "white",
            border: "2px solid var(--border-color-darker)",
            borderRadius: "4px",
          }} />}
        />
        <VariableRow
          name="--border-color-default"
          value="hsla(240, 9%, 91%, 1)"
          demo={<div style={{
            width: "80px",
            height: "40px",
            backgroundColor: "white",
            border: "2px solid var(--border-color-default)",
            borderRadius: "4px",
          }} />}
        />

        <SectionHeader>Border Radius</SectionHeader>
        <VariableRow
          name="--border-radius-smaller"
          value="2px"
          demo={<div style={{
            width: "30px",
            height: "15px",
            backgroundColor: "white",
            border: "1px solid var(--border-color-default)",
            borderRadius: "var(--border-radius-smaller)",
          }} />}
        />
        <VariableRow
          name="--border-radius-small"
          value="4px"
          demo={<div style={{
            width: "40px",
            height: "20px",
            backgroundColor: "white",
            border: "1px solid var(--border-color-default)",
            borderRadius: "var(--border-radius-small)",
          }} />}
        />
        <VariableRow
          name="--border-radius-default"
          value="8px"
          demo={<div style={{
            width: "80px",
            height: "40px",
            backgroundColor: "white",
            border: "1px solid var(--border-color-default)",
            borderRadius: "var(--border-radius-default)",
          }} />}
        />
        <VariableRow
          name="--border-radius-large"
          value="16px"
          demo={<div style={{
            width: "120px",
            height: "60px",
            backgroundColor: "white",
            border: "1px solid var(--border-color-default)",
            borderRadius: "var(--border-radius-large)",
          }} />}
        />
        <VariableRow
          name="--border-radius-larger"
          value="32px"
          demo={<div style={{
            width: "160px",
            height: "80px",
            backgroundColor: "white",
            border: "1px solid var(--border-color-default)",
            borderRadius: "var(--border-radius-larger)",
          }} />}
        />

        <SectionHeader>Border Width</SectionHeader>
        <VariableRow
          name="--border-width-default"
          value="1.5px"
          demo={<div style={{
            width: "150px",
            height: "75px",
            backgroundColor: "#f3f4f6",
            border: "1px solid var(--border-color-default)",
            borderRadius: "8px",
          }} />}
        />
        <VariableRow
          name="--border-width-large"
          value="2px"
          demo={<div style={{
            width: "200px",
            height: "100px",
            backgroundColor: "#f3f4f6",
            border: "1px solid var(--border-color-default)",
            borderRadius: "8px",
          }} />}
        />

        <SectionHeader>Box Shadow</SectionHeader>
        <VariableRow
          name="--box-shadow-default"
          value="0 1px 4px hsla(0, 0%, 0%, 0.075)"
          demo={
            <div style={{ backgroundColor: "rgba(0, 0, 0, 0.02)", padding: "12px", borderRadius: "8px" }}>
              <div style={{
                width: "60px",
                height: "30px",
                backgroundColor: "white",
                boxShadow: "var(--box-shadow-default)",
                borderRadius: "4px",
              }} />
            </div>
          }
        />
        <VariableRow
          name="--box-shadow-default-reverse"
          value="0 -1px 4px hsla(0, 0%, 0%, 0.075)"
          demo={
            <div style={{ backgroundColor: "rgba(0, 0, 0, 0.02)", padding: "12px", borderRadius: "8px" }}>
              <div style={{
                width: "60px",
                height: "30px",
                backgroundColor: "white",
                boxShadow: "var(--box-shadow-default-reverse)",
                borderRadius: "4px",
              }} />
            </div>
          }
        />
        <VariableRow
          name="--box-shadow-large"
          value="0 2px 8px hsla(0, 0%, 0%, 0.1)"
          demo={
            <div style={{ backgroundColor: "rgba(0, 0, 0, 0.02)", padding: "12px", borderRadius: "8px" }}>
              <div style={{
                width: "60px",
                height: "30px",
                backgroundColor: "white",
                boxShadow: "var(--box-shadow-large)",
                borderRadius: "4px",
              }} />
            </div>
          }
        />
        <VariableRow
          name="--box-shadow-large-reverse"
          value="0 -2px 8px hsla(0, 0%, 0%, 0.1)"
          demo={
            <div style={{ backgroundColor: "rgba(0, 0, 0, 0.02)", padding: "12px", borderRadius: "8px" }}>
              <div style={{
                width: "60px",
                height: "30px",
                backgroundColor: "white",
                boxShadow: "var(--box-shadow-large-reverse)",
                borderRadius: "4px",
              }} />
            </div>
          }
        />

        <SectionHeader>Cell Height</SectionHeader>
        <VariableRow name="--cell-height-smaller" value="24px" />
        <VariableRow name="--cell-height-small" value="40px" />
        <VariableRow name="--cell-height-default" value="56px" />
        <VariableRow name="--cell-height-large" value="64px" />
        <VariableRow name="--cell-height-larger" value="72px" />

        <SectionHeader>Content Colors</SectionHeader>
        <VariableRow
          name="--content-color-dark"
          value="hsla(210, 5%, 25%, 1)"
          demo={<span style={{ color: "var(--content-color-dark)", fontSize: "1.5rem" }}>⬤</span>}
        />
        <VariableRow
          name="--content-color-darker"
          value="hsla(210, 15%, 5%, 1)"
          demo={<span style={{ color: "var(--content-color-darker)", fontSize: "1.5rem" }}>⬤</span>}
        />
        <VariableRow
          name="--content-color-default"
          value="hsla(210, 5%, 45%, 1)"
          demo={<span style={{ color: "var(--content-color-default)", fontSize: "1.5rem" }}>⬤</span>}
        />
        <VariableRow
          name="--content-color-error"
          value="hsla(10, 92%, 63%, 1)"
          demo={<span style={{ color: "var(--content-color-error)", fontSize: "1.5rem" }}>⬤</span>}
        />
        <VariableRow
          name="--content-color-light"
          value="hsla(210, 5%, 65%, 1)"
          demo={<span style={{ color: "var(--content-color-light)", fontSize: "1.5rem" }}>⬤</span>}
        />
        <VariableRow
          name="--content-color-lighter"
          value="hsla(210, 5%, 85%, 1)"
          demo={<span style={{ color: "var(--content-color-lighter)", fontSize: "1.5rem" }}>⬤</span>}
        />
        <VariableRow
          name="--content-color-link"
          value="hsla(202, 100%, 50%, 1)"
          demo={<span style={{ color: "var(--content-color-link)", fontSize: "1.5rem" }}>⬤</span>}
        />
        <VariableRow
          name="--content-color-success"
          value="hsla(146, 68%, 44%, 1)"
          demo={<span style={{ color: "var(--content-color-success)", fontSize: "1.5rem" }}>⬤</span>}
        />
        <VariableRow
          name="--content-color-warning"
          value="hsla(29, 98%, 62%, 1)"
          demo={<span style={{ color: "var(--content-color-warning)", fontSize: "1.5rem" }}>⬤</span>}
        />

        <SectionHeader>Font Family</SectionHeader>
        <VariableRow
          name="--font-family-heading"
          value="System font stack"
          demo={<span style={{ fontFamily: "var(--font-family-heading)", fontSize: "1.5rem", fontWeight: "bold" }}>Heading</span>}
        />
        <VariableRow
          name="--font-family-body"
          value="System font stack"
          demo={<span style={{ fontFamily: "var(--font-family-body)" }}>Body</span>}
        />
        <VariableRow
          name="--font-family-code"
          value="Monospace font stack"
          demo={<span style={{ fontFamily: "var(--font-family-code)" }}>Code</span>}
        />

        <SectionHeader>Font Size</SectionHeader>
        <VariableRow
          name="--font-size-smaller"
          value="12px"
          demo={<span style={{ fontSize: "var(--font-size-smaller)" }}>Sample</span>}
        />
        <VariableRow
          name="--font-size-small"
          value="14px"
          demo={<span style={{ fontSize: "var(--font-size-small)" }}>Sample</span>}
        />
        <VariableRow
          name="--font-size-default"
          value="16px"
          demo={<span style={{ fontSize: "var(--font-size-default)" }}>Sample</span>}
        />
        <VariableRow
          name="--font-size-large"
          value="20px"
          demo={<span style={{ fontSize: "var(--font-size-large)" }}>Sample</span>}
        />
        <VariableRow
          name="--font-size-larger"
          value="24px"
          demo={<span style={{ fontSize: "var(--font-size-larger)" }}>Sample</span>}
        />

        <SectionHeader>Font Weight</SectionHeader>
        <VariableRow
          name="--font-weight-light"
          value="300"
          demo={<span style={{ fontWeight: "var(--font-weight-light)" }}>Sample</span>}
        />
        <VariableRow
          name="--font-weight-regular"
          value="400"
          demo={<span style={{ fontWeight: "var(--font-weight-regular)" }}>Sample</span>}
        />
        <VariableRow
          name="--font-weight-medium"
          value="500"
          demo={<span style={{ fontWeight: "var(--font-weight-medium)" }}>Sample</span>}
        />
        <VariableRow
          name="--font-weight-semibold"
          value="600"
          demo={<span style={{ fontWeight: "var(--font-weight-semibold)" }}>Sample</span>}
        />
        <VariableRow
          name="--font-weight-bold"
          value="700"
          demo={<span style={{ fontWeight: "var(--font-weight-bold)" }}>Sample</span>}
        />
        <VariableRow
          name="--font-weight-extrabold"
          value="800"
          demo={<span style={{ fontWeight: "var(--font-weight-extrabold)" }}>Sample</span>}
        />
        <VariableRow
          name="--font-weight-black"
          value="900"
          demo={<span style={{ fontWeight: "var(--font-weight-black)" }}>Sample</span>}
        />

        <SectionHeader>Gap Size</SectionHeader>
        <VariableRow
          name="--gap-size-smaller"
          value="4px"
          demo={
            <div style={{ display: "flex", gap: "var(--gap-size-smaller)" }}>
              <div style={{ width: "20px", height: "20px", backgroundColor: "#3b82f6", borderRadius: "2px" }} />
              <div style={{ width: "20px", height: "20px", backgroundColor: "#8b5cf6", borderRadius: "2px" }} />
            </div>
          }
        />
        <VariableRow
          name="--gap-size-small"
          value="8px"
          demo={
            <div style={{ display: "flex", gap: "var(--gap-size-small)" }}>
              <div style={{ width: "20px", height: "20px", backgroundColor: "#3b82f6", borderRadius: "2px" }} />
              <div style={{ width: "20px", height: "20px", backgroundColor: "#8b5cf6", borderRadius: "2px" }} />
            </div>
          }
        />
        <VariableRow
          name="--gap-size-default"
          value="16px"
          demo={
            <div style={{ display: "flex", gap: "var(--gap-size-default)" }}>
              <div style={{ width: "20px", height: "20px", backgroundColor: "#3b82f6", borderRadius: "2px" }} />
              <div style={{ width: "20px", height: "20px", backgroundColor: "#8b5cf6", borderRadius: "2px" }} />
            </div>
          }
        />
        <VariableRow
          name="--gap-size-large"
          value="32px"
          demo={
            <div style={{ display: "flex", gap: "var(--gap-size-large)" }}>
              <div style={{ width: "20px", height: "20px", backgroundColor: "#3b82f6", borderRadius: "2px" }} />
              <div style={{ width: "20px", height: "20px", backgroundColor: "#8b5cf6", borderRadius: "2px" }} />
            </div>
          }
        />
        <VariableRow
          name="--gap-size-larger"
          value="48px"
          demo={
            <div style={{ display: "flex", gap: "var(--gap-size-larger)" }}>
              <div style={{ width: "20px", height: "20px", backgroundColor: "#3b82f6", borderRadius: "2px" }} />
              <div style={{ width: "20px", height: "20px", backgroundColor: "#8b5cf6", borderRadius: "2px" }} />
            </div>
          }
        />

        <SectionHeader>Icon Stroke Width</SectionHeader>
        <VariableRow
          name="--icon-stroke-width-default"
          value="1.5px"
          demo={
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="var(--icon-stroke-width-default)">
              <circle cx="12" cy="12" r="10" />
            </svg>
          }
        />
        <VariableRow
          name="--icon-stroke-width-large"
          value="2px"
          demo={
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="var(--icon-stroke-width-large)">
              <circle cx="12" cy="12" r="10" />
            </svg>
          }
        />

        <SectionHeader>Icon Stroke Color</SectionHeader>
        <VariableRow name="--icon-stroke-color-default" value="hsla(210, 5%, 65%, 1)" />
        <VariableRow name="--icon-stroke-color-primary" value="hsla(210, 5%, 25%, 1)" />
        <VariableRow name="--icon-stroke-color-default-inverse" value="hsla(210, 15%, 5%, 1)" />
        <VariableRow name="--icon-stroke-color-primary-inverse" value="hsla(0, 100%, 100%, 1)" />

        <SectionHeader>Line Height</SectionHeader>
        <VariableRow name="--line-height-condensed" value="1.25" />
        <VariableRow name="--line-height-default" value="1.5" />
        <VariableRow name="--line-height-expanded" value="1.75" />

        <SectionHeader>Inverse Colors (for Dark Backgrounds)</SectionHeader>
        <VariableRow name="--background-color-darker-inverse" value="hsla(210, 15%, 5%, 1)" />
        <VariableRow name="--background-color-dark-inverse" value="hsla(210, 5%, 25%, 1)" />
        <VariableRow name="--background-color-default-inverse" value="hsla(210, 5%, 45%, 1)" />
        <VariableRow name="--background-color-light-inverse" value="hsla(210, 5%, 65%, 1)" />
        <VariableRow name="--background-color-lighter-inverse" value="hsla(210, 5%, 85%, 1)" />
        <VariableRow name="--content-color-darker-inverse" value="hsla(0, 100%, 100%, 1)" />
        <VariableRow name="--content-color-dark-inverse" value="hsla(210, 10%, 96%, 1)" />
        <VariableRow name="--content-color-default-inverse" value="hsla(0, 100%, 100%, 1)" />
        <VariableRow name="--content-color-light-inverse" value="hsla(0, 100%, 100%, 1)" />
        <VariableRow name="--border-color-dark-reverse" value="hsla(0, 100%, 100%, 1)" />
        <VariableRow name="--border-color-darker-reverse" value="hsla(0, 100%, 100%, 1)" />
        <VariableRow name="--border-color-default-reverse" value="hsla(210, 5%, 65%, 1)" />
      </div>
    )
  },
}