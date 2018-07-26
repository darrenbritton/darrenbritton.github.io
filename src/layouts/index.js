import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import { Helmet } from 'react-helmet'
import styled, { injectGlobal } from 'styled-components'
import { Flex, Box } from 'grid-styled'

import Footer from '../components/footer'

injectGlobal`
<<<<<<< Updated upstream
  @import "//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css";
=======
  @import "//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
>>>>>>> Stashed changes

  html {
    max-width: 100vw;
    overflow-x: hidden;
  }
`

const Body = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  width: 100vw;

  img {
    margin-bottom: 0;
  }
`

const Content = styled.div`
  flex: 1;
`

const PageBase = ({ location, children }) => {
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
      {location.pathname != '/404' &&
        <Footer />
      }
    </Body>
  )
}

PageBase.propTypes = {
  children: PropTypes.func,
}

export default PageBase
