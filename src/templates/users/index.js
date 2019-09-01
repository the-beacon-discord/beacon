import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/Layout";
import Container from "../../components/Container";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <Container>
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.description}</h2>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    </Layout>
  )
}
export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
      }
    }
  }
`
