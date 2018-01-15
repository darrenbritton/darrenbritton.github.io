import React from 'react'
import styled, {css} from 'styled-components'
import Link from 'gatsby-link'
import {Flex, Box} from 'grid-styled'
import scrollToElement from 'scroll-to-element'

import Name from './name'
import Button from './button'
import SocialIcons from './socialIcons'

const Base = styled.div `
  height: 140px;
  padding: 0;
  background: #292929;
`

class Footer extends React.Component {
  render() {
    return (<Base {...this.props}>
      <Flex justify='center'>
        <Box width={[1 / 2, 1 / 3, 1 / 6]}>
          <Name big="big"/>
        </Box>
        <Box width={[1 / 2, 1 / 3, 1 / 6]}>
          <Flex justify='center'>
            <SocialIcons icons={[
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
