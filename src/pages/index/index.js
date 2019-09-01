import React from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';
import DiscordServerButton from '../../components/DiscordServerButton';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import one from '../../images/parallax/1.png';
import two from '../../images/parallax/2.png';
import three from '../../images/parallax/3.png';
import four from '../../images/parallax/4.png';
import { Link } from 'gatsby';
import Container from '../../components/Container';

import styles from './index.module.scss';

const IndexPage = () => (
  <Layout>
    <SEO />
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
          children: <h1 style={{marginTop: '1em', color: '#fff'}}>The Beacon</h1>,
          amount: 0.01
        }
      ]}
      className={styles.parallax}
    />
    <Container>
      <ul>
        <li><Link to="/podcast">Podcast</Link></li>
        <li><Link to="/news">News</Link></li>
        <li><Link to="/loonawheel">The LOONA wheel</Link></li>
      </ul>
      <DiscordServerButton />
    </Container>
  </Layout>
)

export default IndexPage
