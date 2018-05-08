import React from 'react'
import { Flex, Box } from 'grid-styled'
import { navigateTo } from "gatsby-link"
import FlickrHero from 'react-flickr-hero'
import styled from 'styled-components'

import Button from '../components/button'
import HeroText from '../components/heroText'

const HomeButton = styled(Button)`
  position: absolute;
  bottom: 35%;
  left: 20%;
`

const PageNotFound = () => (
  <div>
    <FlickrHero api_key='1b4e5b0203fab0d5731afe68f0a543e1' user_id='132343752@N06' album_id='72157694825254121' fillPage />
    <HomeButton opaque light onClick={() => navigateTo('/')} >Return To Home Page</HomeButton>
    <HeroText text='404 Page Not Found' />
  </div>
)

export default PageNotFound
