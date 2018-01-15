import styled, { css } from 'styled-components'

const Button = styled.button`
  border: 2px solid #47b475;
  background-color: #fff;
  padding: 0 26px;
  height: 40px;
  min-width: 150px;
  line-height: 36px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 0;
  color: #47b475;
  text-align: center;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  margin-right: 8px;
  margin-bottom: 24px;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #47b475;
  }

  ${props => props.dark && css`
    color: #444;
    border-color: #444;
    &:hover {
      color: #fff;
      background-color: #444;
    }
  `}

  ${props => props.opaque && css`
    background: none;
    &:hover {
      background-color: transparent;
      color: #fff;
      border-color: #fff;
    }
  `}
`

export default Button
