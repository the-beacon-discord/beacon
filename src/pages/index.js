import { Link } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO />
    <h1>Hi people</h1>
    <Link to="/loonawheel">Loona Wheel</Link>
  </Layout>
)

export default IndexPage
