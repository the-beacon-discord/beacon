/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import styles from './style.module.scss';

const Row = ({children}) => {
  return (
    <div className={styles.row}>
      {children}
    </div>
  )
}

export default Row
