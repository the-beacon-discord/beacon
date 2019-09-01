/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import styles from './style.module.scss';
import CombineStyles from '../../helpers/CombineStyles';

const Container = ({ children, className, outerClassName, ...props }) => {
  return (
    <div className={CombineStyles(styles.container, className)} {...props}>
      {children}
    </div>
  )
}

export default Container
