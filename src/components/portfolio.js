import React from 'react'
import styled, { css } from 'styled-components'
import {Flex, Box} from 'grid-styled'

import { media } from '../utils/style'
import HeroImage from '../components/heroImage'

const Tile = styled.div`
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  position: relative;
  margin-bottom: 32px;
  border-radius: 30px;
  overflow: hidden;
  & > a > div, & > a > div::after {
    z-index: -1;
    transition: all .5s ease-in-out;
  }
  &:hover > a > div {
    transform: scale(1.1);
  }
  &:hover > a > div::after {
    opacity: 0.5;
  }
`

const TileContent = styled.a`
  color: #fff;
  text-decoration: none !important;
  cursor: pointer;
  position: absolute;
  bottom: 1vw;
  left: 5%;
  max-width: 70%;
  h1 {
    margin-bottom: 5px;
  }

  ${ media.md`
    max-width: 90%;
  ` }
  ${ media.ws`
    p {
      display: none;
    }
  ` }
`

const Item = ({excerpt, image = null, tags, slug, title, timeToRead}) => (
  <Tile>
    <a href={slug}>
      <HeroImage
        overlay
        img={image ? image.childImageSharp.responsiveSizes.src : '//lorempixel.com/720/720/cats/'}
      />
    </a>
    <TileContent href={slug}>
      <h1>{title}</h1>
      <p>{excerpt}</p>
    </TileContent>
  </Tile>
)

class Portfolio extends React.Component {
  render() {
    const items = this.props.items.map(item =>
      (
        <Box key={item.node.fields.slug} px={2} width={[ 1 , 1 / 2, 1 / 3, 1 / 4 ]}>
          <Item
            key={item.node.fields.slug}
            excerpt={item.node.excerpt}
            slug={item.node.fields.slug}
            timeToRead={item.node.timeToRead}
            {...item.node.frontmatter}
          />
        </Box>
      )
    )
    return (
      <Flex px={1} wrap>
        {items}
      </Flex>
    )
  }
}

export default Portfolio
