import React from 'react'
import styled from 'styled-components'

export default ({
  bar,
  index,
  width,
  height,
  barWidth,
  barSpace,
  centerBarIndex,
  onBarSelect,
  highest
}) => {
  const x = width - (barWidth + barSpace) * (index + 1)
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
    <g key={index}>
      {bar.map(({ value, color }, index) => {
        const valueBefore = bar.slice(0, index).reduce((acc, { value }) => acc + value, 0)
        const props = { value, color, valueBefore, key: index }
        
        return <Subbar {...props} />
      })}
      {onBarSelect && <Selectable/>}
    </g>
  )
}