import styled from "styled-components"

export const Trigger = styled.div`
  cursor: pointer;
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
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

export const Caption = styled.div`
  max-width: 600px;
  padding: 16px 24px;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
`

export const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`

export const Description = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
`