const websiteMetadata = {
  title: 'The Beacon',
  description: 'Something cool happens here.',
  author: 'The Beacon',
  language: 'en-GB',
  siteUrl: 'https://thebeacon.netlify.com',
  github: 'https://github.com/7coil/beacon',
  discord: 'https://discord.gg/2Zw2XxB',
  youtube: 'https://www.youtube.com/channel/UCFW1hIgpFxsfzM2GxMyIaiw',
  podcast: {
    title: 'The Signal',
    description: 'Watch as LOONA stans discuss about what has been happening in their daily lives.',
    author: 'The Beacon',
    language: 'en-GB',
    siteUrl: 'https://thebeacon.netlify.com',
    subtitle: 'LOONA stans doing absolutely nothing',
    explicit: 'yes', // Allowed values: `yes` or `clean`
    email: 'beacondiscord@gmail.com',
    copyright: 'The Beacon'
  }
};

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
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [
          '.mdx',
          '.md'
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
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
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'The Beacon',
        short_name: 'The Beacon',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#fe9900',
        display: 'minimal-ui',
        icon: 'src/images/logo/256.png', // This path is relative to the root of the site.
        include_favicon: false
      },
    },
    'gatsby-plugin-offline',
  ],
}
