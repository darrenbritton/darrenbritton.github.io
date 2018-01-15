import React from 'react'
import styled, { css } from 'styled-components'
import Link from 'gatsby-link'
import { Flex, Box } from 'grid-styled'

const Base = styled.div`
  padding: 0;
  margin: 0;
  max-height: 55px;
  line-height: 53px;
  width: 100vw;
  & ul {
    width: 100%;
    height: 55px;
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: 13px;
  }
  & ul > li a,
  & ul > li {
    font-family: "Raleway", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 11px;
    margin-right: 32px;
    float: left;
    position: relative;
    color: #fff;
  }
  & ul > li a {
    line-height: 4em;
    font-weight: 600;
    letter-spacing: 1px;
  }

  ${props => props.dark && css`
    & li a,
    & li {
      color: #444;
    }
  `}
`

class NavBar extends React.Component {
  render() {
    const links = this.props.links.map(function(link){
      return <li key={link.name}><Link to={link.href}>{link.name}</Link></li>;
    })
    return (
      <Flex wrap >
        <Base {...this.props}>
          <Box px={2} width={[ 1/2, 1/4, 1/6 ]}>
            <h2>Darren Britton</h2>
          </Box>
          <Box  px={2} width={[ 1/2, 3/4, 5/6 ]}>
            {links}
          </Box>
        </Base>
      </Flex>
    );
  }
}

export default NavBar
