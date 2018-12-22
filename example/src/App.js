import React from 'react'
import styled from 'styled-components'

import { BarChart } from 'increaser-charts'

const Page = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Wrapper = styled.div`
  position: relative;
  height: 60%;
  width: 80%;
  padding: 20px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TimeWaitsForNoOne = styled.a`
  margin: 40px;
  color: white;
  font-family: 'Dancing Script', cursive;
  font-size: 24px;
  cursor: pointer;
  text-decoration: none;
`

export default () => {
  return (
    <Page>
      <Wrapper>
        <BarChart />
      </Wrapper>
      <TimeWaitsForNoOne
        target="_blank"
        href="https://medium.com/@geekrodion/increaser-mindset-dc828a2bcd4d"
      >
        Time Waits For No One, and It Won't Wait For Me
      </TimeWaitsForNoOne>
    </Page>
  )
}