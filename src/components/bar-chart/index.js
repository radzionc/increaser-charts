import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import { defaultTheme } from '../../constants/theme'

const RootContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const BarsContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: #FFD399;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LabelsContainer = styled.div`
  height: 40px;
  background-color: #EF6C00;
`

const ScrollContainer = styled.div`
  height: 20px;
  background-color: #FC427B;
`

const BarsText = styled.h1`
  color: ${props => props.theme.textColor};
`

export default class BarChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    const { theme } = this.props

    const { width, height } = this.state
    const Bars = () => {
      return <BarsText>{Math.round(width)} x {Math.round(height)}</BarsText>
    }

    return (
      <ThemeProvider theme={{ ...defaultTheme, ...theme}}>
        <RootContainer>
          <BarsContainer ref={el => this.barsContainer = el}>
            {width && height && <Bars/>}
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
