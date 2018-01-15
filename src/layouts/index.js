import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled, { injectGlobal } from 'styled-components'
import { Flex, Box } from 'grid-styled'

import Breadcrumb from '../components/breadcrumb'
import Bar from '../components/bar'
import Footer from '../components/footer'

injectGlobal`
  @import "//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";

  @font-face {
    font-family: 'Pacifico';
    font-style: normal;
    font-weight: 400;
    src: local('Pacifico Regular'), local('Pacifico-Regular'), url(https://fonts.gstatic.com/s/pacifico/v12/Q_Z9mv4hySLTMoMjnk_rCfesZW2xOQ-xsNqO47m55DA.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2212, U+2215;
  }
`

const Body = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

const Content = styled.div`
  flex: 1;
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
