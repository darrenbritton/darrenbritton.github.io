import React from 'react'
import styled, { css } from 'styled-components'
import Link from 'gatsby-link'

const Base = styled.ol`
  padding-top: 10px;
  list-style: none;
  margin: 0;
  & li a,
  & li {
    font-family: "Raleway", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 12px;
    line-height: 24px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 700;
    font-size: 11px;
    font-weight: 600;
    text-decoration: none;
    display: inline-block;
    color: #fff;
  }
  & > li + li:before {
    padding: 0 8px;
    color: #ccc;
    content: "/\00a0";
  }
  & > li:last-child > a {
    color: #777;
    pointer-events: none;
    cursor: default;
  }
  @media (min-width: 831px) {
    float: right;
  }
  ${props => props.dark && css`
    & li a,
    & li {
      color: #444;
    }
  `}
`

class Breadcrumb extends React.Component {
  render() {
    const crumbs = this.props.crumbs.map(function(crumb){
      return <li key={crumb.name}><Link to={crumb.link}>{crumb.name}</Link></li>;
    })
    return (
      <Base {...this.props}>
        {crumbs}
      </Base>
    );
  }
}

export default Breadcrumb
