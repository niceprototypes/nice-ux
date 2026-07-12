import * as React from "react"
import Flex from "nice-react-flex"
import Icon from "nice-react-icon"
import Typography from "../../../nice/Typography"
import { HeaderFlex, RepoLink, StatusPill } from "./StoryHeader.styles"
import type { StoryHeaderProps } from "./StoryHeader.types"

/**
 * Story header — renders the `title` as an `<h1>`, an optional `description`
 * paragraph, an optional row of `repositories` links, then any `children`, then
 * a horizontal rule. Inserted at the top of every docs page.
 */
const StoryHeader: React.FC<StoryHeaderProps> = ({ title, description, repositories, children }) => (
  <HeaderFlex gap="small" padding="base none">
    <Typography as="h1" size="large" weight="semibold" color="light">{title}</Typography>
    {description ? <Typography>{description}</Typography> : null}
    {repositories?.length ? (
      <Flex gap="base" wrap="wrap" alignItems="center">
        {repositories.map(repo => (
          <RepoLink key={repo.url} href={repo.url} target="_blank" rel="noopener noreferrer">
            <Icon name={repo.icon} size="base" />
            {repo.name}
            {repo.status ? <StatusPill>{repo.status}</StatusPill> : null}
          </RepoLink>
        ))}
      </Flex>
    ) : null}
    {children}
  </HeaderFlex>
)

export default StoryHeader
