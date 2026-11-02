// StickySection example configs — one ComponentExample per prop, shaped like Toggle's. The element
// a section renders is not visible, so each preview reads its tag back from the DOM.
import type * as React from "react"
import { useEffect, useState } from "react"
import { StickySection } from "@niceprototypes/scroll"
import type { StickySectionElementType, StickySectionRenderType } from "@niceprototypes/scroll"
import Ink from "@niceprototypes/ink"
import type { ComponentExample } from "../../dataTables/components/demos/Components"

/** The tag of the element carrying `id`, read after render. */
const RenderedTag = ({ id }: { id: string }) => {
  const [tag, setTag] = useState<string>()
  useEffect(() => setTag(document.getElementById(id)?.tagName.toLowerCase()), [id])
  return (
    <Ink
      size="small"
      color="light"
    >
      {tag ? `Rendered as <${tag}>` : "No element carries the id"}
    </Ink>
  )
}

/** A section holding a heading and its own rendered tag. */
const Section = ({ id, as, render }: { id: string; as?: StickySectionElementType; render?: StickySectionRenderType }) => (
  <StickySection
    id={id}
    as={as}
    render={render}
  >
    <Ink as="h3">About</Ink>
    <RenderedTag id={id} />
  </StickySection>
)

/** An `<article>` carrying the id. */
const renderArticle: StickySectionRenderType = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <article id={id}>{children}</article>
)

const AS_VARIANTS = ["section", "div", "article"] as const satisfies readonly StickySectionElementType[]

export const stickySectionChildren = {
  name: "children",
  description: "Content of the section, inside an element carrying the id that StickySectionLinks points at.",
  variants: ["heading"],
  default: "heading",
  preview: () => <Section id="stickysection-children" />,
  code: () => `<StickySection id="about">\n  <Ink as="h3">About</Ink>\n</StickySection>`,
} satisfies ComponentExample

export const stickySectionAs = {
  name: "as",
  description: "The element the section renders.",
  variants: AS_VARIANTS,
  default: "section",
  preview: (variant: StickySectionElementType) => (
    <Section
      id={`stickysection-as-${variant}`}
      as={variant}
    />
  ),
  code: variant =>
    variant === "section"
      ? `<StickySection id="about">\n  <Ink as="h3">About</Ink>\n</StickySection>`
      : `<StickySection id="about" as="${variant}">\n  <Ink as="h3">About</Ink>\n</StickySection>`,
} satisfies ComponentExample

export const stickySectionRender = {
  name: "render",
  description:
    "Renders the section from its id and children instead of the as element; the result must carry the id. Each preview also sets as=\"aside\".",
  variants: ["none", "article"],
  default: "none",
  preview: variant => (
    <Section
      id={`stickysection-render-${variant}`}
      as="aside"
      render={variant === "article" ? renderArticle : undefined}
    />
  ),
  code: variant =>
    variant === "article"
      ? `<StickySection\n  id="about"\n  as="aside"\n  render={({ id, children }) => <article id={id}>{children}</article>}\n>\n  <Ink as="h3">About</Ink>\n</StickySection>`
      : `<StickySection id="about" as="aside">\n  <Ink as="h3">About</Ink>\n</StickySection>`,
} satisfies ComponentExample

/** Every StickySection example facet — each one a section of the StickySection docs page. */
export const stickySectionExamples = {
  children: stickySectionChildren,
  as: stickySectionAs,
  render: stickySectionRender,
} satisfies Record<string, ComponentExample>
