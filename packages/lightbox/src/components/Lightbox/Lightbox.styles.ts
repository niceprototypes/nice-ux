import styled from "styled-components"
import { getLightboxToken } from "../../tokens"

export const Trigger = styled.div`
  cursor: pointer;
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${getLightboxToken("zIndex").var};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
  cursor: pointer;
`

export const Image = styled.img`
  max-width: 90vw;
  max-height: 80vh;
  object-fit: contain;
`