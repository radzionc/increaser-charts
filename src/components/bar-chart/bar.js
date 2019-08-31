import React from 'react'
import styled from 'styled-components'
import { sum } from '../../utils'

const Text = styled.text`
  fill: ${props => props.theme.mainColor};
  font-size: ${props => props.theme.labelFontSize}px;
  pointer-events: none;
`

export default ({
  bar,
  index,
  height,
  barWidth,
  barSpace,
  centerBarIndex,
  onBarSelect,
  highest,
  text,
  startIndex,
  labelFontSize
}) => {
  const barTotalWidth = barWidth + barSpace
  const realIndex = index + startIndex
  const x = barTotalWidth * index + barSpace
  const valueToHeight = value => (value * height) / highest
      
  const Subbar = ({ valueBefore, value, color }) => {
    const rectHeight = valueToHeight(value)
    const y = height - valueToHeight(valueBefore) - rectHeight

    return (
      <rect
        opacity={(realIndex === centerBarIndex) || !onBarSelect ? 1 : 0.6}
        x={x}
        y={y}
        width={barWidth}
        height={rectHeight}
        fill={color}
      />
    )
  }
  const BarText = () => {
    if (!text) return null
    const barHeight = sum(bar.map(b => valueToHeight(b.value)))
    const y = labelFontSize * 2 > barHeight ? height - labelFontSize : height - barHeight + labelFontSize
    return (
      <Text
        width={barWidth}
        x={x + barWidth / 2}
        y={y}
        dominantBaseline="middle"
        textAnchor="middle"
      >{text}</Text>
    )
  }
  const Selectable = () => (
    <rect
      onTouchEnd={(e) => {
        onBarSelect(realIndex)
        e.preventDefault()
      }}
      onClick={() => onBarSelect(realIndex)}
      cursor={'pointer'}
      x={x - barSpace / 2}
      width={barTotalWidth}
      y={0}
      height={height}
      fill={'transparent'}
    />
  )

  return (
    <g>
      {bar.map(({ value, color }, index) => {
        const valueBefore = sum(bar.slice(0, index).map(b => b.value))
        const props = { value, color, valueBefore, key: index }
        
        return <Subbar {...props} />
      })}
      <BarText/>
      {onBarSelect && <Selectable/>}
    </g>
  )
}