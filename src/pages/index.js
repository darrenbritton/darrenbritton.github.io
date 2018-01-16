import React from 'react'
import Link from 'gatsby-link'
import { Flex, Box } from 'grid-styled'

import Button from '../components/button'
import Bar from '../components/bar'
import Breadcrumb from '../components/breadcrumb'
import Carousel from '../components/carousel'
import HeroImage from '../components/heroImage'
import NavBar from '../components/navbar'
import HeroText from '../components/heroText'
import SocialIcons from '../components/socialIcons'

class IndexPage extends React.Component {
  render() {
    const content = (
      <div>
        <HeroImage overlay fillPage>
          <HeroText />
          <SocialIcons style={{position: 'absolute', margin: '0 auto', left: 0, right: 0, bottom: 16}} icons={[
              {
                name: 'twitter',
                href: 'https://twitter.com/darren_britton'
              }, {
                name: 'github-alt',
                href: 'https://github.com/darrenbritton'
              }, {
                name: 'linkedin',
                href: 'https://ie.linkedin.com/in/darrenbritton'
              }
            ]}/>
        </HeroImage>
        <a id='space'>About Me</a>
        <a id='spaca'>Portfolio</a>
        <a id='spacb'>Experience</a>
        <a id='spacc'>Skills</a>
        <a id='spacd'>Education</a>
        <a id='spacf'>Honours & Awards</a>
      </div>
    )
    console.log(content.props)
    return (
      <div>
        <NavBar main children={content.props.children} />
        {content}
      </div>
    );
  }
}

export default IndexPage
