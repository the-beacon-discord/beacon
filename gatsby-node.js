const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
	/**
	 * Organise Markdown files into their specific category
	 * For example, the `podcast` category.
	 */
	const { createNodeField } = actions;
	if (node.internal.type === 'MarkdownRemark') {
		const parent = getNode(node.parent);
		const directoryParts = parent.relativeDirectory.split(/[\\/]/);

		const folderName = directoryParts[0];
		const slug = createFilePath({ node, getNode })

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    })

		createNodeField({
			node,
			name: 'template',
			value: folderName
		});
	}
}

exports.createPages = ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
						fields {
							template
							slug
						}
          }
        }
      }
    }
	`)
		.then((result) => {
			// Handle errors
			if (result.errors) {
				reporter.panicOnBuild(`Error while running GraphQL query.`)
				return
			}
			result.data.allMarkdownRemark.edges.forEach(({ node }) => {
				createPage({
					// Set the path down
					path: node.fields.slug,
					// Select the correct template, based on `node.fields.template` which was assigned in `exports.onCreateNode`
					component: path.resolve(__dirname, 'src', 'templates', node.fields.template, 'index.js'),
					// Pass in the fields.
					context: node.fields
				})
			})

			return;
		})
}
