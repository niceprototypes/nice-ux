import React from "react"
import Typography from "../../nice/Typography"

type StoryDescriptionKind = "css" | "svg"

interface StoryDescriptionProps {
  children: React.ReactNode
  property: string
  kind?: StoryDescriptionKind
  note?: React.ReactNode
}

const urlBase: Record<StoryDescriptionKind, string> = {
  css: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  svg: "https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute",
}

const label: Record<StoryDescriptionKind, { kind: string; suffix: string }> = {
  css: { kind: "CSS", suffix: "property" },
  svg: { kind: "SVG", suffix: "attribute" },
}

const StoryDescription: React.FC<StoryDescriptionProps> = ({
  children,
  property,
  kind = "css",
  note,
}) => {
  const Link = (
    <a href={`${urlBase[kind]}/${property}`}>
      <code>{property}</code>
    </a>
  )
  const { kind: kindLabel, suffix } = label[kind]
  return (
    <Typography color="light">
      {children} Maps to the {kindLabel} {Link} {suffix}
      {note ? <> ({note})</> : null}.
    </Typography>
  )
}

export default StoryDescription