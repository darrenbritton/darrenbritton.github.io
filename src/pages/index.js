import React from 'react'
import Link from 'gatsby-link'
import { Flex, Box } from 'grid-styled'
import styled, { css } from 'styled-components'

import Button from '../components/button'
import Bar from '../components/bar'
import Breadcrumb from '../components/breadcrumb'
import Carousel from '../components/carousel'
import HeroImage from '../components/heroImage'
import NavBar from '../components/navbar'
import HeroText from '../components/heroText'
import SocialIcons from '../components/socialIcons'
import Portfolio from '../components/portfolio'

const Content = styled.div`
  & > a {
    visibility: hidden;
    display: block;
    height: 0;
    width: 0;
  }
  & > h1 {
    text-align: center;
  }
`

const Title = styled.h1`
  letter-spacing: 6px;
  margin-bottom: 40px;
  font-weight: 400;
  text-transform: uppercase;
  font-size: 32px;
  line-height: 40px;
  border: none;
  color: #292929;
`

const Section = styled.div`
  text-align: center;
  padding-top: 45px;
  P {
    margin-bottom: 64px;
    color: #666;
  }
`

class IndexPage extends React.Component {
  render() {
    const content = (
      <Content>
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
        <a id='about-me'>About Me</a>
        <Section>
          <Title>About Me</Title>
          <Flex align='center' column>
            <Box px={2} width={[ 1 , 1 / 2 ]}>
              <p>I have just finished my last year as a Computer Science student at the Dublin Institute of Technology. As far as my work goes I've probably worn every hat on the rack, most notible being Web Developer, Software Engineer and Photographer. Don’t let my clean lines and weakness for Swiss type fool you; My work has been pretty diverse and enjoyable. For more information about me follow one of my social media links above or at the bottom of the page.</p>
            </Box>
            <Box px={2} width={180}>
              <img src='/cdn/images/signature.png'></img>
            </Box>
          </Flex>
        </Section>
        <Title>Portfolio</Title>
        <a id='portfolio'>Portfolio</a>
        <Portfolio items={this.props.data.allMarkdownRemark.edges} />
        <a id='spacb'>Experience</a>
        <a id='spacc'>Skills</a>
        <a id='spacd'>Education</a>
        <a id='spacf'>Honours & Awards</a>
      </Content>
    )
    return (
      <div>
        <NavBar main children={content.props.children} />
        {content}
      </div>
    );
  }
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          timeToRead
          excerpt(pruneLength: 120)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            image
          }
        }
      }
    }
  }
`;
