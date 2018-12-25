import React from 'react'
import styled from 'styled-components'

import { animationStyle } from '../styles'

const Container = styled.div`
  height: 40px;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
`

const Labels = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  user-select: none;
  ${animationStyle}
`


const Label = styled.p`
  font-size: ${props => props.theme.labelFontSize * (props.selected ? 1.2 : 1)}px;
  font-weight: ${props => props.selected ? 'bold' : undefined};
  width: ${props => props.width}px;
  margin: auto;
  padding-right: ${props => props.space}px;
  height: 100%;
  text-align: center;
  color: ${props => props.theme.textColor};
`

export default ({
  labels,
  barWidth,
  barSpace,
  width,
  offset,
  oldOffset,
  centerBarIndex,
  totalWidth
}) => {
  const left = width + oldOffset - totalWidth
  return (
    <Container>
      <Labels offset={offset - oldOffset} style={{ left, width: totalWidth }}>
        {labels.map((label, index) => (
          <Label
            selected={centerBarIndex === index}
            key={index}
            width={barWidth}
            space={barSpace}
          >
            {label}
          </Label>)
        )}
      </Labels>
    </Container>
  )
}