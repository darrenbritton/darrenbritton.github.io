import React from 'react'
import Img from 'gatsby-image'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// function Item({ excerpt, image, tags, slug, title, timeToRead }) {
//   return (
//     <a href={slug}>
//       {image ? (
//         <Img fluid={image.childImageSharp.fluid} className="max-h-48" />
//       ) : (
//         <div />
//       )}
//       <CardHeader>
//         <CardTitle>{title}</CardTitle>
//         <CardDescription>{excerpt}</CardDescription>
//       </CardHeader>
//       <CardFooter className="flex justify-between"></CardFooter>
//     </a>
//   )
//

function random(min = 1, max = 9) {
  return Math.floor(Math.random() * max) + min
}

function randomGradient() {
  const colours = [
    'slate',
    'slate',
    'gray',
    'gray',
    'zinc',
    'zinc',
    'neutral',
    'neutral',
    'stone',
    'stone',
    'red',
    'red',
    'orange',
    'orange',
    'amber',
    'amber',
    'yellow',
    'yellow',
    'lime',
    'lime',
    'green',
    'green',
    'emerald',
    'emerald',
    'teal',
    'teal',
    'cyan',
    'cyan',
    'sky',
    'sky',
    'blue',
    'blue',
    'indigo',
    'indigo',
    'violet',
    'violet',
    'purple',
    'purple',
    'fuchsia',
    'fuchsia',
    'pink',
    'pink',
    'rose',
  ]
  const number = 100
  const fromColour = random(0, colours.length - 1)
  let toColour = fromColour
  while (toColour === fromColour) {
    toColour = random(0, colours.length - 1)
  }
  return `bg-gradient-to-tr from-${colours[fromColour]}-${number} to-${colours[toColour]}-${number}`
}

function Item({ excerpt, image, tags, slug, title, timeToRead }) {
  const gradient = randomGradient()
  return (
    <a href={slug}>
      <div
        className={`relative flex max-w-[90vw] min-h-full bg-clip-border rounded-xl text-gray-700 shadow-md w-full max-w-[48rem] flex-row hover:drop-shadow-2xl transition-all transition duration-300 ${gradient}`}
      >
        <div
          className={`relative w-2/5 m-0 overflow-hidden text-gray-700 rounded-r-none bg-clip-border rounded-xl shrink-0 ${gradient}`}
        >
          <Img
            fluid={image.childImageSharp.fluid}
            className="object-cover w-full h-full"
          />
        </div>
        <div class="p-6">
          <h6 class="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
            {title}
          </h6>
          <p class="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
            {excerpt}
          </p>
          <h4 class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
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

  componentWillRecievedProps(newProps, oldProps) {
    if (
      newProps.items &&
      JSON.stringify(newProps.items) !== JSON.stringify(oldProps.items)
    ) {
      this.setState({ items: newProps.items })
    }
  }

  render() {
    const items = this.props.items.map((item) => (
      <div key={item.node.fields.slug} className="w-[620px] mb-10">
        <Item
          key={item.node.fields.slug}
          excerpt={item.node.excerpt}
          slug={item.node.fields.slug}
          timeToRead={item.node.timeToRead}
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
