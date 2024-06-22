import * as React from 'react'
import { graphql } from 'gatsby'
import type { HeadFC, PageProps } from 'gatsby'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import Portfolio from '@/components/portfolio'

const IndexPage: React.FC<PageProps> = (props) => {
  console.log(props)
  return (
    <div className="mx-auto">
      <div className="container pt-3 flex">
        <div className="inline">
          <Avatar>
            <AvatarImage src="/me.jpg" alt="@darrenbritton" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="columns-auto">
          <h2 className="text-shadow-sm scroll-m-20 pl-3 pt-2 font-semibold text-4xl">
            Darren Britton
          </h2>
        </div>
      </div>
      <div className="container pt-10">
        <div className="columns-auto">
          <h1 className="scroll-m-20 text-left text-7xl font-bold max-md:text-5xl tracking-tight">
            👋 I’m a Principle Software Engineer at Shutterstock, working from
            Ireland.
          </h1>
        </div>
      </div>
      <div className="container pt-10">
        <Portfolio items={props.data.allMarkdownRemark.edges} />
      </div>
    </div>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
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
                fluid(
                  maxWidth: 500
                  duotone: {
                    highlight: "#333333"
                    shadow: "#111111"
                    opacity: 65
                  }
                ) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    allImageSharp: allFile(filter: { relativePath: { regex: "/logos/" } }) {
      edges {
        node {
          id
          childImageSharp {
            fluid(
              maxWidth: 300
              duotone: { highlight: "#000000", shadow: "#ffffff" }
            ) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
    allFile(filter: { name: { regex: "/signature/" } }) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 200, grayscale: true) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
