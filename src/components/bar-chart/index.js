import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { DEFAULT_THEME } from '../../constants';

import DataContainer from './data-container'
import Scroller from './scroller'
import Bar from './bar'
import { sum } from '../../utils'

const RootContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const BarsView = styled.svg`
  height: 100%;
  width: 100%;
`

const LabelsContainer = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  display: flex;
  user-select: none;
`

export default class BarChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 0,
      width: 0,
      offset: 0,
      oldOffset: 0,
      scrolling: false
    }
  }
  render() {
    const { theme, showScroller, barWidth, barSpace, bars, centerBarIndex, onBarSelect } = this.props
    const { width, offset, oldOffset, height } = this.state

    const barTotalWidth = barWidth + barSpace
    const totalWidth = bars.length * barTotalWidth

    const getStartIndex = () => {
      const startIndex = Math.floor((totalWidth - width - oldOffset - (offset > oldOffset ? offset - oldOffset : 0)) / barTotalWidth)
      if (startIndex < 0) return 0

      return startIndex
    }
    
    const startIndex = getStartIndex()
    const Content = () => {
      if (!width) return null
      const dataConainerProps = { barTotalWidth, width, offset, oldOffset, totalWidth, startIndex }

      const Labels = () => {
        return (
          <LabelsContainer>

          </LabelsContainer>
        )
      }
      const lastIndex = Math.ceil((totalWidth + oldOffset + (offset < oldOffset ? oldOffset - offset : 0)) / barTotalWidth)
      const slicedBars = bars.slice(startIndex, lastIndex)
      const highest = bars.map(b => b.items).reduce((acc, bar) => {
        const height = sum(bar)
        return height > acc ? height : acc
      }, 0)
      
      const Bars = () => {
        if (!height) return null
        const barCommonProps = { startIndex, height, barWidth, barSpace, centerBarIndex, onBarSelect, highest}
        return slicedBars.map(({ items }, index) =>(
          <Bar
            {...barCommonProps}
            bar={items}
            index={index}
            key={index}
          />
        ))
      }

      return (
        <React.Fragment>
          <DataContainer {...dataConainerProps}>
            <BarsView ref={el => this.barsContainer = el}>
              <Bars/>
            </BarsView>
            <Labels/>
          </DataContainer>
          {showScroller && <Scroller/>}
        </React.Fragment>
      )
    }

    return (
      <ThemeProvider theme={{ ...DEFAULT_THEME, ...theme }}>
        <RootContainer ref={el => this.rootContainer = el }>
          <Content/>
        </RootContainer>
      </ThemeProvider>
    )
  }

  componentDidUpdate() {
    const { height } = this.barsContainer.getBoundingClientRect()
    if (this.state.height !== height) {
      this.setState({ height })
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize)
    const { width } = this.rootContainer.getBoundingClientRect()
    this.setState({ width })
  }

  onResize = () => {
    const { width } = this.rootContainer.getBoundingClientRect()
    const { height } = this.barsContainer.getBoundingClientRect()
    this.setState({ width, height })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { width, offset, scrolling } = prevState
    if (!width) return null

    const { centerBarIndex, barWidth, barSpace, bars } = nextProps
    const bar = barWidth + barSpace
    const totalWidth = bars.length * bar + barSpace
    const getNewOffsets = () => {
      if (centerBarIndex !== undefined && !scrolling) {
        if (totalWidth < width) {
          return {
            oldOffset: 0,
            offset: 0
          }
        }
        const offsetToCenter = totalWidth - bar * centerBarIndex - (width + bar) / 2
        const getOffset = () => {
          if (offsetToCenter < 0) return 0
          if (offsetToCenter + width > totalWidth) return totalWidth - width
          return offsetToCenter
        }

        return {
          offset: getOffset(),
          oldOffset: offset
        }
      }
    }
    return {
      ...prevState,
      ...getNewOffsets(),
      totalWidth
    }
  }
}