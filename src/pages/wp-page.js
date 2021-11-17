import * as React from 'react'
import { graphql, Link } from "gatsby"
import Layout from '../components/layout'
import Image from "gatsby-image";
// import parse from "html-react-parser";

const WpPost = ({ data }) => {
    console.log(data);
    return (
        <Layout pageTitle="My Blog Posts">
            <h1>My WordPress Pages</h1>
            <h4>Pages</h4>
            {data.allWpPage.nodes.map(node => (
                <article key={node.id}>
                    <h2>
                        <Link to={`/page/${node.slug}`}>
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
    allWpPage(sort: {fields: [date], order: DESC}) {
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