import React from 'react'
import styled, { ThemeProvider, keyframes } from 'styled-components'

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

const barAnimation = keyframes`
  to {
    transform: ${props => `translateX(${props.offset}px)`}
  }
`

const BarContainer = styled.g`
  animation: ${barAnimation} 2s ease;
  /* transition: all 1s ease-in-out; */
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
    const Bars = () => {
      const highest = bars.reduce((acc, bar) => {
        const height = bar.reduce((acc, { value }) => acc + value, 0)
        return height > acc ? height : acc
      }, 0)
      const valueToHeight = value => (value * height) / highest
      const getOffset = () => {
        if (centerBarIndex === undefined) return 0

        const realPosition = width - (barWidth + barSpace) * (centerBarIndex + 1)
        const desiredPosition = (width - barWidth + barSpace) / 2
        return realPosition - desiredPosition
      }
      const offset = getOffset()
      const Bar = ({ bar, index }) => {
        const x = width - (barWidth + barSpace) * (index + 1) - offset
        
        const Subbar = ({ valueBefore, value, color }) => {
          const rectHeight = valueToHeight(value)
          const y = height - valueToHeight(valueBefore) - rectHeight

          return (
            <rect x={x} y={y} width={barWidth} height={rectHeight} fill={color}/>
          )
        }

        const Selectable = () => (
          <rect
            onClick={() => onBarSelect(index)}
            cursor={'pointer'}
            x={x - barSpace / 2}
            width={barWidth + barSpace}
            y={0}
            height={height}
            fill={'transparent'}
          />
        )

        return (
          <BarContainer key={index}>
            {bar.map(({ value, color }, index) => {
              const valueBefore = bar.slice(0, index).reduce((acc, { value }) => acc + value, 0)
              const props = { value, color, valueBefore, key: index }
              
              return <Subbar {...props} />
            })}
            {onBarSelect && <Selectable/>}
          </BarContainer>
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

  componentDidUpdate(prevProps) {
    if (prevProps.centerBarIndex !== this.props.centerBarIndex) {
      this.setState({ })
      console.log(this.props, prevProps)
    }
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
