import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { DEFAULT_THEME } from '../../constants';

import DataContainer from './data-container'
import Scroller from './scroller'

const RootContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const BarsView = styled.div`
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
      oldOffset: 0
    }
  }
  render() {
    const { theme, showScroller, barWidth, barSpace, bars } = this.props
    const { width, offset, oldOffset, height } = this.state

    const barTotalWidth = barWidth + barSpace
    const totalWidth = bars.length * barTotalWidth

    const getStartIndex = () => {
      const startIndex = Math.floor((totalWidth - width - oldOffset - (offset > oldOffset ? offset - oldOffset : 0)) / barTotalWidth)
      if (startIndex < 0) return 0

      return startIndex
    }
    
    const startIndex = getStartIndex()
    console.log(width, height)
    const Content = () => {
      if (!width) return null
      const dataConainerProps = { barTotalWidth, width, offset, oldOffset, totalWidth, startIndex }

      const Labels = () => {
        return (
          <LabelsContainer>

          </LabelsContainer>
        )
      }

      return (
        <React.Fragment>
          <DataContainer {...dataConainerProps}>
            <BarsView ref={el => this.barsContainer = el}>
              
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
}