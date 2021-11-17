import * as React from 'react'
import { graphql, Link } from "gatsby"
import Layout from '../components/layout'
import Image from "gatsby-image";
// import parse from "html-react-parser";

const WpPost = ({ data }) => {
    console.log(data);
    return (
        <Layout pageTitle="My Blog Posts">
            <h1>My WordPress Posts</h1>
            <h4>Posts</h4>
            {data.allWpPost.nodes.map(node => (
                <article key={node.id}>
                    <h2>
                        <Link to={`/post/${node.slug}`}>
                            {node.title}
                        </Link>
                    </h2>
                    <p>Posted: {node.date}</p>
                </article>
                // <div>
                //     <p>{node.title}</p>
                //     <div dangerouslySetInnerHTML={{ __html: node.content }} />
                // </div>
            ))}
        </Layout>
    )
}
export const pageQuery = graphql`
  query {
    allWpPost(sort: {fields: [date], order: DESC}) {
        nodes {
            id
            title
            content
            slug
            date(formatString: "MMMM D, YYYY")
        }
    }
}
`

export default WpPost;