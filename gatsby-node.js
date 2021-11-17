const _ = require(`lodash`);
const Promise = require(`bluebird`);
const path = require(`path`);
const slash = require(`slash`);

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
exports.createPages = ({ graphql, actions, reporter }) => {
    const { createPage } = actions;
    return new Promise((resolve, reject) => {
        // The “graphql” function allows us to run arbitrary
        // queries against the local WordPress graphql schema. Think of
        // it like the site has a built-in database constructed
        // from the fetched data that you can run queries against.

        graphql(
            `
            {
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
        ).then(result => {
            if (result.errors) {
                reject(result.errors);
            }
            const pageTemplate = path.resolve("./src/templates/page.js");
            // We want to create a detailed page for each
            // post node. We'll just use the WordPress Slug for the slug.
            // The Post ID is prefixed with 'POST_'
            _.each(result.data.allWpPage.nodes, node => {
                createPage({
                    path: `/page/${node.slug}/`,
                    component: slash(pageTemplate),
                    context: {
                        id: node.id,
                        page: node,
                    },
                });
            });
            resolve();
        });

        // ==== PAGES (WORDPRESS NATIVE) ====
        graphql(
            `
            {
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
        ).then(result => {
            console.log(result);
            if (result.errors) {
                console.log(result.errors);
                reject(result.errors);
            }
            const postTemplate = path.resolve("./src/templates/post.js");
            console.log(postTemplate);
            // We want to create a detailed page for each
            // post node. We'll just use the WordPress Slug for the slug.
            // The Post ID is prefixed with 'POST_'
            _.each(result.data.allWpPost.nodes, node => {
                createPage({
                    path: `/post/${node.slug}/`,
                    component: slash(postTemplate),
                    context: {
                        id: node.id,
                        post: node,
                    },
                });
            });
            resolve();
        });
    });
    // ==== END POSTS ====
};