import { StaticQuery } from "gatsby";
import React, { Component } from "react";
import Container from "../Container";
import styles from './style.module.scss';


class Footer extends Component {
  render() {
    return (
      <footer className={styles.footer}>
        <Container>
          <ul>
            <StaticQuery
                query={graphql`
                query footer {
                  site {
                    siteMetadata {
                      github
                      discord
                    }
                  }
                }
                `}
                render={data =>
                  <>
                    <li><a href={data.site.siteMetadata.github}>GitHub</a></li>
                    <li><a href={data.site.siteMetadata.discord}>Discord</a></li>
                  </>
                }
              />
          </ul>
        </Container>
        <div className={styles.copyright}>
          <Container>
            <p className={styles.copyrightText}><i>Copyright The Beacon 2017 - 2019</i></p>
          </Container>
        </div>
      </footer>
    )
  }
}

export default Footer
