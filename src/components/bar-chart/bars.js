import React from 'react'
import styled from 'styled-components'

import Bar from './bar'
import { animationStyle } from '../styles'

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
`

const BarsView = styled.svg`
  position: absolute;
  height: 100%;
  ${animationStyle}
`

export default ({
  width,
  height,
  items,
  barWidth,
  barSpace,
  onBarSelect,
  centerBarIndex,
  offset,
  oldOffset,
  totalWidth
}) => {
  const highest = items.reduce((acc, bar) => {
    const height = bar.reduce((acc, { value }) => acc + value, 0)
    return height > acc ? height : acc
  }, 0)

  const barCommonProps = { height, barWidth, barSpace, oldOffset, offset, centerBarIndex, onBarSelect, highest }
  const left = width + oldOffset - totalWidth
  return (
    <Container>
      <BarsView style={{ width: totalWidth, left }} offset={offset - oldOffset}>
        {items.map((bar, index) => <Bar {...barCommonProps} bar={bar} index={index} key={index} />)}
      </BarsView>
    </Container>
  )
}
