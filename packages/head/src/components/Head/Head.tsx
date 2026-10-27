import { useEffect, useMemo } from "react"
import { buildSeoTags } from "../../services/buildSeoTags"
import { buildGoogleAnalyticsConfig } from "../../services/buildGoogleAnalyticsConfig"
import { buildAdobeAnalyticsConfig } from "../../services/buildAdobeAnalyticsConfig"
import { mergeHeadResources } from "../../utilities/mergeHeadResources"
import { injectHeadResources } from "../../utilities/injectHeadResources"
import type { HeadProps } from "./types"

/**
 * Declares document head content — page SEO, analytics, and anything raw.
 *
 * Split by what the platform can do. React 19 hoists `<title>`, `<meta>`,
 * `<link>` and **async external** `<script src>` from anywhere in the tree and
 * deduplicates them, so those render as JSX and React owns their lifecycle.
 * Inline scripts get no such treatment, so they are written to `<head>`
 * imperatively and removed on unmount.
 *
 * Every prop resolves through the same builders `injectHead` uses, so a React
 * app and a non-React one produce identical markup.
 *
 * @example
 * <Head
 *   seo={{
 *     title: "Nice Prototypes",
 *     description: "A zero-to-one design and development agency.",
 *     canonical: "https://niceprototypes.com/",
 *     openGraph: { siteName: "Nice Prototypes", image: "https://niceprototypes.com/og.png" },
 *   }}
 *   googleAnalytics="G-MLPED529MH"
 * />
 *
 * @example
 * // Per-route override — title and canonical only, inheriting nothing.
 * <Head seo={{ title: "HelpShelf", canonical: "https://niceprototypes.com/project/helpshelf" }} />
 */
export function Head({
  children,
  seo,
  googleAnalytics,
  adobeAnalytics,
  metas,
  links,
  scripts,
}: HeadProps) {
  const resources = useMemo(
    () =>
      mergeHeadResources(
        seo ? buildSeoTags(seo) : null,
        googleAnalytics ? buildGoogleAnalyticsConfig(googleAnalytics) : null,
        adobeAnalytics ? buildAdobeAnalyticsConfig(adobeAnalytics) : null,
        { metas, links, scripts }
      ),
    [seo, googleAnalytics, adobeAnalytics, metas, links, scripts]
  )

  // Inline scripts only — everything else renders below and is React's to own.
  const inlineScripts = useMemo(
    () => (resources.scripts ?? []).filter(script => script.inline),
    [resources]
  )

  useEffect(() => {
    if (inlineScripts.length === 0) return
    return injectHeadResources({ scripts: inlineScripts })
  }, [inlineScripts])

  return (
    <>
      {resources.title !== undefined && <title>{resources.title}</title>}

      {resources.metas?.map(meta => (
        <meta
          key={meta.name ?? meta.property ?? meta.httpEquiv ?? meta.charSet}
          {...(meta.name && { name: meta.name })}
          {...(meta.property && { property: meta.property })}
          {...(meta.httpEquiv && { httpEquiv: meta.httpEquiv })}
          {...(meta.charSet && { charSet: meta.charSet })}
          {...(meta.content && { content: meta.content })}
        />
      ))}

      {resources.links?.map(link => (
        <link
          key={`${link.rel}:${link.href}`}
          rel={link.rel}
          href={link.href}
          {...(link.crossOrigin && { crossOrigin: link.crossOrigin })}
          {...(link.type && { type: link.type })}
          {...(link.media && { media: link.media })}
          {...(link.hrefLang && { hrefLang: link.hrefLang })}
          {...(link.as && { as: link.as })}
          {...(link.precedence && { precedence: link.precedence })}
        />
      ))}

      {/* Async external scripts only: React hoists these and dedupes by src.
          A non-async script would render in place instead, which is why the
          builders always set async and inline bodies go through useEffect. */}
      {resources.scripts
        ?.filter(script => script.src && script.async)
        .map(script => (
          <script
            key={script.id ?? script.src}
            async
            src={script.src}
            {...(script.type && { type: script.type })}
            {...(script.crossOrigin && { crossOrigin: script.crossOrigin })}
          />
        ))}

      {children}
    </>
  )
}
