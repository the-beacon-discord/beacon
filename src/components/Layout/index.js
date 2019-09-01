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

import Header from '../Header'
import Footer from '../Footer';
import '../../scss/index.scss';

import styles from './style.module.scss';

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
      <div
        className={styles.body}
      >
        <Header siteTitle={data.site.siteMetadata.title} />
        <main style={{
          flexGrow: '1'
        }}>{children}</main>
        <Footer siteTitle={data.site.siteMetadata.title} />
      </div>
    </ParallaxProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
