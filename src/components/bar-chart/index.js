import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import { defaultTheme } from '../../constants/theme'

const BarChart = styled.h1`
  color: ${props => props.theme.textColor};
`

export default ({ theme }) => {
  return (
    <ThemeProvider theme={{ ...defaultTheme, ...theme}}>
      <BarChart>Bar charts will be there</BarChart>
    </ThemeProvider>
  )
}