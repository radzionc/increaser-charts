import React from 'react'
import styled from 'styled-components'

import Bar from './bar'

const BarsView = styled.svg`
  width: 100%;
  height: 100%;
`

export default class Bars extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oldOffset: 0,
      offset: 0
    }
  }

  render() {
    const {
      width,
      height,
      bars,
      barWidth,
      barSpace,
      onBarSelect,
      centerBarIndex
    } = this.props
    const { offset, oldOffset } = this.state

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

  componentDidUpdate(prevProps) {
    const { centerBarIndex, barWidth, barSpace, width } = this.props
    if (prevProps.centerBarIndex !== centerBarIndex && centerBarIndex !== undefined) {
      const realPosition = width - (barWidth + barSpace) * (centerBarIndex + 1)
      const desiredPosition = (width - barWidth + barSpace) / 2
      const offset = desiredPosition - realPosition
      this.setState({ offset, oldOffset: this.state.offset })
    }
  }
}