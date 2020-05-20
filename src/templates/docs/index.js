import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import Container from '../../components/Container';
import Layout from '../../components/Layout';
import MdxTableOfContents from '../../components/MdxTableOfContents';
import SEO from '../../components/SEO';

const Documentation = ({
  data, // this prop will be injected by the GraphQL query below.
}) => {
  const { mdx } = data // data.mdx holds our post data
  const { frontmatter, body, headings } = mdx
  return (
    <Layout>
      <Container>
        <SEO
          title={frontmatter.title}
          description={frontmatter.description}
        />
        <p>
          <Link to="/docs">Back to Docs</Link>
        </p>
        <h1>{frontmatter.title}</h1>
        {frontmatter.created && <p><i>Created {frontmatter.created}</i></p>}
        {frontmatter.edited && <p><i>Last Edited {frontmatter.edited}</i></p>}
        <p>{frontmatter.description}</p>
        {headings.length > 1 &&
          <MdxTableOfContents headings={headings} />
        }
        <MDXRenderer>{body}</MDXRenderer>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
query($slug: String!) {
  mdx(fields: { slug: { eq: $slug } }) {
    body
    headings {
      depth
      value
    }
    frontmatter {
      title
      description
      created(formatString: "Do MMMM YYYY")
      edited(formatString: "Do MMMM YYYY")
    }
  }
}
`

export default Documentation;
