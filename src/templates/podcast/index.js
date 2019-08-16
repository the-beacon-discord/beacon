import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/Layout";
import YouTube from "../../components/YouTube";
export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <h1><Link to="/podcast">The Signal</Link> - {frontmatter.title}</h1>
      <h2>{frontmatter.description}</h2>
      <p><i>{frontmatter.date}</i></p>
      {frontmatter.youtube && <YouTube id={frontmatter.youtube} />}
      <div dangerouslySetInnerHTML={{ __html: html }} />
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
        date(formatString: "Do MMMM YYYY")
        youtube
      }
    }
  }
`
