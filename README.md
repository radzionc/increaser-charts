# increaser-charts

> Charts Library by Increaser

[![NPM](https://img.shields.io/npm/v/increaser-charts.svg)](https://www.npmjs.com/package/increaser-charts)

![alt text](https://cdn-images-1.medium.com/max/800/1*_Qn-0cLfmsmmpoaTBI3ctw.gif)


## [Demo](https://rodionchachura.github.io/increaser-charts/)

## Install

```bash
npm install --save increaser-charts
```

## Usage

```jsx
import React, { Component } from 'react'

import { BarChart } from 'increaser-charts'

const bars = [
  {
    label: 'first'
    items: [{
      value: 10,
      color: 'gold'
    }, {
      value: 5,
      color: 'black'
    }]
  },
  {
    label: 'second',
    items: [{
      value: 8,
      color: 'black'
    }]
  }
]

// optional
const theme = {
  mainColor: 'white',
  scrollerBackgroundColor: 'rgba(255, 255, 255, 0.15)',
  labelFontSize: 12
}

class Example extends Component {
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
      bars,
      showScroll: true,
      selectCenterBarOnScroll: true
    }
  }
  render () {
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
      <Wrapper>
        <BarChart
          theme={theme}
          bars={bars}
          barWidth={barWidth}
          barSpace={barSpace}
          centerBarIndex={centerBarIndex}
          onBarSelect={(centerBarIndex) => this.setState({ centerBarIndex })}
          selectCenterBarOnScroll={selectCenterBarOnScroll}
          showScroll={showScroll}
        />
      </Wrapper>
    )
  }
}
```

## [Story on Medium](https://medium.com/p/3b20b7907633)

## License

MIT © [RodionChachura](https://geekrodion.com)
