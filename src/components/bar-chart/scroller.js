import React from 'react'
import styled from 'styled-components'

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
`

export default ({ offset, barWidth, barSpace, barsNumber, width }) => {
  const totalWidth = (barsNumber * (barWidth + barSpace))
  const periodWidth = (width * 100) / totalWidth
  const periodMargin = ((totalWidth  - (offset + width)) / totalWidth) * 100
  const positionStyle = { width: `${periodWidth}%`, marginLeft: `${periodMargin}%` }
  return (
    <Container>
      <Line>
        <Position style={positionStyle} />
      </Line>
    </Container>
  )
}