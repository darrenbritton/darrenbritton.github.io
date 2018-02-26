import React from 'react'
import styled, { css } from 'styled-components'
import {Flex, Box} from 'grid-styled'
import { media } from '../utils/style'

import Img from "gatsby-image";

const Base = styled.div`
  width: 40%;
  margin: 0 auto !important;
  padding: 0;
  overflow: hidden;
  padding-top: 40px;

  ${ media.xs`
    width: 95%;
    margin-left: 0;
  ` }
`

class Showcase extends React.Component {
  render() {
    const images = this.props.images.reverse().map(image =>
      (
        <Box key={image.node.id} px={2} width={[ 1 / 2, 1 / 3 ]}>
          <Img sizes={image.node.sizes} />
        </Box>
      )
    )
    return (
      <Base>
        <Flex flexWrap='wrap'>
          {images}
        </Flex>
      </Base>
    )
  }
}

export default Showcase
