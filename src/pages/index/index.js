import { graphql, Link } from 'gatsby';
import React from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';
import Button from '../../components/Button';
import Container from '../../components/Container';
import DiscordServerEmbed from '../../components/DiscordServerEmbed';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import one from '../../images/parallax/1.png';
import two from '../../images/parallax/2.png';
import three from '../../images/parallax/3.png';
import four from '../../images/parallax/4.png';
import styles from './index.module.scss';
import Row from '../../components/Row';

const IndexPage = ({ data }) => (
  <Layout>
    <ParallaxBanner
      layers={[
        {
          image: one,
          amount: 0.4
        },
        {
          image: two,
          amount: 0.2
        },
        {
          image: three,
          amount: -0.2
        },
        {
          image: four,
          amount: -0.4
        },
        {
          children: <div className={styles.parallaxText}>
            <h1>The Beacon</h1>
            <h2>Community Gaming Server</h2>
            <Row>
              <Button href={data.site.siteMetadata.discord} className={styles.discordButton}>Discord</Button>
              <Button href={data.site.siteMetadata.youtube} className={styles.youtubeButton}>YouTube</Button>
            </Row>
          </div>,
          amount: 0.01
        }
      ]}
      className={styles.parallax}
    />
    <Container>
      <ul>
        <li><Link to="/podcast">Podcast</Link></li>
        <li><Link to="/news">News</Link></li>
        <li><Link to="/docs">Documentation</Link></li>
        <li><Link to="/loonawheel">The LOONA wheel</Link></li>
      </ul>
      <DiscordServerEmbed />
    </Container>
  </Layout>
)

export const pageQuery = graphql`
query indexPage {
  site {
    siteMetadata {
      github
      discord
      youtube
    }
  }
}
`

export default IndexPage
