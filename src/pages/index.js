import React from 'react'
import Link from 'gatsby-link'

import Button from '../components/button'

const IndexPage = () => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
    <Button opaque>Hello World</Button>
  </div>
)

export default IndexPage
