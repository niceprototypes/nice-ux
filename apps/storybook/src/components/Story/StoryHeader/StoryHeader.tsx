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
 *
 * A page whose body opened with a `##` line and its paragraph passes them as
 * `heading` / `headingDescription` instead, so the whole block is one element.
 */
const StoryHeader: React.FC<StoryHeaderProps> = ({
  title,
  description,
  heading,
  headingDescription,
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
    {/* The page's first section, in the same order it had as MDX body content.
        Rendered with Ink, like the title above, rather than as raw headings the
        docs stylesheet would style. */}
    {heading ? (
      <Flex
        direction="column"
        gap="base"
        margin="larger none large"
      >
        <Ink
          as="h2"
          size="larger"
          weight="semibold"
        >
          {heading}
        </Ink>
        {headingDescription ? <Ink as="p">{headingDescription}</Ink> : null}
      </Flex>
    ) : null}
  </>
)

export default StoryHeader
