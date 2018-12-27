import { keyframes, css } from 'styled-components'

const barAnimation = (props) => keyframes`
  to {
    transform: translateX(${props.offset}px);
  }
`

export const animationStyle = css`
  animation: ${barAnimation} 1s ease-in-out forwards;
`