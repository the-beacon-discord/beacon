import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../../components/Layout';
import Container from '../../components/Container';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import MdxTableOfContents from '../../components/MdxTableOfContents';
import UpFolderButton from '../../components/UpFolderButton';
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
        <p><i>{frontmatter.date}</i></p>
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
      date(formatString: "Do MMMM YYYY")
    }
  }
}
`

export default Documentation;
