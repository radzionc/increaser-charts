import React from 'react'

export default ({
  bar,
  index,
  height,
  barWidth,
  barSpace,
  centerBarIndex,
  onBarSelect,
  highest
}) => {
  const x = (barWidth + barSpace) * index + 1
  const valueToHeight = value => (value * height) / highest
      
  const Subbar = ({ valueBefore, value, color }) => {
    const rectHeight = valueToHeight(value)
    const y = height - valueToHeight(valueBefore) - rectHeight

    return (
      <rect opacity={index === centerBarIndex ? 1 : 0.6} x={x} y={y} width={barWidth} height={rectHeight} fill={color}/>
    )
  }

  const Selectable = () => (
    <rect
      onTouchEnd={() => onBarSelect(index)}
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