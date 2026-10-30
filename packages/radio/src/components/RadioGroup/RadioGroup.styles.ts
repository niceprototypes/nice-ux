import styled from "styled-components"
import { getToken } from "@niceprototypes/styles"
import type { RadioGroupDirectionType, RadioGroupGapType } from "./RadioGroup.types"

/** The radiogroup: a flex row or column, spaced by the core `gap` tokens. */
export const StyledRadioGroup = styled.div<{ $direction: RadioGroupDirectionType; $gap: RadioGroupGapType }>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  gap: ${({ $gap }) => getToken("gap", $gap)};
`
