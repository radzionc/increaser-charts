import { keyframes, css } from 'styled-components'

const barAnimation = (props) => keyframes`
  to {
    transform: translateX(${props.offset + Math.random() * 0.0000001}px);
  }
`

export const animationStyle = css`
  animation: ${barAnimation} 1s ease-in-out forwards;
`