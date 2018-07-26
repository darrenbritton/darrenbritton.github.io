import React from 'react'
import Link from 'gatsby-link'
import { Flex, Box } from 'grid-styled'
import styled, { css } from 'styled-components'
import Img from 'gatsby-image'
import FlickrHero from 'react-flickr-hero'

import { media } from '../utils/style'

import Button from '../components/button'
import Bar from '../components/bar'
import Breadcrumb from '../components/breadcrumb'
import Carousel from '../components/carousel'
import NavBar from '../components/navbar'
import HeroText from '../components/heroText'
import SocialIcons from '../components/socialIcons'
import Portfolio from '../components/portfolio'
import Showcase from '../components/showcase'

const Content = styled.div`
  & > a {
    visibility: hidden;
    display: block;
    height: 0;
  }
  & > h1 {
    text-align: center;
  }
`

const Title = styled.h1`
  font-family: 'Raleway';
  text-transform: uppercase;
  letter-spacing: 6px;
  margin-bottom: 40px;
  font-weight: 400;
  font-size: 32px;
  line-height: 40px;
  border: none;
  color: #292929;

  ${props => props.small && css`
    font-size: 12px;
    letter-spacing: 2px;
    font-weight: 700;
    line-height: 24px;
  `}

`

const Section = styled.div`
  text-align: center;
  padding-top: 45px;
  padding-bottom: 40px;

  a {
    font-family: 'Lato';
  }

  p {
    margin-bottom: 64px;
    font-size: large;
    color: #666;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Raleway';
    text-transform: uppercase;
    color: #292929;
  }

  h4 {
    letter-spacing: 3px;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    color: #292929;
  }

  span {
    color: #666;
    opacity: 0.5;
    display: block;
  }

  & > div:last-child {
    border-bottom: none !important;
  }

  ${props => props.center && css`

    text-align: left;
    & > * {
      margin-left: 30vw;
    }
     h4 {
       margin-left: 20vw;
     }

    ${ media.xs`
        & > div {
          margin-left: 3vw !important;
        }
    ` }
  `}

  ${props => props.dark && css`
    background: #292929;
     * {
       color: #eee;
     }
     span {
      text-align: left;
      font-size: 16px;
      line-height: 28px;
      font-weight: 400;
      opacity: .5;
     }
     span, p {
       color: #fefefe !important;
     }
     h6 {
       color: #fff;
       font-weight: 700;
     }
     h4 {
       color: #fff;
     }
     div {
       border-bottom: 1px solid #333 !important;
     }
  `}
`

const Item = styled.div`
  width: 40%;
  margin: 0 auto;
  border: none;
  border-bottom: 1px solid #eee;
  h6 {
    letter-spacing: 2px;
    font-weight: 700;
    padding-top: 6px;
  }
  span, p {
    font-size: 13px;
    line-height: 24px;
    color: #666;
  }
  span {
    opacity: .75;
    float: right;
    text-transform: uppercase;
  }
  p {
    margin-bottom: 24px;
    opacity: 0.5;
  }
  ${ media.xs`
    width: 90%;

  ` }
`

class IndexPage extends React.Component {
  render() {
    const content = (
      <Content>
        <FlickrHero api_key='1b4e5b0203fab0d5731afe68f0a543e1' user_id='132343752@N06' album_id='72157694825254121' fillPage />
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
        <a id='about-me'>About Me</a>
        <Section>
          <Title>About Me</Title>
          <Flex alignItems='center' flexDirection='column'>
            <Box px={2} width={[ 1 , 1 / 2 ]}>
              <p>Currently working as a software engineer at <a href='https://shutterstock.com'>Shutterstock</a> focusing on the editorial content platform. As far as my work goes I've probably worn every hat on the rack, most notible being Web Developer, Software Engineer and Photographer. Don’t let my clean lines and weakness for Swiss type fool you; My work has been pretty diverse and enjoyable. For more information about me follow one of my social media links above or at the bottom of the page.</p>
            </Box>
            <Box px={2} width={180}>
              <Img sizes={this.props.data.allFile.edges[0].node.childImageSharp.sizes}></Img>
            </Box>
          </Flex>
        </Section>
        <Title small>Portfolio</Title>
        <a id='portfolio'>Portfolio</a>
        <Portfolio items={this.props.data.allMarkdownRemark.edges} />
        <a id='experience'>Experience</a>
        <Section center dark>
          <h4>Experience</h4>
          <span>Where I've worked.</span>
          <Item>
            <span>MAY 2018 - CURRENT</span>
            <h6>SHUTTERSTOCK</h6>
            <p>Software Engineer</p>
          </Item>
          <Item>
            <span>JUNE 2016 - APRIL 2018</span>
            <h6>SAP IRELAND</h6>
            <p>Full Stack Developer</p>
          </Item>
          <Item>
            <span>FEB 2015 - AUG 2015</span>
            <h6>SAP IRELAND</h6>
            <p>Support Engineer</p>
          </Item>
          <Item>
            <span>JAN 2014 - JULY 2014</span>
            <h6>ST DECLAN'S COLLEGE</h6>
            <p>Full Stack Developer</p>
          </Item>
        </Section>
        <a id='tech'>Tech</a>
        <Section center>
          <h4>Tech</h4>
          <span>Technologies I enjoy working with.</span>
          <Showcase images={this.props.data.allImageSharp.edges} />
        </Section>
        <a id='education'>Education</a>
        <Section dark center>
          <h4>EDUCATION</h4>
          <span>Education I've recieved.</span>
          <Item>
            <span>2012 - 2016</span>
            <h6>BSC COMPUTER SCIENCE (1st Class Honours)</h6>
            <p>Dublin Institute of Technology</p>
          </Item>
          <Item>
            <span>2006 - 2012</span>
            <h6>SECONDARY EDUCATION</h6>
            <p>Saint Declan's College</p>
          </Item>
        </Section>
        <a id='honoursAndAwards'>Honours & Awards</a>
        <Section center>
          <h4>HONORS & AWARDS</h4>
          <span>A list of honors and awards I have recieved for my work.</span>
          <Item>
            <span>2016</span>
            <h6>BEST PROJECT (IN THE DIT PROJECT FAIR)</h6>
            <p>SAP</p>
          </Item>
          <Item>
            <span>2014</span>
            <h6>GAMES STUDIO IRELAND CHALLENGE: BEST IN ORIGINAL STORY</h6>
            <p>Games Fleadh</p>
          </Item>
          <Item>
            <span>2010</span>
            <h6>ACCESS ACCENTURE ACHIEVEMENT AWARD</h6>
            <p>Accenture</p>
          </Item>
        </Section>
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
            image {
              childImageSharp {
                sizes(
                  maxWidth: 500,
                  duotone: {
                    highlight: "#333333",
                    shadow: "#111111",
                    opacity: 65
                  }
                ) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
    allImageSharp(filter: {id: {regex: "/logos/"}}) {
      edges {
        node {
         id,
          sizes(maxWidth: 200, grayscale: true) {
            ...GatsbyImageSharpSizes_tracedSVG
          }
        }
      }
    }
    allFile(filter: {id: {regex: "/signature/"}}) {
     edges {
       node {
         childImageSharp {
           sizes(maxWidth: 200, grayscale: true) {
             ...GatsbyImageSharpSizes_tracedSVG
           }
         }
       }
     }
   }
  }
`;
