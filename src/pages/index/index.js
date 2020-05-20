import { graphql, Link } from 'gatsby';
import React, { Component } from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';
import Button from '../../components/Button';
import Container from '../../components/Container';
import DiscordServerEmbed from '../../components/DiscordServerEmbed';
import Layout from '../../components/Layout';
import Row from '../../components/Row';
import one from '../../images/parallax/1.png';
import two from '../../images/parallax/2.png';
import three from '../../images/parallax/3.png';
import four from '../../images/parallax/4.png';
import styles from './index.module.scss';

class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: null,
      invite: null
    }
  }
  componentDidMount() {
    fetch('https://canary.discordapp.com/api/guilds/310279910264406017/widget.json')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          members: data.presence_count,
          invite: data.instant_invite
        })
      })
  }
  render() {
    const data = this.props.data;

    return (
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
                  <Button href={this.state.invite || data.site.siteMetadata.discord} className={styles.discordButton}>Discord</Button>
                  <Button href={data.site.siteMetadata.youtube} className={styles.youtubeButton}>YouTube</Button>
                </Row>
                <h3>Join over 2000 members around the world{this.state.members !== null && ` - ${this.state.members} online right now`}</h3> 
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
            {/* <li><Link to="/loonawheel">The LOONA wheel</Link></li> */}
          </ul>
          <DiscordServerEmbed />
        </Container>
      </Layout>
    )
  }
}


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
