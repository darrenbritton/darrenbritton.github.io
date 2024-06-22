import React from 'react'
import { graphql } from 'gatsby'

function BlogPost({ data, location }) {
  const post = data.markdownRemark
  const crumbs = [
    { name: 'home', link: '/' },
    { name: 'portfolio', link: '/#portfolio' },
    { name: post.frontmatter.title, link: location.pathname },
  ]
  const tags = post.frontmatter.tags.map(function (tag) {
    return <li key={tag}>{tag}</li>
  })
  return (
    <div>
      {/* <Header>
        <Flex flexWrap="wrap">
          <Box px={2} width={[1, 2 / 3, 1 / 3]}>
            <Title>{post.frontmatter.title}</Title>
          </Box>
          <Box px={2} width={[1, 2 / 3]}>
            <Breadcrumb crumbs={crumbs} />
          </Box>
          <Box px={2} width={[1]}>
            <Bar />
          </Box>
        </Flex>
      </Header>
      <Content>
        <TimeToRead>{post.timeToRead} min read</TimeToRead>
        <Tags>{tags}</Tags>
        <Bar />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <Timestamp>
          Posted: <TimeAgo date={post.frontmatter.date} />
        </Timestamp>
      </Content> */}
    </div>
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
      }
    }
  }
`
