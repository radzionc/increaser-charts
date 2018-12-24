import React from 'react'
import styled from 'styled-components'

import { animationStyle } from '../styles'

const Container = styled.div`
  position: relative;
  height: 20px;
  width: 100%;
  display: flex;
  align-items: center;
`

const Line = styled.div`
  position: absolute;
  width: 100%;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.15);
`

const Position = styled.div`
  cursor: pointer;
  position: absolute;
  height: 6px;
  background-color: ${props => props.theme.textColor};
  border-radius: 3px;
  &:hover {
    height: 8px;
    border-radius: 4px;
  }
  ${animationStyle}
`

class Scroller extends React.Component {
  render() {
    const { totalWidth, offset, oldOffset, width } = this.props

    const periodWidth = (width * 100) / totalWidth
    const getMargin = offset => ((totalWidth  - (offset + width)) / totalWidth) * 100
    const periodMargin = getMargin(oldOffset)
    const animationOffset = getMargin(offset) - periodMargin
    const positionStyle = { width: `${periodWidth}%`, marginLeft: `${periodMargin}%` }
    return (
      <Container>
        <Line/>
        <Position
          offset={(animationOffset * width) / 100}
          style={positionStyle}
          onDragStart={e => { e.preventDefault() }}
          onMouseDown={this.onMouseDown}
          onTouchStart={this.onMouseDown}
        />
      </Container>
    )
  }

  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('touchend', this.onMouseDown)

    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('touchmove', this.onMouseMove)
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('touchend', this.onMouseDown)

    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('touchmove', this.onMouseMove)
  }

  onMouseDown = () => {
    this.props.onDragStart()
  }

  onMouseMove = e => {
    const { scrolling, onDrag } = this.props
    if (scrolling && (e.movementX || e.changedTouches)) {
      const { movementX } = e.movementX ? e : e.changedTouches[0]
      onDrag(movementX)
    }
  }

  onMouseUp = () => {
    const { scrolling, onDragEnd } = this.props
    if (scrolling) {
      onDragEnd()
    }
  }
}

export default Scroller