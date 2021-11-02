import React from 'react'
import styled, { css } from 'styled-components'
import { Flex, Box } from 'grid-styled'
import Img from 'gatsby-image'
import { media } from '../utils/style'

const Base = styled.div`
  width: 40%;
  margin: 0 auto !important;
  padding: 0;
  overflow: hidden;
  padding-top: 40px;

  ${media.xs`
    width: 95%;
    margin-left: 0;
  `}
`

class Showcase extends React.Component {
  render() {
    const images = this.props.images.reverse().map(image => (
      <Box key={image.node.id} px={2} width={[1 / 2, 1 / 3]}>
        <Img fluid={image.node.childImageSharp.fluid} />
      </Box>
    ))
    return (
      <Base>
        <Flex flexWrap="wrap">{images}</Flex>
      </Base>
    )
  }
}

export default Showcase
