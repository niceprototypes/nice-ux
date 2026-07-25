import * as React from "react"
import Flex from "nice-react-flex"
import Icon from "nice-react-icon"
import Ink from "../../../nice/Ink"
import { RepoLink, StatusPill, LicenseTag } from "./StoryHeader.styles"
import type { StoryHeaderProps } from "./StoryHeader.types"
import NewLines from "../../NewLines"

/**
 * Story header — renders the `title` as an `<h1>`, an optional `description`
 * paragraph, an optional row of `repos` links, then any `children`, then a
 * horizontal rule. Inserted at the top of every docs page.
 */
const StoryHeader: React.FC<StoryHeaderProps> = ({
  title,
  description,
  repos,
  children,
}) => (
  <>
    <Flex
      direction="column"
      gap="base"
      padding="larger none"
      margin="none none larger"
    >
      <Ink
        as="h1"
        size="larger"
        weight="semibold"
        color="light"
      >
        {title}
      </Ink>
      {description ? <Ink>{description}</Ink> : null}
      {repos?.length ? (
        <Flex
          gap="base"
          wrap="wrap"
          alignItems="center"
        >
          {repos.map(repo => (
            <RepoLink
              key={repo.url}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                name="github"
                size="base"
                color="link"
              />
              {repo.name}
              {repo.status ? <StatusPill>{repo.status}</StatusPill> : null}
              <LicenseTag>{repo.license}</LicenseTag>
            </RepoLink>
          ))}
        </Flex>
      ) : null}
      {children}
    </Flex>
    <NewLines />
  </>
)

export default StoryHeader
