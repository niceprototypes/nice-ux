import styled from "styled-components"
import { getToken } from "../../tokens"

/** The live preview: the component on the page surface, framed, with room around it. */
export const StyledPlaygroundPreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${getToken("gap", "large")};
  border: ${getToken("borderWidth")} solid ${getToken("borderColor")};
  border-radius: ${getToken("borderRadius")};
`

/** The controls: one row per prop, its name beside its control. */
export const StyledPlaygroundControls = styled.div`
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  align-items: center;
  gap: ${getToken("gap", "small")} ${getToken("gap")};
`
