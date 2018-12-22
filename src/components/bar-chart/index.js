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

const BarsView = styled.svg`
  width: 100%;
  height: 100%;
`

export default class BarChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    const { theme, bars, barWidth, barSpace } = this.props
    
    const { width, height } = this.state
    const Bars = () => {
      const highest = bars.reduce((acc, bar) => {
        const height = bar.reduce((acc, { value }) => acc + value, 0)
        return height > acc ? height : acc
      }, 0)
      const valueToHeight = value => (value * height) / highest

      const Bar = ({ bar, index }) => {
        const x = width - (barWidth + barSpace) * (index + 1)
        
        const Subbar = ({ valueBefore, value, color }) => {
          const rectHeight = valueToHeight(value)
          const y = height - valueToHeight(valueBefore) - rectHeight

          return (
            <rect x={x} y={y} width={barWidth} height={rectHeight} fill={color}/>
          )
        }

        return (
          <g>
            {bar.map(({ value, color }, index) => {
              const valueBefore = bar.slice(0, index).reduce((acc, { value }) => acc + value, 0)
              const props = { value, color, valueBefore, key: index }

              return <Subbar {...props} />
            })}
          </g>
        )
      }

      return (
        <BarsView>
          {bars.map((bar, index) => <Bar bar={bar} index={index} key={index} />)}
        </BarsView>
      )
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
