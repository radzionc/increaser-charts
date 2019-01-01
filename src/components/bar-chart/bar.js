import React from 'react'
import { sum } from '../../utils';

export default ({
  bar,
  index,
  height,
  barWidth,
  barSpace,
  centerBarIndex,
  onBarSelect,
  highest,
  startIndex
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
        opacity={realIndex === centerBarIndex ? 1 : 0.6}
        x={x}
        y={y}
        width={barWidth}
        height={rectHeight}
        fill={color}
      />
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
        const valueBefore = sum(bar.slice(0, index))
        const props = { value, color, valueBefore, key: index }
        
        return <Subbar {...props} />
      })}
      {onBarSelect && <Selectable/>}
    </g>
  )
}