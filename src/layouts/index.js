import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'

import Breadcrumb from '../components/breadcrumb'
import Bar from '../components/bar'

const Header = styled.div`
  height: 240px;
  padding: 0;
  background: #292929;
  position: relative;
  overflow: hidden;

  & > div {
    padding-top: 120px;
    margin: auto;
    max-width: 600px;
  }
`

const Title = styled.h1`
  margin-top: 0;
  color: #fff;
`

const PortfolioItemTemplate = ({ children }) => (
  <div>
    <Helmet
      title="Darren Britton"
      meta={[
        { name: 'description', content: 'portfolio' },
        { name: 'keywords', content: 'darren, britton, portfolio' },
      ]}
    />
    <Header>
      <Flex wrap >
        <Box px={2} width={[ 1, 2/3, 1/3 ]}>
    			<Title>Digicah</Title>
    		</Box>
        <Box  px={2} width={[ 1, 2/3 ]}>
          <Breadcrumb crumbs={[{name: 'home', link: '/'}, {name: 'portfolio', link: '/#portfolio'}, {name: 'digicah', link: '/digicah'}]} />
        </Box>
        <Box  px={2} width={[ 1 ]}>
          <Bar />
        </Box>
        <Box  px={2} width={[ 1 ]}>
          <p>Digicah was developed as a C# .NET application using WPF for the client and a command line interface for the server. It has been released in alpha and can be downloaded from the dedicated Digicah website.</p>
        </Box>
    	</Flex>
    </Header>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
  </div>
)

PortfolioItemTemplate.propTypes = {
  children: PropTypes.func,
}

export default PortfolioItemTemplate
