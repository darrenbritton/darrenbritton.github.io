import React from 'react'
import Img from 'gatsby-image'

import { Badge } from '@/components/ui/badge'

function random(min = 1, max = 9) {
  return Math.floor(Math.random() * max) + min
}

function Item({ excerpt, image, tags, slug, title }) {
  console.log(image)
  return (
    <a href={slug}>
      <div
        style={{
          'background-image': `linear-gradient(to top right, ${image.colors.lightMuted}80, ${image.colors.vibrant}30)`,
        }}
        className={`relative flex max-w-[90vw] min-h-full bg-clip-border rounded-xl text-gray-700 shadow-md w-full max-w-[48rem] flex-row hover:drop-shadow-2xl transition-all transition duration-300`}
      >
        <div
          style={{
            'background-image': `linear-gradient(to top right, ${image.colors.lightMuted}80, ${image.colors.vibrant}30)`,
          }}
          className={`relative w-2/5 m-0 overflow-hidden text-gray-700 rounded-r-none bg-clip-border rounded-xl shrink-0`}
        >
          <Img
            fluid={image.childImageSharp.fluid}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-6">
          <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
            {title}
          </h6>
          <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
            {excerpt}
          </p>
          <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {tags.map((tag: string) => (
              <Badge variant="secondary">{tag}</Badge>
            ))}
          </h4>
        </div>
      </div>
    </a>
  )
}

class Portfolio extends React.Component {
  constructor(props) {
    super(props)

    this.state = { items: [], viewAll: false }
  }

  async componentWillRecievedProps(newProps, oldProps) {
    if (
      newProps.items &&
      JSON.stringify(newProps.items) !== JSON.stringify(oldProps.items)
    ) {
      this.setState({ items: newProps.items })
    }
  }

  render() {
    const items = this.props.items.map((item) => (
      <div key={item.node.fields.slug} className="w-[620px] mb-10 max-w-full">
        <Item
          key={item.node.fields.slug}
          excerpt={item.node.excerpt}
          slug={item.node.fields.slug}
          timeToRead={item.node.timeToRead}
          gradient={item.node.gradient}
          {...item.node.frontmatter}
        />
      </div>
    ))
    return (
      <div className="grid min-[1330px]:grid-cols-2 grid-cols-1">{items}</div>
    )
  }
}

export default Portfolio
