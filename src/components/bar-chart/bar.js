import React from 'react'
import styled, { keyframes } from 'styled-components'

const barAnimation = (props) => keyframes`
  from {
    transform: none;
  }
  to {
    transform: translateX(${props.offset}px);
  }
`

const BarContainer = styled.g`
  animation: ${barAnimation} 1.2s ease-in-out forwards;
`

export default ({
  bar,
  index,
  width,
  height,
  barWidth,
  barSpace,
  oldOffset,
  offset,
  centerBarIndex,
  onBarSelect,
  highest
}) => {
  const x = width - (barWidth + barSpace) * (index + 1) + oldOffset
  const valueToHeight = value => (value * height) / highest
      
  const Subbar = ({ valueBefore, value, color }) => {
    const rectHeight = valueToHeight(value)
    const y = height - valueToHeight(valueBefore) - rectHeight

    return (
      <rect opacity={index === centerBarIndex ? 1 : 0.8} x={x} y={y} width={barWidth} height={rectHeight} fill={color}/>
    )
  }

  const Selectable = () => (
    <rect
      onClick={() => onBarSelect(index)}
      cursor={'pointer'}
      x={x - barSpace / 2}
      width={barWidth + barSpace}
      y={0}
      height={height}
      fill={'transparent'}
    />
  )
  return (
    <BarContainer key={index} offset={offset - oldOffset}>
      {bar.map(({ value, color }, index) => {
        const valueBefore = bar.slice(0, index).reduce((acc, { value }) => acc + value, 0)
        const props = { value, color, valueBefore, key: index }
        
        return <Subbar {...props} />
      })}
      {onBarSelect && <Selectable/>}
    </BarContainer>
  )
}