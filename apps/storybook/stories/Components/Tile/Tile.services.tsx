import Flex from "nice-react-flex"
import Typography from "nice-react-typography"
import { getToken } from "nice-styles"

export const SampleContent = () => (
  <Flex direction="column" gap="small">
    <Typography as="h2" weight="bold">
      Section Title
    </Typography>
    <Typography color="medium">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </Typography>
  </Flex>
)

export const SideContent = ({ label }: { label: string }) => (
  <Flex
    style={{
      width: "80px",
      height: "80px",
      borderRadius: getToken("borderRadius", "base").var,
    }}
    alignItems="center"
    justifyContent="center"
  >
    <Typography size="small" color="medium">
      {label}
    </Typography>
  </Flex>
)
