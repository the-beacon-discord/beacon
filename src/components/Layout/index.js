/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { ParallaxProvider } from 'react-scroll-parallax';
import { MDXProvider } from '@mdx-js/react';

import Header from '../Header'
import Footer from '../Footer';
import '../../scss/index.scss';

import styles from './style.module.scss';
import { Heading1, Heading2, Heading3, Heading5, Heading6, Heading4 } from '../Heading';
import DefaultSEO from '../DefaultSEO';
import CodeBlock from '../CodeBlock';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ParallaxProvider>
      <MDXProvider
        components={{
          h1: Heading1,
          h2: Heading2,
          h3: Heading3,
          h4: Heading4,
          h5: Heading5,
          h6: Heading6,
          pre: (props) => <div {...props} />,
          code: CodeBlock
        }}
      >
        <DefaultSEO />
        <div
          className={styles.body}
        >
          <Header siteTitle={data.site.siteMetadata.title} />
          <main style={{
            flexGrow: '1'
          }}>{children}</main>
          <Footer siteTitle={data.site.siteMetadata.title} />
        </div>
      </MDXProvider>
    </ParallaxProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
