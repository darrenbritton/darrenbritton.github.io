import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'

import Breadcrumb from '../components/breadcrumb'
import Bar from '../components/bar'

const Body = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

const Content = styled.div`
  flex: 1;
`

const Footer = styled.div`
  height: 240px;
  padding: 0;
  background: #292929;
`

const PageBase = ({ children }) => {
  return (
    <Body>
      <Helmet
        title="Darren Britton"
        meta={[
          { name: 'description', content: 'portfolio' },
          { name: 'keywords', content: 'darren, britton, portfolio' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ]}
      />
      <Content>
        { children() }
      </Content>
      <Footer>
      </Footer>
    </Body>
  )
}

PageBase.propTypes = {
  children: PropTypes.func,
}

export default PageBase
