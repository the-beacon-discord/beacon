import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout';
import Container from '../../components/Container';
import { MDXRenderer } from 'gatsby-plugin-mdx';

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { mdx } = data // data.mdx holds our post data
  const { frontmatter, body } = mdx
  return (
    <Layout>
      <Container>
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.description}</h2>
        <MDXRenderer>{body}</MDXRenderer>
      </Container>
    </Layout>
  )
}
export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        description
      }
    }
  }
`
