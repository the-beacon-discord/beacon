/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { Location } from '@reach/router';

const DefaultSEO = ({
  lang = 'en-GB'
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  return (
    <Location>
      {locationProps => {
        const metaTags = [];

        metaTags.push(
          {
            name: `description`,
            content: site.siteMetadata.description,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            property: 'og:url',
            content: `${site.siteMetadata.siteUrl}${locationProps.location.pathname}`
          },
          {
            property: 'og:site_name',
            content: site.siteMetadata.title
          },
          {
            property: `og:description`,
            content: site.siteMetadata.description,
          },
          {
            property: 'og:image',
            content: '/images/logo/256.png'
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:creator`,
            content: site.siteMetadata.author,
          },
          {
            name: `twitter:title`,
            content: site.siteMetadata.title,
          },
          {
            name: `twitter:description`,
            content: site.siteMetadata.description,
          }
        )

        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            titleTemplate={`%s | ${site.siteMetadata.title}`}
            defaultTitle={site.siteMetadata.title}
            meta={metaTags}
          >
            <link rel="alternative" type="application/rss+xml" title="The Beacon RSS Feed" href="/rss.xml" />
          </Helmet>
        )
      }}
    </Location>
  )
}

DefaultSEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export default DefaultSEO
