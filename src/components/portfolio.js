import React from 'react'
import styled, { css } from 'styled-components'
import {Flex, Box} from 'grid-styled'
import Img from "gatsby-image";

import { media } from '../utils/style'
import HeroImage from '../components/heroImage'
import Button from '../components/button'

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
    font-family: 'Raleway';
    margin-bottom: 5px;
  }
  p {
    font-family: 'Lato';
    font-weight: 500;
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

const Item = ({excerpt, image, tags, slug, title, timeToRead}) => (
  <Tile>
    <a href={slug}>
      {image ? (<Img sizes={image.childImageSharp.sizes} />) : (<HeroImage overlay img='//lorempixel.com/720/720/cats/' />)}
    </a>
    <TileContent href={slug}>
      <h1>{title}</h1>
      <p>{excerpt}</p>
    </TileContent>
  </Tile>
)

class Portfolio extends React.Component {
  constructor(props) {
    super(props);

    this.state = { items: [], viewAll: false};
  }

  componentWillRecievedProps(newProps, oldProps) {
    if(newProps.items && JSON.stringify(newProps.items) != JSON.stringify(oldProps.items)) {
      this.setState(items = newProps.items);
    }
  }

  toggleShow() {
    this.setState({viewAll: !this.state.viewAll});
  }

  render() {
    let items = this.props.items.map(item =>
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
    if (!this.state.viewAll) {
      items.splice(4)
    }
    return (
      <Flex justify='center' px={1} wrap>
        {items}
        <Box m='auto'>
          <Button center onClick={() => this.toggleShow()}>{this.state.viewAll ? 'View Less' : 'View More'}</Button>
        </Box>
      </Flex>
    )
  }
}

export default Portfolio
