const fs = require('fs');
const path = require('path');
const getMP3Duration = require('get-mp3-duration');

const websiteMetadata = {
  title: 'The Beacon',
  description: 'Something cool happens here.',
  author: 'The Beacon',
  siteUrl: 'https://thebeacon.netlify.com',
  github: 'https://github.com/7coil/beacon'
};

const podcastMetadata = {
  author: 'The Beacon',
  subtitle: 'LOONA stans doing absolutely nothing',
  description: 'Watch as LOONA stans discuss about what has been happening in their daily lives.',
  email: 'beacondiscord@gmail.com'
}

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

module.exports = {
  siteMetadata: websiteMetadata,
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: [
          'src/scss'
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown-pages',
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: 'gatsby-plugin-copy-files',
      options: {
        source: `${__dirname}/src/public`,
        destination: '/test'
      }
    },
    'gatsby-transformer-remark',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        setup: ({ // https://github.com/gatsbyjs/gatsby/issues/16177
          query: {
            site: { siteMetadata },
          },
          ...rest // outside of the query
        }) => {
          return {
            ...siteMetadata,
            ...rest,
          }
        },
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const newEdges = {
                  title: edge.node.frontmatter.title,
                  description: edge.node.frontmatter.description || edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: websiteMetadata.siteUrl + edge.node.fields.slug,
                  guid: websiteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [
                    {'content:encoded': edge.node.html}
                  ],
                }

                // Push podcast details
                if (edge.node.fields.template === 'podcast') {
                  // Open the podcast.mp3 file
                  const podcastFile = fs.readFileSync(path.resolve(__dirname, 'src', 'posts', ...edge.node.fields.slug.split(/[\\/]/), 'podcast.mp3'))

                  // Copy the podcast.mp3 file to the correct destination
                  fs.writeFileSync(
                    path.resolve(__dirname, 'public', ...edge.node.fields.slug.split(/[\\/]/), 'podcast.mp3'),
                    podcastFile
                  )

                  // Get the duration of the podcast
                  const duration = getMP3Duration(podcastFile);

                  newEdges.custom_elements.push(
                    {'itunes:author': 'The Beacon'},
                    {'itunes:season': edge.node.frontmatter.season},
                    {'itunes:episode': edge.node.frontmatter.episode},
                    {'itunes:summary': edge.node.frontmatter.description},
                    {'itunes:explicit': edge.node.frontmatter.explicit ? 'yes' : 'no'},
                    {'itunes:duration': formatMilliseconds(duration)}
                  );

                  newEdges.enclosure = {
                    url: websiteMetadata.siteUrl + edge.node.fields.slug + 'podcast.mp3',
                    // size of podcast.mp3 in bytes
                    size: podcastFile.byteLength,
                    type: 'audio/mpeg'
                  }
                }

                return Object.assign({}, edge.node.frontmatter, newEdges)
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields {
                        slug
                        template
                      }
                      frontmatter {
                        title
                        description
                        date
                        explicit
                        season
                        episode
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            language: 'en-GB',
            docs: websiteMetadata.github,
            description: podcastMetadata.description,
            custom_elements: [
              {'itunes:subtitle': podcastMetadata.subtitle},
              {'itunes:author': podcastMetadata.author},
              {'itunes:summary': podcastMetadata.description},
              {'itunes:explicit': 'yes'},
              {
                'itunes:category': [
                  {
                    _attr: {
                      text: 'Leisure'
                    }
                  },
                  {
                    'itunes:category': {
                      _attr: {
                        text: 'Video Games'
                      }
                    }
                  }
                ]
              },
              {
                'itunes:category': {
                  _attr: {
                    text: 'Society & Culture'
                  }
                }
              },
              {
                'itunes:owner': [
                  {'itunes:name': podcastMetadata.author},
                  {'itunes:email': podcastMetadata.email}
                ]
              },
              {
                'itunes:image': {
                  _attr: {
                    href: websiteMetadata.siteUrl + '/images/podcast.png'
                  }
                }
              }
            ],
            custom_namespaces: {
              itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd'
            }
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'The Beacon',
        short_name: 'The Beacon',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#fe9900',
        display: 'minimal-ui',
        icon: 'src/images/logo/256.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
  ],
}
