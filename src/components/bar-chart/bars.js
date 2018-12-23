import React from 'react'
import styled from 'styled-components'

import Bar from './bar'

const BarsView = styled.svg`
  width: 100%;
  height: 100%;
`

export default ({
  width,
  height,
  bars,
  barWidth,
  barSpace,
  onBarSelect,
  centerBarIndex,
  offset,
  oldOffset
}) => {
  const highest = bars.reduce((acc, bar) => {
    const height = bar.reduce((acc, { value }) => acc + value, 0)
    return height > acc ? height : acc
  }, 0)

  const barCommonProps = { height, width, barWidth, barSpace, oldOffset, offset, centerBarIndex, onBarSelect, highest }
  return (
    <BarsView>
      {bars.map((bar, index) => <Bar {...barCommonProps} bar={bar} index={index} key={index} />)}
    </BarsView>
  )
}
