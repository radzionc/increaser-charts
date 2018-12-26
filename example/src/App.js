import React from 'react'
import styled from 'styled-components'

import { BarChart } from 'increaser-charts'
import { getMockBars } from './mock'
import Switch from '@material-ui/core/Switch'
import Slider from '@material-ui/lab/Slider'

const Page = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Wrapper = styled.div`
  height: 60vh;
  width: 80%;
  padding: 20px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 640px) {
    width: 100%;
    box-shadow: none;
  }
`

const Panel = styled.div`
  width: 80%;
  padding: 20px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`

const PanelRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`

const TimeWaitsForNoOne = styled.a`
  margin: 40px;
  color: white;
  font-family: 'Dancing Script', cursive;
  font-size: 24px;
  cursor: pointer;
  text-decoration: none;
`

const ParamContainer = styled.div`
  padding: 10px;
  margin: 10px;
  display: flex;
  border-radius: 5px;
  border: 1px solid gold;
  height: 80px;
  width: 280px;
`

const BoolParam = styled(ParamContainer)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between; 
`

const RangeParam = styled(ParamContainer)`
  flex-direction: column;
  justify-content: space-around;
`

const Param = styled.h4`
  color: white;
`

class App extends React.Component {
  constructor(props) {
    super(props)
    const barsNumber = 60
    const barsWithLabels = true
    this.state = {
      centerBarIndex: undefined,
      barWidth: 35,
      barSpace: 8,
      barsNumber,
      barsWithLabels,
      bars: getMockBars(60, barsWithLabels),
      showScroll: true,
      selectCenterBarOnScroll: true
    }
  }

  render() {
    const {
      centerBarIndex,
      barWidth,
      barSpace,
      bars,
      selectCenterBarOnScroll,
      barsWithLabels,
      showScroll
    } = this.state
    return (
      <Page>
        <Wrapper>
          <BarChart
            bars={bars}
            barWidth={barWidth}
            barSpace={barSpace}
            centerBarIndex={centerBarIndex}
            onBarSelect={(centerBarIndex) => this.setState({ centerBarIndex })}
            selectCenterBarOnScroll={selectCenterBarOnScroll}
            showScroll={showScroll}
          />
        </Wrapper>
        <TimeWaitsForNoOne
          target="_blank"
          href="https://medium.com/@geekrodion/increaser-mindset-dc828a2bcd4d"
        >
          Time Waits For No One, and It Won't Wait For Me
        </TimeWaitsForNoOne>
        <Panel>
          <PanelRow>
            <BoolParam>
              <Param>select center bar on scroll: </Param>
              <Switch
                checked={selectCenterBarOnScroll}
                onChange={() => this.setState({ selectCenterBarOnScroll: !selectCenterBarOnScroll })}
              />
            </BoolParam>
            <BoolParam>
              <Param>bars with labels: </Param>
              <Switch
                checked={barsWithLabels}
                onChange={this.toggleBarsWithLabels}
              />
            </BoolParam>
            <BoolParam>
              <Param>show scroll: </Param>
              <Switch
                checked={showScroll}
                onChange={() => this.setState({ showScroll: !showScroll })}
              />
            </BoolParam>
          </PanelRow>
          <PanelRow>
            <RangeParam>
              <Param>bar width: {barWidth}</Param>
              <Slider
                value={barWidth}
                min={5}
                max={300}
                step={1}
                onChange={(_, barWidth) => this.setState({ barWidth })}
              />
            </RangeParam>
            <RangeParam>
              <Param>bar space: {barSpace}</Param>
              <Slider
                value={barSpace}
                min={5}
                max={300}
                step={1}
                onChange={(_, barSpace) => this.setState({ barSpace })}
              />
            </RangeParam>
            <RangeParam>
              <Param>bars number: {bars.length}</Param>
              <Slider
                value={bars.length}
                min={5}
                max={100}
                step={1}
                onChange={(_, barsNumber) => this.changeBarsNumber(barsNumber)}
              />
            </RangeParam>
          </PanelRow>
        </Panel>
      </Page>
    )
  }

  toggleBarsWithLabels = () => {
    const { barsNumber, barsWithLabels } = this.state
    const newBarsWithLabels = !barsWithLabels
    this.setState({
      barsWithLabels: newBarsWithLabels,
      bars: getMockBars(barsNumber, newBarsWithLabels)
    })
  }

  changeBarsNumber = (barsNumber) => {
    const { barsWithLabels } = this.state
    const bars = getMockBars(barsNumber, barsWithLabels)
    this.setState({ bars })
  }
}

export default App