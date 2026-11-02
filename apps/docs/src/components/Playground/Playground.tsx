import * as React from "react"
import Flex from "@niceprototypes/flex"
import Ink from "@niceprototypes/ink"
import Input from "@niceprototypes/input"
import Select from "@niceprototypes/select"
import Toggle from "@niceprototypes/toggle"
import NiceCode from "@niceprototypes/code"
import { ScrollProvider, StickyProvider } from "@niceprototypes/scroll"
import { useSceneRegion } from "@niceprototypes/app"
import type { CatalogComponentType } from "../../catalog"
import { controlOf, initialOf, type PlaygroundControlType, type PlaygroundValueType } from "./Playground.controls"
import { StyledPlaygroundControls, StyledPlaygroundPreview } from "./Playground.styles"

/**
 * Every package's entry, loaded when its component's playground first shows: the source, as the
 * site's Vite aliases resolve it, except the packages it loads built (vite.config.ts DIST_PACKAGES),
 * whose sources need their generators.
 */
const packages: Record<string, () => Promise<Record<string, unknown>>> = {
  ...import.meta.glob<Record<string, unknown>>(["../../../../../packages/*/src/index.ts", "!**/packages/icon/**"]),
  "../../../../../packages/icon/src/index.ts": () => import("@niceprototypes/icon"),
}

/** A component from its package entry: the named export, else the default. */
const useComponent = (component: CatalogComponentType) => {
  const [Component, setComponent] = React.useState<React.ComponentType<Record<string, unknown>>>()
  React.useEffect(() => {
    const load = packages[`../../../../../${component.directory}/src/index.ts`]
    void load?.().then(module => setComponent(() => (module[component.name] ?? module.default) as React.ComponentType<Record<string, unknown>>))
  }, [component])
  return Component
}

/** Shows what the controls cannot render, instead of breaking the page. */
class PreviewBoundary extends React.Component<{ children: React.ReactNode; values: unknown }, { error?: Error }> {
  state: { error?: Error } = {}
  static getDerivedStateFromError = (error: Error) => ({ error })
  componentDidUpdate(previous: { values: unknown }) {
    if (previous.values !== this.props.values && this.state.error) this.setState({ error: undefined })
  }
  render = () => (this.state.error ? <Ink color="error">{this.state.error.message}</Ink> : this.props.children)
}

/** One prop's control. */
const Control = ({ control, value, onChange }: { control: PlaygroundControlType; value: PlaygroundValueType; onChange: (value: PlaygroundValueType) => void }) => {
  const label = control.prop.name
  if (control.kind === "boolean") return <Toggle aria-label={label} size="small" checked={value === true} onChange={onChange} />
  if (control.kind === "select")
    return (
      <Select
        aria-label={label}
        size="small"
        placeholder="unset"
        value={value === undefined ? undefined : String(value)}
        options={control.options.map(option => ({ value: option, label: option }))}
        onChange={onChange}
      />
    )
  return (
    <Input
      aria-label={label}
      size="small"
      type={control.kind === "number" ? "number" : "text"}
      value={value === undefined ? "" : String(value)}
      onChange={next => onChange(control.kind === "number" ? (next === "" ? undefined : Number(next)) : next || undefined)}
    />
  )
}

/**
 * Playground
 *
 * A component rendered live from its props, with a control for every prop the catalog types
 * allow (unions as selects, booleans as switches, numbers and text as fields) and the JSX for
 * the current values. For components that pass `hasPlayground`.
 */
const Playground: React.FC<{ component: CatalogComponentType }> = ({ component }) => {
  const controls = React.useMemo(() => component.props.flatMap(prop => controlOf(prop) ?? []), [component])
  const [values, setValues] = React.useState<Record<string, PlaygroundValueType>>(() =>
    Object.fromEntries(controls.map(control => [control.prop.name, initialOf(control, component.name)])),
  )
  const Component = useComponent(component)
  // The docs page scrolls in the App's region, not the window.
  const region = useSceneRegion()

  const set = (name: string) => (value: PlaygroundValueType) => setValues(current => ({ ...current, [name]: value }))
  const { children, ...props } = values
  const attributes = Object.entries(props)
    .filter(([, value]) => value !== undefined)
    .map(([name, value]) => (value === true ? ` ${name}` : typeof value === "string" ? ` ${name}="${value}"` : ` ${name}={${value}}`))
    .join("")
  const jsx = children === undefined ? `<${component.name}${attributes} />` : `<${component.name}${attributes}>${children}</${component.name}>`

  return (
    <Flex direction="column" gap="large">
      <StyledPlaygroundPreview>
        {/* The context the scroll components need above them, scrolling with the page's region; the rest ignore it. */}
        <ScrollProvider root={region}>
          <StickyProvider>
            <PreviewBoundary values={values}>{Component && <Component {...props}>{children}</Component>}</PreviewBoundary>
          </StickyProvider>
        </ScrollProvider>
      </StyledPlaygroundPreview>
      <NiceCode code={jsx} language="tsx" fit={false} />
      <StyledPlaygroundControls>
        {controls.map(control => (
          <React.Fragment key={control.prop.name}>
            <NiceCode code={control.prop.name} inlined margin="none" copyOnClick={false} />
            <Control control={control} value={values[control.prop.name]} onChange={set(control.prop.name)} />
          </React.Fragment>
        ))}
      </StyledPlaygroundControls>
    </Flex>
  )
}

export default Playground
