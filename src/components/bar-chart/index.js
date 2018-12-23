import React from 'react'
import styled, { ThemeProvider, keyframes } from 'styled-components'

import { defaultTheme } from '../../constants/theme'
import Bars from './bars'

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

const ScrollContainer = styled.div`
  height: 20px;
`

export default class BarChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
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
    const { width, height } = this.state

    const barsProps = { width, height, bars, barWidth, barSpace, onBarSelect, centerBarIndex }

    return (
      <ThemeProvider theme={{ ...defaultTheme, ...theme}}>
        <RootContainer>
          <BarsContainer ref={el => this.barsContainer = el}>
            {width && height && <Bars {...barsProps} />}
          </BarsContainer>
          <LabelsContainer/>
          <ScrollContainer/>
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
}
