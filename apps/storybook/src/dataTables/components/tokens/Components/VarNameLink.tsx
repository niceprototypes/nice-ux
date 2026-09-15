import * as React from "react"
import { getToken } from "nice-react-styles"
import Tooltip from "nice-react-tooltip"
import { parseTokenVarLink, HIGHLIGHT_KEY } from "../../../../services"
import { TokenVarLink } from "./Components.styles"

interface VarNameLinkProps {
  /** A `var(--np--…)` reference to render as a linked, hover-previewed token name. */
  reference: string
}

/**
 * A `var(--np--…)` reference rendered as its inner `--np--…` name, linked to the
 * token's Modules story and previewing the token's resolved default on hover.
 * A reference with no Modules story renders verbatim.
 */
export const VarNameLink = ({ reference }: VarNameLinkProps) => {
  const link = parseTokenVarLink(reference)
  if (!link) return <>{reference}</>

  const anchor = (
    <TokenVarLink
      href={link.href}
      target="_top"
      // Stash the target so its Modules table highlights it on landing.
      onClick={() => {
        try {
          sessionStorage.setItem(HIGHLIGHT_KEY, link.token)
        } catch {
          /* sessionStorage unavailable — highlight is best-effort */
        }
      }}
    >
      {reference.slice("var(".length, -1)}
    </TokenVarLink>
  )

  // Preview the canonical (pristine) default. parseTokenVarLink reports theme
  // primitives / undefined variants as the variant, which getToken rejects —
  // so guard and drop the preview rather than crash the row.
  let value: string | null = null
  try {
    value = getToken(link.group, link.variant, { pristine: true, as: "value" })
  } catch {
    value = null
  }

  return value !== null ? (
    <Tooltip content={value} trigger="hover" delayShow={500}>{anchor}</Tooltip>
  ) : (
    anchor
  )
}