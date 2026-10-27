import * as React from "react"
import Flex from "nice-react-flex"
import Ink from "../../../nice/Ink"
import RepoLink from "../../RepoLink"
import type { StoryHeaderProps } from "./StoryHeader.types"
import NewLines from "../../NewLines"

/**
 * Story header — renders the `title` as an `<h1>`, an optional `description`
 * paragraph, an optional row of `repos` links, then any `children`, then a
 * horizontal rule. Inserted at the top of every docs page.
 *
 * A page's first section heading is not part of the header: render it as an
 * `<Ink as="h2">` directly after `<StoryHeader />`.
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
    >
      <Ink as="h1">{title}</Ink>
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
              repo={repo}
            />
          ))}
        </Flex>
      ) : null}
      {children}
    </Flex>
    <NewLines />
  </>
)

export default StoryHeader
