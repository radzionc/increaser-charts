import React from 'react'
import styled from 'styled-components'

import { animationStyle } from '../styles'


const Container = styled.div`
  height: 20px;
  width: 100%;
`

const Line = styled.div`
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.15);
`

const Position = styled.div`
  height: 4px;
  background-color: ${props => props.theme.textColor};
  ${animationStyle}
`

export default ({ oldOffset, offset, barWidth, barSpace, barsNumber, width }) => {
  const totalWidth = (barsNumber * (barWidth + barSpace))
  const periodWidth = (width * 100) / totalWidth
  const getMargin = offset => ((totalWidth  - (offset + width)) / totalWidth) * 100
  const periodMargin = getMargin(oldOffset)
  const animationOffset = getMargin(offset) - periodMargin
  const positionStyle = { width: `${periodWidth}%`, marginLeft: `${periodMargin}%` }
  return (
    <Container>
      <Line>
        <Position offset={(animationOffset * width) / 100} style={positionStyle} />
      </Line>
    </Container>
  )
}