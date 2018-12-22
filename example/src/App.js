import React from 'react'
import styled from 'styled-components'

import { BarChart } from 'increaser-charts'

const Page = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #2c3e50;
`

export default () => {
  return (
    <Page>
      <BarChart />
    </Page>
  )
}