import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import { defaultTheme } from '../../constants/theme'
import Bars from './bars'
import Scroller from './scroller'

const RootContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const BarsContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LabelsContainer = styled.div`
  height: 40px;
`

export default class BarChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oldOffset: 0,
      offset: 0
    }
  }

  render() {
    const {
      theme,
      bars,
      barWidth,
      barSpace,
      onBarSelect,
      centerBarIndex
    } = this.props
    const { width, height, offset, oldOffset } = this.state

    const barsProps = { width, height, bars, barWidth, barSpace, onBarSelect, centerBarIndex, offset, oldOffset }
    const scrollerProps = { offset, oldOffset, barWidth, barSpace, barsNumber: bars.length, width }
    return (
      <ThemeProvider theme={{ ...defaultTheme, ...theme}}>
        <RootContainer>
          <BarsContainer ref={el => this.barsContainer = el}>
            {width && height && <Bars {...barsProps} />}
          </BarsContainer>
          <LabelsContainer/>
          {width && <Scroller {...scrollerProps}/>}
        </RootContainer>
      </ThemeProvider>
    )
  }

  componentDidMount() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  onResize = () => {
    const { width, height } = this.barsContainer.getBoundingClientRect()
    this.setState({ width, height })
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    const { width, offset } = prevState
    const { centerBarIndex, barWidth, barSpace, bars } = nextProps
    if (centerBarIndex) {
      const realPosition = width - (barWidth + barSpace) * (centerBarIndex + 1)
      const desiredPosition = (width - barWidth + barSpace) / 2
      const offsetToCenter = desiredPosition - realPosition
      const totalBarsWidth = bars.length * (barWidth + barSpace)
      const getOffset = () => {
        if (offsetToCenter < 0) return 0
        if (offsetToCenter + width > totalBarsWidth) return totalBarsWidth - width
        return offsetToCenter
      }
      return {
        ...prevState,
        offset: getOffset(),
        oldOffset: offset
      }
    }

    return null
  }
}
