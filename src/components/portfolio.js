import React from 'react'
import styled, { css } from 'styled-components'
import {Flex, Box} from 'grid-styled'

import HeroImage from '../components/heroImage'

const Card = styled.div`
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  position: relative;
  margin-bottom: 32px;
  border-radius: 30px;
  overflow: hidden;
  & > a > div {
    z-index: -1;
    transition: transform .5s ease-in-out;
  }
  &:hover > a > div {
    transform: scale(1.1);
  }
  h1 {
    color: #fff;
    position: absolute;
    bottom: 20%;
    left: 5%;
    max-width: 70%;
  }
  p {
    color: #fff;
    position: absolute;
    bottom: 2%;
    left: 5%;
    max-width: 80%;
  }
`

const Item = ({excerpt, image = null, tags, slug, title, timeToRead}) => (
  <Card>
    <a href={slug}>
      <HeroImage
        overlay
        img={image ? `/cdn/images/${image}` : '//lorempixel.com/720/720/cats/'}
      />
    </a>
    <h1>{title}</h1>
    <p>{excerpt}</p>
  </Card>
)

class Portfolio extends React.Component {
  render() {
    console.log(this.props.items);
    const items = this.props.items.map(item =>
      (
        <Box px={2} width={[ 1 , 1 / 2, 1 / 3, 1 / 4 ]}>
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
      <Flex wrap>
        {items}
      </Flex>
    )
  }
}

export default Portfolio
