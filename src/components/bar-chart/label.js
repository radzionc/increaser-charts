import styled from 'styled-components'

export default styled.p`
  font-size: ${props => props.theme.labelFontSize * (props.selected ? 1.2 : 1)}px;
  font-weight: ${props => props.selected ? 'bold' : undefined};
  width: ${props => props.width}px;
  margin-left: ${props => props.space}px;
  text-align: center;
  color: ${props => props.theme.mainColor};
`