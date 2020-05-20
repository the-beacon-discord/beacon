import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../../components/Layout';
import YouTube from '../../components/YouTube';
import Container from '../../components/Container';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import SEO from '../../components/SEO';

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { mdx } = data // data.mdx holds our post data
  const { frontmatter, body, fields } = mdx
  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
      />
      <Container>
        <h1><Link to="/podcast">The Signal</Link> - {frontmatter.title}</h1>
        <h2>{frontmatter.description}</h2>
        <p><i>{frontmatter.created}</i></p>
        {frontmatter.youtube && <YouTube id={frontmatter.youtube} />}
        <noscript>
          <audio controls>
            <source src={`${fields.slug}podcast.mp3`} />
          </audio>
        </noscript>
        <MDXRenderer>{body}</MDXRenderer>
      </Container>
    </Layout>
  )
}
export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      fields {
        slug
      }
      frontmatter {
        title
        description
        created(formatString: "Do MMMM YYYY")
        youtube
      }
    }
  }
`
