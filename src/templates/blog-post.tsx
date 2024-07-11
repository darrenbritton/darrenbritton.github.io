import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Autoplay from 'embla-carousel-autoplay'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'

function BlogPost({ data, location }) {
  const post = data.markdownRemark
  const image = post.frontmatter.image;
  console.log({ post })
  const tags = post.frontmatter.tags.map(function (tag) {
    return <li key={tag}>{tag}</li>
  })
  const images = (
    post?.frontmatter?.otherImages
      ? post.frontmatter.otherImages
      : [post.frontmatter.image]
  ).map(function (image, i) {
    return (
      <CarouselItem key={i}>
        <div className="aspect-square items-center justify-center p-6">
          <Img
            fluid={image.childImageSharp.fluid}
            className="absolute top-1/2 -translate-y-1/2"
          />
        </div>
      </CarouselItem>
    )
  })
  return (
    <>
      <div className="rainbow-anchors container relative hidden flex-col items-center justify-center md:grid lg:max-w-none text-zinc-800 lg:grid-cols-2 lg:px-0"
              style={{
                'background-image': `linear-gradient(to top right, ${image.colors.lightMuted}80, ${image.colors.vibrant}50)`,
              }}>
        <div className="relative hidden h-screen flex-col p-5 dark:border-r lg:flex">
          <div className="absolute inset-0" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link to="/">
              <img src="/logo-150x150.png" className="w-20 h-20" />
            </Link>
            <Link to="/">Darren Britton</Link>
          </div>
          <div className="relative z-20 mt-auto">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
              className="w-auto mx-10 mt-auto"
            >
              <CarouselContent>{images}</CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
        <div className="lg:p-8 lg:mt-20">
          <div className="flex w-full flex-col">
            <div className="flex flex-col space-y-2 text-left">
              <h1 className="text-6xl font-semibold tracking-tight">
                {post.frontmatter.title}
              </h1>
            </div>
            <Separator className="my-4 bg-white" />
            <div />
            <div
              className="text-4xl"
              dangerouslySetInnerHTML={{ __html: post.html }}
            ></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogPost

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      fields {
        slug
      }
      frontmatter {
        title
        date
        tags
        image {
          colors {
            ...GatsbyImageColors
          }
          childImageSharp {
            fluid(maxWidth: 2000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        otherImages {
          childImageSharp {
            fluid(maxWidth: 2000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
