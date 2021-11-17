import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
const Post = ({ pageContext }) => {
  console.log(pageContext);
  const post = pageContext.post;
  return (
    <Layout pageTitle={post.title}>
      <div>
        <p>{post.title}</p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      <div>
        <Link to={'/wp-post'}>Back</Link>
      </div>
    </Layout>
  )
}


export default Post