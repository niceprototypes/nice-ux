import styled from "styled-components"
import { getToken } from "nice-react-styles"
import type { ToggleSizeType } from "./Toggle.types"

type SizeProps = { $size: ToggleSizeType }

const trackWidth = ({ $size }: SizeProps) => getToken(`toggle.track.width:${$size}`)
const trackHeight = ({ $size }: SizeProps) => getToken(`toggle.track.height:${$size}`)
const thumbSize = ({ $size }: SizeProps) => getToken(`toggle.thumb.size:${$size}`)
/** Space between the thumb and the track edge: the thumb sits centered in the track's height. */
const inset = (props: SizeProps) => `calc((${trackHeight(props)} - ${thumbSize(props)}) / 2)`

/** The root label: clicking anywhere on it, label text included, toggles the switch. */
export const StyledToggle = styled.label<{ $disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${getToken("toggle.gap:base")};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? getToken("toggle.disabledOpacity:base") : 1)};
`

/** Sizes the switch; the native checkbox and the drawn track share this box. */
export const StyledSwitch = styled.span<SizeProps>`
  position: relative;
  display: inline-block;
  flex-shrink: 0;
  width: ${trackWidth};
  height: ${trackHeight};
`

/** The native checkbox: invisible, but still the focus target, keyboard handler and hit area. */
export const StyledInput = styled.input`
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: inherit;
`

export const StyledThumb = styled.span<SizeProps>`
  position: absolute;
  top: ${inset};
  left: ${inset};
  width: ${thumbSize};
  height: ${thumbSize};
  border-radius: 50%;
  background-color: ${getToken("toggle.thumb.backgroundColor:base")};
  transition: transform ${getToken("toggle.transitionDuration:base")} ease-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const StyledTrack = styled.span<SizeProps>`
  position: absolute;
  inset: 0;
  border-radius: calc(${trackHeight} / 2);
  background-color: ${getToken("toggle.track.backgroundColor:base")};
  transition: background-color ${getToken("toggle.transitionDuration:base")} ease-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  ${StyledInput}:checked + & {
    background-color: ${getToken("toggle.track.backgroundColor:checked")};
  }

  /* Checked: the thumb travels the track width less its own size and both insets. */
  ${StyledInput}:checked + & ${StyledThumb} {
    transform: translateX(calc(${trackWidth} - ${thumbSize} - 2 * ${inset}));
  }

  /* Keyboard focus ring, on the drawn track; the native checkbox is invisible. */
  ${StyledInput}:focus-visible + & {
    outline: ${getToken("toggle.focusRing.width:base")} solid ${getToken("toggle.focusRing.color:base")};
    outline-offset: ${getToken("toggle.focusRing.offset:base")};
  }
`
