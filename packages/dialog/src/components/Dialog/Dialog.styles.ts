import styled from "styled-components"
import { getToken } from "@niceprototypes/styles"

/**
 * The native `<dialog>`. `showModal()` places it in the top layer, so it needs
 * no portal or z-index. Padding is zero so a click whose target is the dialog
 * element itself can only be a backdrop click; the padding lives on
 * `StyledDialogContent`. Centering stays on the user-agent default.
 */
export const StyledDialog = styled.dialog`
  padding: 0;
  border: none;
  width: ${getToken("dialog.width:base")};
  max-width: ${getToken("dialog.maxWidth:base")};
  background-color: ${getToken("dialog.backgroundColor:base")};
  color: ${getToken("dialog.color:base")};
  border-radius: ${getToken("dialog.borderRadius:base")};
  box-shadow: ${getToken("dialog.boxShadow:base")};

  &::backdrop {
    background-color: ${getToken("dialog.backdrop.backgroundColor:base")};
  }

  &:focus {
    outline: none;
  }
`

/** Fills the dialog and carries its padding and vertical rhythm. */
export const StyledDialogContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${getToken("dialog.gap:base")};
  padding: ${getToken("dialog.padding:base")};
`

export const StyledDialogTitle = styled.h2`
  margin: 0;
  font-size: ${getToken("dialog.title.fontSize:base")};
  font-weight: ${getToken("dialog.title.fontWeight:base")};
`

export const StyledDialogDescription = styled.p`
  margin: 0;
  color: ${getToken("dialog.description.color:base")};
`

export const StyledDialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${getToken("dialog.actions.gap:base")};
`
