import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { getToken } from "@niceprototypes/styles"
import { Field, Fieldset } from "@niceprototypes/field"
import RadioGroup from "./RadioGroup"
import Radio from "../Radio/Radio"
import type { RadioGroupProps } from "./RadioGroup.types"

/** Every styled-components rule in the document. */
const sheet = () =>
  Array.from(document.head.querySelectorAll("style"))
    .map(tag => tag.textContent ?? "")
    .join("\n")

/** CSS text of every rule whose selector starts at one of `element`'s classes. */
function cssFor(element: Element): string {
  const css = sheet()
  return Array.from(element.classList)
    .flatMap(className => css.match(new RegExp(`\\.${className}[^{]*\\{[^}]*\\}`, "g")) ?? [])
    .join("\n")
}

/** The rule for `:<pseudo>+.<circle class>`, the circle's state when the radio is checked/focused. */
function stateRule(circle: Element, pseudo: string): string {
  const css = sheet()
  const circleClass = Array.from(circle.classList).find(className => css.includes(`:${pseudo}+.${className}{`))
  return css.match(new RegExp(`:${pseudo}\\+\\.${circleClass}\\{[^}]*\\}`))?.[0] ?? ""
}

const Plans = (props: Partial<RadioGroupProps>) => (
  <RadioGroup aria-label="Plan" {...props}>
    <Radio value="free">Free</Radio>
    <Radio value="pro">Pro</Radio>
    <Radio value="team">Team</Radio>
  </RadioGroup>
)

