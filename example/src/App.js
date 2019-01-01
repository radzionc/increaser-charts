import React from 'react'
import styled from 'styled-components'

import { BarChart } from 'increaser-charts'

const Page = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default () => (
  <Page>
    <BarChart/>
  </Page>
)