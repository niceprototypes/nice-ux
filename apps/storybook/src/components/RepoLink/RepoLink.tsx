import * as React from "react"
import Icon from "nice-react-icon"
import { Anchor, StatusPill, LicenseInk, LicenseFlex } from "./RepoLink.styles"
import type { RepoLinkProps } from "./RepoLink.types"
import Flex from "nice-react-flex"
import Ink from "../../nice/Ink"

/**
 * A single GitHub repo link — the brand icon, the package name, an optional
 * dependency-status pill, and the SPDX license tag. Opens in a new tab.
 */
const RepoLink: React.FC<RepoLinkProps> = ({ repo }) => (
  <Anchor
    href={repo.url}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon
      name="github"
      size="base"
      color="link"
    />
    <Ink
      code
      size="small"
      color="link"
    >
      {repo.name}
    </Ink>
    {repo.status ? <StatusPill>{repo.status}</StatusPill> : null}
    <LicenseFlex padding="none smaller">
      <LicenseInk
        code
        size="small"
        color="lighter"
      >
        {repo.license}
      </LicenseInk>
    </LicenseFlex>
  </Anchor>
)

export default RepoLink
