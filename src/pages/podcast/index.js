import { graphql, Link } from 'gatsby';
import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Container from '../../components/Container';

class Podcast extends Component {
  render() {
    return (
      <Layout>
        <Container>
          <h1>The Signal</h1>
          <table>
            <thead>
              <tr>
                <td>
                  Date
                </td>
                <td>
                  Name
                </td>
                <td>
                  Description
                </td>
              </tr>
            </thead>
            <tbody>
              {this.props.data.allMdx.edges.map((edge) => {
                const page = edge.node;
                return (
                  <tr key={page.fields.slug}>
                    <td>
                      {page.frontmatter.date}
                    </td>
                    <td>
                      <Link to={page.fields.slug}>{page.frontmatter.title}</Link>
                    </td>
                    <td>
                      {page.frontmatter.description}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Container>
      </Layout>
    )
  }
}

export const query = graphql`
query podcastList {
  allMdx(
    filter:{fields:{template:{eq: "podcast"}}}
    sort: { order: DESC, fields: [frontmatter___date] }
  ) {
    edges {
      node {
        fields {
          template
          slug
        }
        frontmatter {
          title
          description
          date(formatString: "Do MMMM YYYY")
          explicit
        }
      }
    }
  }
}
`

export default Podcast
