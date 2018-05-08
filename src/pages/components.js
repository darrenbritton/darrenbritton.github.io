import React from 'react'
import Link from 'gatsby-link'
import {Flex, Box} from 'grid-styled'

import Button from '../components/button'
import Bar from '../components/bar'
import Breadcrumb from '../components/breadcrumb'
import Carousel from '../components/carousel'
import NavBar from '../components/navbar'

class ComponentsDemo extends React.Component {
  render() {
    const content = (
      <div>
        <h1 id='buttons'>Buttons</h1>
        <Button>Default</Button>
        <Button dark>Dark</Button>
        <Button opaque>Opaque</Button>
        <Button small>small</Button>
        <h1 id='bar'>Bar</h1>
        <Bar />
        <h1 id='breadcrumb'>Breadcrumb</h1>
        <Breadcrumb dark crumbs={[{name: 'a', link: '/components#a'}, {name: 'b', link: '/components#b'}, {name: 'c', link: '/components#c'}, {name: 'd', link: '/components#d'}, {name: 'e', link: '/components#e'}, {name: 'f', link: '/components#f'}]} />
        <h1 id='carousel'>Carousel</h1>
        <Carousel images={['/cdn/images/digicahA.PNG', '/cdn/images/digicahB.PNG', '/cdn/images/digicahC.PNG']} />
      </div>
    )
    return (
      <div>
        <NavBar dark children={content.props.children} />
        <Flex alignItems='center' justifyContent='center'>
          <Box width={[9/10 , 2 / 3, 3 / 4]}>
            {content}
          </Box>
        </Flex>
      </div>
    );
  }
}

export default ComponentsDemo
