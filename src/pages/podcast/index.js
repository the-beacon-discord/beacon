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
          <iframe src="https://open.spotify.com/embed-podcast/show/1FXgwfkfQUVDw0E9eKtUKj" width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          <h2>All Episodes</h2>
          <table>
            <thead>
              <tr>
                <td>
                  Episode
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
                    <td style={{whiteSpace: 'nowrap'}}>
                      {page.frontmatter.episode}
                      {page.frontmatter.episodeType === 'bonus' && ' (Bonus)'}
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
    sort: { order: DESC, fields: [frontmatter___created] }
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
          episode
          episodeType
          explicit
        }
      }
    }
  }
}
`

export default Podcast
