import React from 'react'
import Link from 'gatsby-link'

import Button from '../components/button'
import Bar from '../components/bar'
import Breadcrumb from '../components/breadcrumb'
import Carousel from '../components/carousel'
import HeroImage from '../components/heroImage'
import NavBar from '../components/NavBar'

const ComponentsDemo = ({ data }) => {

console.log(data);
   return (
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
    <Carousel resolutions={data.digicahImages.resolutions} images={['https://darrenbritton.com/img/digicahA.PNG', 'https://darrenbritton.com/img/digicahB.PNG', 'https://darrenbritton.com/img/digicahC.PNG']} />
    <h1>Hero Image</h1>
    <HeroImage img='https://i.ytimg.com/vi/tFhEh41aX2k/maxresdefault.jpg' overlay />
    <h1>Hero Image (Empty)</h1>
    <HeroImage />
    <h1>Nav Bar</h1>
    <NavBar links={[{name: 'a', href: '#a'}, {name: 'b', href: '#b'}, {name: 'c', href: '#c'}]} />
  </div>)
}

export const query = graphql`
  query GetImages {
    digicahImages: allImageSharp(id: { regex: "/digicah[a-zA-Z].png/" }) {
      resolutions(width: 925) {
        ...GatsbyImageSharpResolutions
      }
    }
  }
`

export default ComponentsDemo
