import { getToken } from "@niceprototypes/styles"
import Flex from "@niceprototypes/flex"
import Image from "@niceprototypes/image"
import Ink from "../../nice/Ink"
import PreviewCell from "../../components/PreviewCell"
import ThemeSplit from "../../components/ThemeSplit"
import DemoDots from "../../components/DemoDots"
import { TokenPreview } from "../../components/TokenPreview"
import { Dot, EasingAcross, EasingBall, EasingChart, EasingPath, EasingRail, EasingRise, EasingSvg, Track } from "../../dataTables/data/styles"
import { loremIpsum } from "../../dataTables/data/constants"
import type { Renderer } from "./index"
import { assetUrl } from "../../utilities/assetUrl"

/** Capitalized variant name, for text previews. */
const label = (variant: string) => variant.charAt(0).toUpperCase() + variant.slice(1)

/**
 * Token-table previews, keyed by the id of the Tokens page that renders them.
 * Each receives one row: the variant name, or the variant object from the
 * page's `variants` in storybook.json.
 */
export const tokenRenderers: Record<string, Renderer> = {
  "tokens-animation-animationduration": (variant) => (
    <Track grow={1}>
      <Dot $variant={variant} />
    </Track>
  ),

  "tokens-animation-animationeasing": ({ path, variant }) => (
    <Flex
      grow={1}
      padding="smaller"
      style={{
        backgroundColor: getToken("backgroundColor", "raised"),
        border: `1px solid ${getToken("borderColor")}`,
        borderRadius: getToken("borderRadius", "small"),
      }}
    >
      <EasingChart>
        <EasingSvg viewBox="0 0 60 24">
          <EasingPath d={path} />
        </EasingSvg>
        {/* The ball rides the curve: x linear in time, y on this token's easing. */}
        <EasingRail>
          <EasingAcross>
            <EasingRise $easing={getToken("animationEasing", variant, { as: "value" })}>
              <EasingBall />
            </EasingRise>
          </EasingAcross>
        </EasingRail>
      </EasingChart>
    </Flex>
  ),

  // The cell grows with the variant, one size step each; size has no "none", so that row takes the smallest.
  "tokens-borders-borderradius": (variant) => (
    <PreviewCell
      backgroundColor={getToken("backgroundColor", "raised")}
      borderColor={getToken("borderColor")}
      height={getToken("size", variant === "none" ? "smaller" : variant)}
      borderRadius={getToken("borderRadius", variant)}
    />
  ),

  // A bordered rectangle (not a single line) so each variant's thickness reads
  // around the whole shape; "none" renders as no border.
  "tokens-borders-borderwidth": (variant) => (
    <PreviewCell
      height={getToken("size", "large")}
      borderColor={getToken("color", "light")}
      borderWidth={getToken("borderWidth", variant)}
    />
  ),

  // A bordered cell under both themes, its border the large width times the scale: the
  // night half reads thinner (0.9) than the day half (1).
  "tokens-borders-strokewidthscale": (variant) => (
    <ThemeSplit>
      <PreviewCell
        height={getToken("size", "large")}
        borderColor={getToken("color")}
        borderWidth={`calc(${getToken("borderWidth", "large")} * ${getToken("strokeWidthScale", variant)})`}
      />
    </ThemeSplit>
  ),

  "tokens-fonts-fontfamily": ({ weight, code, text }) => (
    <Ink size="large" weight={weight} code={code}>
      {text}
    </Ink>
  ),

  "tokens-fonts-fontsize": (variant) => <Ink size={variant}>{label(variant)}</Ink>,

  "tokens-fonts-fontweight": (variant) => <Ink weight={variant}>{label(variant)}</Ink>,

  // letter-spacing is inherited, so set it on the wrapper and let it cascade to
  // the Ink text.
  "tokens-fonts-letterspacing": (variant) => (
    <Flex style={{ letterSpacing: getToken("letterSpacing", variant) }}>
      <Ink size="large" weight="medium">Letterspacing</Ink>
    </Flex>
  ),

  "tokens-fonts-lineheight": (variant) => <Ink lineHeight={variant}>{loremIpsum}</Ink>,

  // A portrait photo (2:3, 1066×1600) in a wide box, so contain / cover / fill /
  // none / scale-down each render visibly differently: the face shows stretching,
  // the edges show cropping, and the inverse background shows letterboxing.
  "tokens-sizes-backgroundsize": (variant) => (
    <Flex direction="column" grow={1}>
      <Image
        as="div"
        src={assetUrl("rasters/tokens/image-02.jpeg")}
        alt={`background-size ${variant}`}
        backgroundSize={variant}
        borderRadius="small"
        style={{
          width: "100%",
          height: "8em",
          backgroundColor: getToken("backgroundColor", "base", { inverse: true }),
        }}
      />
    </Flex>
  ),

  "tokens-sizes-gap": (variant) => (
    <DemoDots
      gap={variant}
      dots={[
        {
          color: getToken("color", "error"),
          width: getToken("size", "smaller"),
          height: getToken("size", "smaller"),
        },
        {
          color: getToken("color", "link"),
          width: getToken("size", "smaller"),
          height: getToken("size", "smaller"),
        },
      ]}
    />
  ),

  "tokens-sizes-size": (variant) => (
    <PreviewCell
      backgroundColor={getToken("backgroundColor", "raised")}
      borderColor={getToken("borderColor")}
      height={getToken("size", variant)}
      borderRadius={getToken("borderRadius", "small")}
    />
  ),

  "tokens-boxshadow": (variant) => (
    <Flex
      grow={1}
      padding="large"
      style={{
        backgroundColor: getToken("backgroundColor", "raised"),
        border: `1px solid ${getToken("borderColor")}`,
        borderRadius: getToken("borderRadius", "small"),
      }}
    >
      <Flex
        grow={1}
        style={{
          backgroundColor: getToken("backgroundColor"),
          height: getToken("size", "large"),
          borderRadius: getToken("borderRadius", "small"),
          boxShadow: getToken("boxShadow", variant),
        }}
      >
        {null}
      </Flex>
    </Flex>
  ),

  "tokens-zindex": (variant) => <TokenPreview.ZIndex variant={variant} />,
}
