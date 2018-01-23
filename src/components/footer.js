import React from 'react'
import styled, {css} from 'styled-components'
import Link from 'gatsby-link'
import {Flex, Box} from 'grid-styled'
import scrollToElement from 'scroll-to-element'

import Name from './name'
import Button from './button'
import SocialIcons from './socialIcons'

const Base = styled.div `
  height: fit-contents;
  padding: 0;
  background: #292929;
`

const FooterText = styled.div`
  padding-top: 6px;
  color: #fff;
  text-align: center;
  a {
    color: #9880dc;
  }
`

const SocialIconsStyled = styled(SocialIcons)`
  margin-left: -8px;
`

class Footer extends React.Component {
  render() {
    return (<Base {...this.props}>
      <Flex wrap justify='space-around'>
        <Box px={2} width={[1, 1 / 2, 1 / 3, 1 / 6]}>
          <Name block/>
        </Box>
        <Box width={[1, 1 / 2, 1 / 3, 1 / 6]}>
          <FooterText>
            <h4>Made with ❤️ using <a href='https://www.gatsbyjs.org/'>GatsbyJS</a></h4>
          </FooterText>
        </Box>
        <Box width={[1, 1 / 2, 1 / 3, 1 / 6]}>
          <Flex justify='center'>
            <SocialIconsStyled icons={[
                {
                  name: 'twitter',
                  href: 'https://twitter.com/darren_britton'
                }, {
                  name: 'github-alt',
                  href: 'https://github.com/darrenbritton'
                }, {
                  name: 'linkedin',
                  href: 'https://ie.linkedin.com/in/darrenbritton'
                }
              ]}/>
          </Flex>
        </Box>
      </Flex>
      <Flex justify='space-around'>
        <Box>
          <Button onClick={() => {scrollToElement('html')}} small="small" dark="dark" opaque="opaque">Top</Button>
        </Box>
      </Flex>
    </Base>);
  }
}

export default Footer