describe("RadioGroup", () => {
  it("renders a named radiogroup of native radios sharing one name", () => {
    render(<Plans name="plan" />)
    const group = screen.getByRole("radiogroup", { name: "Plan" })
    const radios = screen.getAllByRole("radio")
    expect(group).toContainElement(radios[0])
    expect(radios).toHaveLength(3)
    radios.forEach(radio => expect(radio).toHaveAttribute("name", "plan"))
    expect(radios.map(radio => radio.getAttribute("value"))).toEqual(["free", "pro", "team"])
  })

  it("generates a shared name when none is passed", () => {
    render(<Plans />)
    const names = screen.getAllByRole("radio").map(radio => radio.getAttribute("name"))
    expect(names[0]).toBeTruthy()
    expect(new Set(names).size).toBe(1)
  })

  it("starts uncontrolled at defaultValue and checks the clicked label", async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    render(<Plans defaultValue="pro" onChange={onChange} />)
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked()
    await user.click(screen.getByText("Team"))
    expect(screen.getByRole("radio", { name: "Team" })).toBeChecked()
    expect(screen.getByRole("radio", { name: "Pro" })).not.toBeChecked()
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0]).toBe("team")
    expect(onChange.mock.calls[0][1].target).toBe(screen.getByRole("radio", { name: "Team" }))
  })

  it("moves the checked radio with the arrow keys", async () => {
    const user = userEvent.setup()
    render(<Plans defaultValue="free" />)
    screen.getByRole("radio", { name: "Free" }).focus()
    await user.keyboard("{ArrowDown}")
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked()
  })

  it("stays at value when controlled, and follows a controlling parent", async () => {
    const user = userEvent.setup()
    const Parent = () => {
      const [value, setValue] = React.useState("free")
      return (
        <>
          <RadioGroup aria-label="Fixed" value="free" onChange={() => {}}>
            <Radio value="free">Fixed free</Radio>
            <Radio value="pro">Fixed pro</Radio>
          </RadioGroup>
          <RadioGroup aria-label="Followed" value={value} onChange={setValue}>
            <Radio value="free">Followed free</Radio>
            <Radio value="pro">Followed pro</Radio>
          </RadioGroup>
        </>
      )
    }
    render(<Parent />)
    await user.click(screen.getByText("Fixed pro"))
    await user.click(screen.getByText("Followed pro"))
    expect(screen.getByRole("radio", { name: "Fixed free" })).toBeChecked()
    expect(screen.getByRole("radio", { name: "Fixed pro" })).not.toBeChecked()
    expect(screen.getByRole("radio", { name: "Followed pro" })).toBeChecked()
  })

  it("is read-only when value has no onChange", () => {
    render(<Plans value="pro" />)
    screen.getAllByRole("radio").forEach(radio => expect(radio).toHaveAttribute("readonly"))
  })

  it("disables every radio, and a Radio's own disabled disables one", async () => {
    const { unmount } = render(<Plans disabled />)
    screen.getAllByRole("radio").forEach(radio => expect(radio).toBeDisabled())
    unmount()
    render(
      <RadioGroup aria-label="Plan">
        <Radio value="free">Free</Radio>
        <Radio value="pro" disabled>
          Pro
        </Radio>
      </RadioGroup>,
    )
    expect(screen.getByRole("radio", { name: "Free" })).toBeEnabled()
    expect(screen.getByRole("radio", { name: "Pro" })).toBeDisabled()
  })

  it("sets native required on every radio", () => {
    render(<Plans required />)
    screen.getAllByRole("radio").forEach(radio => expect(radio).toBeRequired())
  })

  it("lays out by direction and gap", () => {
    render(<Plans direction="row" gap="large" />)
    const css = cssFor(screen.getByRole("radiogroup"))
    expect(css).toContain("flex-direction:row")
    expect(css).toContain(`gap:${getToken("gap", "large")}`)
  })

  it("defaults to a column with the small gap", () => {
    render(<Plans />)
    const css = cssFor(screen.getByRole("radiogroup"))
    expect(css).toContain("flex-direction:column")
    expect(css).toContain(`gap:${getToken("gap", "small")}`)
  })

  it("cascades size and colours to every Radio; a Radio's own prop wins", () => {
    render(
      <RadioGroup aria-label="Plan" size="large" backgroundColor="success" borderColor="error">
        <Radio value="free">Free</Radio>
        <Radio value="pro" size="small" borderColor="link">
          Pro
        </Radio>
      </RadioGroup>,
    )
    const [free, pro] = screen.getAllByRole("radio")
    expect(cssFor(free.parentElement!)).toContain(`width:${getToken("radio.size:large")}`)
    expect(cssFor(free.nextElementSibling!)).toContain(`border-color:${getToken("radio.borderColor:error")}`)
    expect(stateRule(free.nextElementSibling!, "checked")).toContain(
      `background-color:${getToken("radio.backgroundColor:success")}`,
    )
    expect(cssFor(pro.parentElement!)).toContain(`width:${getToken("radio.size:small")}`)
    expect(cssFor(pro.nextElementSibling!)).toContain(`border-color:${getToken("radio.borderColor:link")}`)
  })

  it("draws the keyboard focus ring on the circle", () => {
    render(<Plans />)
    const circle = screen.getAllByRole("radio")[0].nextElementSibling!
    expect(stateRule(circle, "focus-visible")).toContain(
      `${getToken("radio.focusRing.width:base")} solid ${getToken("radio.focusRing.color:base")}`,
    )
  })

  it("dims a disabled Radio", () => {
    render(<Plans disabled />)
    const label = screen.getAllByRole("radio")[0].closest("label")!
    expect(cssFor(label)).toContain(`opacity:${getToken("radio.disabledOpacity:base")}`)
  })

  it("forwards refs to the group and to each native radio", () => {
    const groupRef = React.createRef<HTMLDivElement>()
    const radioRef = React.createRef<HTMLInputElement>()
    render(
      <RadioGroup aria-label="Plan" ref={groupRef}>
        <Radio value="free" ref={radioRef} id="free-radio">
          Free
        </Radio>
      </RadioGroup>,
    )
    expect(groupRef.current).toBe(screen.getByRole("radiogroup"))
    expect(radioRef.current).toBe(screen.getByRole("radio"))
    expect(radioRef.current).toHaveAttribute("id", "free-radio")
  })

  describe("inside a Field", () => {
    it("is named by the Field label, described by its description and error, and invalid", () => {
      render(
        <Field label="Plan" id="plan" description="Billed monthly." error="Pick one" invalid required>
          <RadioGroup>
            <Radio value="free">Free</Radio>
            <Radio value="pro">Pro</Radio>
          </RadioGroup>
        </Field>,
      )
      const group = screen.getByRole("radiogroup", { name: "Plan" })
      expect(group).toHaveAttribute("id", "plan")
      expect(group).toHaveAttribute("aria-describedby", "plan-description plan-error")
      expect(group).toHaveAttribute("aria-invalid", "true")
      screen.getAllByRole("radio").forEach(radio => expect(radio).toBeRequired())
    })

    it("renders no aria-invalid, aria-describedby or required when the Field sets none", () => {
      render(
        <Field label="Plan">
          <Plans aria-label={undefined} />
        </Field>,
      )
      const group = screen.getByRole("radiogroup", { name: "Plan" })
      expect(group).not.toHaveAttribute("aria-invalid")
      expect(group).not.toHaveAttribute("aria-describedby")
      screen.getAllByRole("radio").forEach(radio => expect(radio).not.toBeRequired())
    })
  })

  it("is disabled natively by a disabled Fieldset", () => {
    render(
      <Fieldset legend="Plan" disabled>
        <Plans />
      </Fieldset>,
    )
    screen.getAllByRole("radio").forEach(radio => expect(radio).toBeDisabled())
  })
})
