import React from 'react'
import styled from 'styled-components'

import { BarChart } from 'increaser-charts'
import { getMockBars } from './mock';
import Switch from '@material-ui/core/Switch'

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
  height: 120px;
  width: 80%;
  padding: 20px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  border-radius: 5px;

`

const TimeWaitsForNoOne = styled.a`
  margin: 40px;
  color: white;
  font-family: 'Dancing Script', cursive;
  font-size: 24px;
  cursor: pointer;
  text-decoration: none;
`

const BoolParam = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 250px;
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
      barSpace: 5,
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
      barsWithLabels
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
          />
        </Wrapper>
        <TimeWaitsForNoOne
          target="_blank"
          href="https://medium.com/@geekrodion/increaser-mindset-dc828a2bcd4d"
        >
          Time Waits For No One, and It Won't Wait For Me
        </TimeWaitsForNoOne>
        <Panel>
          <BoolParam>
            <Param>selectCenterBarOnScroll: </Param>
            <Switch
              checked={selectCenterBarOnScroll}
              onChange={() => this.setState({ selectCenterBarOnScroll: !selectCenterBarOnScroll })}
              value="checkedB"
            />
          </BoolParam>
          <BoolParam>
            <Param>bars with labels: </Param>
            <Switch
              checked={barsWithLabels}
              onChange={this.toggleBarsWithLabels}
              value="checkedB"
            />
          </BoolParam>
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
}

export default App