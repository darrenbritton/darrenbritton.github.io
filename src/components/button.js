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
    color: #949494;
    border-color: #949494;
    &:hover {
      color: #fff;
      background-color: #949494;
    }
  `}

  ${props => props.light && css`
    color: #ddd;
    border-color: #ddd;
  `}

  ${props => props.opaque && css`
    background: none;
    &:hover {
      background-color: transparent;
      color: #fff;
      border-color: #fff;
    }
  `}

  ${props => props.small && css`
    height: 30px;
    font-size: 11px;
    line-height: 27px;
    min-width: 0;
  `}
`

export default Button
