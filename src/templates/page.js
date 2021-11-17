import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
const Page = ({ pageContext }) => {
  console.log(pageContext);
  const page = pageContext.page;
  return (
    <Layout pageTitle={page.title}>
      <div>
        <p>{page.title}</p>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>
      <div>
        <Link to={'/wp-page'}>Back</Link>
      </div>
    </Layout>
  )
}


export default Page