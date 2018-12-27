import React from 'react'
import styled from 'styled-components'
import { animationStyle } from '../styles'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`

const DataContainer = styled.div`
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  ${animationStyle}
`

export default ({ barTotalWidth, width, offset, oldOffset, totalWidth, startIndex, children }) => {
  const left = totalWidth < width ? (width - totalWidth) / 2 : width + oldOffset - totalWidth + startIndex * barTotalWidth
  const containerWidth = totalWidth - startIndex * barTotalWidth
  const animationOffset = offset - oldOffset
  console.log(width, totalWidth)
  const style = { left, width: containerWidth }

  return (
    <Wrapper>
      <DataContainer offset={animationOffset} style={style}>
        {children}
      </DataContainer>
    </Wrapper>
  )
}