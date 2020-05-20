import { graphql, Link } from 'gatsby';
import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Container from '../../components/Container';

import styles from './index.module.scss';

class Documentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'all'
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      category: e.target.value
    })
  }
  render() {
    const uniqueCategories = [];
    this.props.data.allMdx.edges.forEach((edge) => {
      if (edge.node.frontmatter.category && !uniqueCategories.includes(edge.node.frontmatter.category)) uniqueCategories.push(edge.node.frontmatter.category);
    })
    return (
      <Layout>
        <Container>
          <h1>The Beacon Wiki</h1>
          <p>
            Welcome to The Beacon Wiki!<br />
            Get useful information about the server, and tips on Discord as a whole.
          </p>
          <select className={styles.select} onChange={this.handleChange}>
            <option value="all">All Categories</option>
            {uniqueCategories.map(category => <option key={category} value={category}>{category}</option>)}
          </select>
          <div className={styles.gridContainer}>
            {this.props.data.allMdx.edges
              .filter(edge => !edge.node.frontmatter.hidden)
              .filter(edge => this.state.category === 'all' || this.state.category === edge.node.frontmatter.category)
              .sort((a, b) => a.node.frontmatter.date - b.node.frontmatter.date)
              .map((edge) => {
                const page = edge.node;
                return (
                  <div className={styles.card} key={page.fields.slug}>
                    <h3 className={styles.title}>{page.frontmatter.title}</h3>
                    <p className={styles.description}>{page.frontmatter.description}</p>
                    <p className={styles.read}>
                      <Link to={page.fields.slug}>Read &gt;</Link>
                    </p>
                  </div>
                )
              })
            }
          </div>
        </Container>
      </Layout>
    )
  }
}

export const query = graphql`
query documentationList {
  allMdx(
    filter:{fields:{template:{eq: "docs"}}}
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
          category
          hidden
          date(formatString: "Do MMMM YYYY")
        }
      }
    }
  }
}
`

export default Documentation
