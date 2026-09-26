import { getToken } from "nice-react-styles"
import Flex from "nice-react-flex"
import Image from "nice-react-image"
import Ink from "../../nice/Ink"
import PreviewCell from "../../components/PreviewCell"
import ThemeSplit from "../../components/ThemeSplit"
import DemoDots from "../../components/DemoDots"
import { TokenPreview } from "../../components/TokenPreview"
import { ColorSample, Dot, EasingPath, EasingSvg, Track } from "../../dataTables/data/styles"
import { loremIpsum } from "../../dataTables/data/constants"
import type { Renderer } from "./index"

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

  "tokens-animation-animationeasing": ({ path }) => (
    <Flex
      grow={1}
      padding="smaller"
      style={{
        backgroundColor: getToken("backgroundColor", "raised"),
        border: `1px solid ${getToken("borderColor")}`,
        borderRadius: getToken("borderRadius", "small"),
      }}
    >
      <EasingSvg viewBox="0 0 60 24">
        <EasingPath d={path} />
      </EasingSvg>
    </Flex>
  ),

  "tokens-borders-borderradius": (variant) => (
    <PreviewCell
      backgroundColor={getToken("backgroundColor", "raised")}
      borderColor={getToken("borderColor")}
      height={getToken("size", variant)}
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

  // One swatch under both themes; the cascade resolves each half.
  "tokens-colors-backgroundcolor": (variant) => (
    <ThemeSplit>
      <PreviewCell
        backgroundColor={getToken("backgroundColor", variant)}
        height={getToken("size", "large")}
        borderRadius={getToken("borderRadius", "small")}
      />
    </ThemeSplit>
  ),

  // The stroke colour shown as a fill, so it reads directly rather than as a
  // hairline. One swatch under both themes; the cascade resolves each half.
  "tokens-colors-bordercolor": (variant) => (
    <ThemeSplit>
      <PreviewCell
        backgroundColor={getToken("borderColor", variant)}
        height={getToken("size", "large")}
        borderRadius={getToken("borderRadius", "small")}
      />
    </ThemeSplit>
  ),

  "tokens-colors-brandcolor": (variant) => (
    <PreviewCell
      backgroundColor={getToken("brandColor", variant)}
      height={getToken("size", "large")}
      borderRadius={getToken("borderRadius", "small")}
    />
  ),

  // One swatch, rendered under both themes by ThemeSplit. The reads are
  // unpinned: each half is a real nested theme, so the cascade resolves them.
  // The surface is pinned alongside the sample because a colour alone is not
  // legible — night text on a day-lit cell is near-white on near-white.
  "tokens-colors-color": (variant) => (
    <ThemeSplit>
      <PreviewCell
        backgroundColor={getToken("backgroundColor", "base")}
        height={getToken("size", "large")}
        borderRadius={getToken("borderRadius", "small")}
        alignItems="center"
        justifyContent="flex-start"
      >
        <ColorSample size="large" $color={getToken("color", variant)}>
          {label(variant)}
        </ColorSample>
      </PreviewCell>
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
        src="rasters/tokens/image-02.jpeg"
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
      />
    </Flex>
  ),

  "tokens-zindex": (variant) => <TokenPreview.ZIndex variant={variant} />,
}
