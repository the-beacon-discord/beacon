import { Link } from 'gatsby';
import React from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';
import Layout from '../components/layout';
import SEO from '../components/seo';

import one from '../images/parallax/1.png';
import two from '../images/parallax/2.png';
import three from '../images/parallax/3.png';
import four from '../images/parallax/4.png';

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
          children: <h1 style={{marginTop: '3em', color: '#fff'}}>The Beacon</h1>,
          amount: 0.01
        }
      ]}
      style={{
        height: '50vh',
        width: '100vw',
        marginLeft: '50%',
        transform: 'translateX(-50%)',
        imageRendering: 'crisp-edges',
        backgroundColor: '#222',
        textAlign: 'center'
      }}
    />
    <h1>Hi people</h1>
    <a href="https://discord.gg/TecBFcE">Join us on Discord</a>
    <h2>Who are we?</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et nunc justo. Ut bibendum vel magna sagittis luctus. Fusce pharetra, odio sit amet venenatis hendrerit, neque lectus convallis ipsum, vel posuere libero eros vitae justo. Phasellus eleifend nisl quis placerat lacinia. Donec pharetra maximus nulla sed condimentum. Fusce congue fermentum tortor quis malesuada. Cras nec elit dapibus, molestie diam id, lobortis ipsum. Duis vel suscipit arcu, non imperdiet lacus. Quisque a mi ac dui blandit consectetur. Mauris faucibus nisl eget lorem mollis consequat. Ut tincidunt quis libero eget tempus. Quisque nec lorem eget diam bibendum interdum. Nam sed neque lectus.

      Donec mollis nisi purus, in tristique lorem tempor in. Suspendisse potenti. Fusce iaculis purus nec tellus ullamcorper, non venenatis urna elementum. Aenean ultricies ligula nec felis consectetur, id volutpat ex lobortis. Ut cursus metus quis ante imperdiet, pulvinar tincidunt quam varius. Aenean ut urna vehicula velit congue fringilla. Fusce facilisis tristique leo, eu vestibulum libero ultrices eu. Morbi pharetra mollis est quis faucibus. Praesent nec nunc eu tellus commodo consequat ac tincidunt nulla. Morbi a aliquam felis. Vestibulum cursus eros quam. Sed euismod pretium lacus, sed tincidunt ligula auctor non. Nullam eu nisi massa. Donec sodales arcu ut pellentesque iaculis. Aenean a convallis nunc, sed mollis augue.

      Curabitur turpis justo, luctus vitae sem ut, varius pretium felis. Vivamus neque metus, lobortis eu lacinia ac, laoreet sit amet ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam vulputate turpis nisl, at tempor ligula aliquam sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam condimentum ipsum non odio pharetra, vitae placerat eros pellentesque. Sed elementum sed ante ac facilisis. Morbi sed lobortis elit, ut varius tellus. Phasellus at vulputate nunc.

      Vestibulum non nunc accumsan, tristique ligula id, luctus leo. Praesent viverra, nisl sit amet euismod iaculis, mi felis efficitur neque, sed imperdiet neque ante vitae ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque in urna et ante mollis imperdiet sed non enim. Morbi eu nisi sed risus ullamcorper convallis vel at nunc. Nullam vitae eros eu dui sagittis tempor. Fusce auctor lorem non ultrices facilisis. Vestibulum feugiat enim congue ex posuere, quis feugiat augue ultricies. Curabitur dignissim aliquam ex, nec tincidunt ligula dignissim a. Donec pulvinar magna vel lorem euismod, eu consequat ex luctus. Pellentesque commodo scelerisque nisi suscipit pulvinar. Integer faucibus, lorem et dapibus ultrices, lectus purus hendrerit lorem, id auctor eros nibh id ligula.

      Aenean maximus libero sed arcu tincidunt, id congue quam rutrum. Vestibulum quis elit mi. Quisque mollis erat eu est pharetra, ac auctor massa mattis. Sed eleifend gravida enim ut tempus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras molestie mattis turpis id gravida. Morbi non dolor laoreet nibh iaculis commodo. Aenean eu euismod felis, scelerisque suscipit nunc. Duis tempus neque at ligula rutrum pellentesque. Nulla pretium tincidunt finibus. Suspendisse tempus maximus purus sed tincidunt. Sed nec congue mauris. Aliquam turpis purus, venenatis at libero in, convallis consequat diam. 
    </p>
    <h2>Software</h2>
    <Link to="/loonawheel">Loona Wheel</Link>
  </Layout>
)

export default IndexPage
