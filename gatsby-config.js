module.exports = {
    siteMetadata: {
        siteUrl: `https://www.yourdomain.tld`,
        title: 'gat by site'
    },
    plugins: [
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        "gatsby-plugin-mdx",
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: 'blog',
                path: `${__dirname}/blog`
            }
        },
        {
            resolve: `gatsby-source-wordpress`,
            options: {
                url: `http://localhost/wp_project_k/graphql`,
                timeout: 36000000,
                includedRoutes: [
                    "/*/*/categories",
                    "/*/*/posts",
                    "/*/*/pages",
                    "/*/*/media",
                    "/*/*/tags",
                    "/*/*/taxonomies",
                    "/*/*/users",
                ],
                // excludedRoutes: ["menu"],
            },
        },
    ]
}