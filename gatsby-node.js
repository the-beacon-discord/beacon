const path = require('path')
const xmlConverter = require('xml-js')
const fs = require('fs');
const getMP3Duration = require('get-mp3-duration');
const { createFilePath } = require('gatsby-source-filesystem')

// https://stackoverflow.com/a/11486026
const formatMilliseconds = (ms) => {
  const time = ms / 1000;
  // Hours, minutes and seconds
  const hrs = ~~(time / 3600);
  const mins = ~~((time % 3600) / 60);
  const secs = ~~time % 60;

  // Output like "00:01:01" or "4:03:59" or "123:03:59"
  return `${hrs < 10 ? '0' : ''}${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// https://github.com/gatsbyjs/gatsby/issues/7363
exports.onCreatePage = ({ page, actions }) => {
  const { deletePage, createPage } = actions

  return new Promise((resolve) => {
		// if the page component is the index page component
    if (page.componentPath.includes('/src/pages/index/index.js')) {
      deletePage(page)

      // create a new page but with '/' as path
      createPage({
        ...page,
        path: '/',
      })
		}

    resolve()
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
	/**
	 * Organise Markdown files into their specific category
	 * For example, the `podcast` category.
	 */
	const { createNodeField } = actions;
	if (node.internal.type === 'Mdx') {
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
  const makePage = graphql(`
    {
      allMdx(
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
			result.data.allMdx.edges.forEach(({ node }) => {
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

    const makePodcast = graphql(`
		{
			site {
				siteMetadata {
					siteUrl
					podcast {
						title
						siteUrl
						description
						language
						author
						explicit
						subtitle
						email
						copyright
					}
				}
			}
			allMdx(
				sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
        filter: { fields: { template: { eq: "podcast"}}}
			) {
				edges {
					node {
						fields {
							slug
						}
						frontmatter {
							title
							description
							date
							explicit
							season
              episode
              mp3File {
                absolutePath
                publicURL
              }
						}
					}
				}
			}
		}
	`)
		.then((result) => {
      const podcastMetadata = result.data.site.siteMetadata.podcast;

			const output = {
				_declaration: {
					_attributes: {
						version: '1.0',
						encoding: 'UTF-8'
					}
				},
				rss: {
					_attributes: {
						'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
						'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
						'xmlns:atom': 'http://www.w3.org/2005/Atom',
						'xmlns:itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd',
						'xmlns:media': 'http://www.itunes.com/dtds/podcast-1.0.dtd',
						'xmlns:dcterms': 'http://purl.org/dc/terms',
						'xmlns:spotify': 'http://www.spotify.com/ns/rss',
						'xmlns:psc': 'http://podlove.org/simple-characters',
						version: '2.0'
					},
					channel: {
						title: {
							_text: podcastMetadata.title
						},
						link: {
							_text: podcastMetadata.siteUrl
						},
						description: {
							_text: podcastMetadata.description
						},
						'itunes:description': {
							_text: podcastMetadata.description
						},
						'itunes:subtitle': {
							_text: podcastMetadata.subtitle
						},
						language: {
							_text: podcastMetadata.language
						},
						generator: {
							_text: 'Katielabs Shit XML Machine Version 2020-01-17 - https://github.com/the-beacon-discord/beacon'
						},
						copyright: {
							_text: podcastMetadata.copyright
						},
						'itunes:author': {
							_text: podcastMetadata.author
						},
						'itunes:owner': {
							'itunes:name': {
								_text: podcastMetadata.author
							},
							'itunes:email': {
								_text: podcastMetadata.email
							}
						},
						'itunes:image': {
							_text: `${result.data.site.siteMetadata.siteUrl}/images/logo/3000.png`
						},
						image: {
							url: {
								_text: `${result.data.site.siteMetadata.siteUrl}/images/logo/3000.png`
							}
						},
						'itunes:explicit': {
							_text: podcastMetadata.explicit
						},
						'itunes:category': [
							{
								_attributes: {
									text: 'Leisure'
								},
								'itunes:category': {
									_attributes: {
										text: 'Video Games'
									}
								}
							},
							{
								_attributes: {
									text: 'Society &amp; Culture'
								}
							}
						],
						item: result.data.allMdx.edges
							.map(({ node }) => {
								// Open the podcast.mp3 file
								const podcastFile = fs.readFileSync(node.frontmatter.mp3File.absolutePath)

								// Get the duration of the podcast
								const duration = formatMilliseconds(getMP3Duration(podcastFile));

								return {
									guid: {
										_attributes: {
											isPermaLink: true
										},
										_text: `${result.data.site.siteMetadata.siteUrl}${node.fields.slug}`
									},
									enclosure: {
										_attributes: {
											url: `${result.data.site.siteMetadata.siteUrl}${node.frontmatter.mp3File.publicURL}`,
											type: 'audio/mpeg',
											length: podcastFile.byteLength
										}
									},
									pubDate: {
										_text: (new Date(node.frontmatter.date)).toUTCString()
									},
									title: {
										_text: node.frontmatter.title
									},
									description: {
										_text: node.frontmatter.description
									},
									link: {
										_text: `${result.data.site.siteMetadata.siteUrl}${node.fields.slug}`
									},
									'itunes:author': {
										_text: podcastMetadata.author
									},
									'itunes:season': {
										_text: node.frontmatter.season
									},
									'itunes:episode': {
										_text: node.frontmatter.episode
									},
									'itunes:duration': {
										_text: duration
									},
									'itunes:summary': {
										_text: node.frontmatter.description
									},
									'itunes:explicit': {
										_text: node.frontmatter.explicit ? 'yes' : 'no'
									}
								};
							})
					}
				}
			}

			const xml = xmlConverter.js2xml(output, {
				compact: true,
				spaces: 2
			}) + '\n';
			fs.writeFileSync(path.resolve(__dirname, 'public', 'rss.xml'), xml)
		})
    
    return Promise.all([makePage, makePodcast])
}
