import styled from "styled-components"
import { getToken } from "@niceprototypes/styles"

export const Trigger = styled.div`
  cursor: pointer;

  &:focus-visible {
    outline: ${getToken("lightbox.focusRing.width:base")} solid ${getToken("lightbox.focusRing.color:base")};
    outline-offset: ${getToken("lightbox.focusRing.offset:base")};
  }
`

/**
 * The native `<dialog>`, shown with `showModal()`: the top layer needs no z-index and makes the
 * page behind it inert. It fills the viewport and carries the scrim itself, so a click whose target
 * is the dialog is a click outside the image and caption; the user-agent backdrop is cleared.
 */
export const Overlay = styled.dialog`
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: 0;
  border: none;
  background-color: ${getToken("lightbox.backgroundColor:base")};
  cursor: pointer;

  &[open] {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &::backdrop {
    background: none;
  }

  &:focus {
    outline: none;
  }
`

export const Image = styled.img`
  max-width: ${getToken("lightbox.image.maxWidth:base")};
  max-height: ${getToken("lightbox.image.maxHeight:base")};
  object-fit: contain;
`
