import React from 'react'
import { Flex, Box } from 'grid-styled'
import { navigateTo } from "gatsby-link"

import Button from '../components/button'
import HeroImage from '../components/heroImage'
import HeroText from '../components/heroText'

const PageNotFound = () => (
  <div>
    <HeroImage overlay fillPage>
      <Button dark opaque onClick={() => navigateTo('/')} >Return To Home Page</Button>
      <HeroText text='404 Page Not Found' />
    </HeroImage>
  </div>
)

export default PageNotFound
