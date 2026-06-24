import Image from "nice-react-image"
import Flex from "nice-react-flex"
import type { TokenTable } from "../TokenTable.types"
import { getToken } from "nice-styles"

// The vendor photo is 4:3 (the resolver's default 800×600 from
// nice-react-image-vendor, registered in .storybook/preview.tsx), so
// contain / cover / fill / none / scale-down each render visibly differently in
// the box. The box is sized via `style`; a fixed picsum id keeps the same photo
// across every variant so only the fit differs.
export const backgroundSize = {
  name: "backgroundSize",
  description:
    "Image fit tokens — map to CSS object-fit (img) / background-size (div). Demoed via nice-react-image with a vendor-generated photo.",
  variants: ["contain", "cover", "fill", "none", "scale-down"],
  preview: (variant) => (
    <Flex direction="column" grow={1}>
      <Image
        as="div"
        vendor
        width={960}
        height={1280}
        src="12"
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

} satisfies TokenTable
