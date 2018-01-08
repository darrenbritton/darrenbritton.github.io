import React from 'react'
import Link from 'gatsby-link'

import Button from '../components/button'
import Bar from '../components/bar'
import Breadcrumb from '../components/breadcrumb'
import Carousel from '../components/carousel'

const ComponentsDemo = () => (
  <div>
    <h1>Buttons</h1>
    <Button>Default</Button>
    <Button dark>Dark</Button>
    <Button opaque>Opaque</Button>
    <h1>Bar</h1>
    <Bar />
    <h1>Breadcrumb</h1>
    <Breadcrumb dark crumbs={[{name: 'a', link: '/components#a'}, {name: 'b', link: '/components#b'}, {name: 'c', link: '/components#c'}, {name: 'd', link: '/components#d'}, {name: 'e', link: '/components#e'}, {name: 'f', link: '/components#f'}]} />
    <h1>Carousel</h1>
    <Carousel images={['https://darrenbritton.com/img/digicahA.PNG', 'https://darrenbritton.com/img/digicahB.PNG', 'https://darrenbritton.com/img/digicahC.PNG']} />
  </div>
)

export default ComponentsDemo
