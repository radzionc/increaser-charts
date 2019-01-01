import React from 'react'
import styled from 'styled-components'
import { animationStyle } from './styles';

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
  background-color: ${props => props.theme.scrollerBackgroundColor};
`

const Position = styled.div`
  cursor: pointer;
  position: absolute;
  height: 6px;
  background-color: ${props => props.theme.mainColor};
  border-radius: 3px;
  &:hover {
    height: 8px;
    border-radius: 4px;
  }
  ${animationStyle}
`

export default class Scroller extends React.Component {
  render() {
    const { totalWidth, offset, oldOffset, width } = this.props
    const getMargin = offset => ((totalWidth - (offset + width)) /totalWidth) * 100
    const periodMargin = getMargin(oldOffset)
    if (periodMargin < 0) return null

    const periodWidth = (width * 100) / totalWidth
    const animationOffset = getMargin(offset) - periodMargin
    const positionStyle = { width: `${periodWidth}%`, marginLeft: `${periodMargin}%` }

    return (
      <Container>
        <Line/>
        <Position
          offset={(animationOffset * width) / 100}
          style={positionStyle}
          onTouchStart={e => e.preventDefault()}
          onDragStart={e => e.preventDefault()}
          onMouseDown={this.onMouseDown}
        />
      </Container>
    )
  }

  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('mousemove', this.onMouseMove)
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('mousemove', this.onMouseMove)
  }

  onMouseDown = () => {
    this.props.onDragStart()
  }

  onMouseMove = (e) => {
    const { scrolling, onDrag } = this.props
    if (scrolling && e.movementX) {
      onDrag(e.movementX)
    }
  }

  onMouseUp = () => {
    const { scrolling, onDragEnd } = this.props
    if (scrolling) {
      onDragEnd()
    }
  }
}
