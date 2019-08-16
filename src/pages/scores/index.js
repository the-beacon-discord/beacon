import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Container from '../../components/Container';

class Podcast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: {
        Ab: 0,
        Bargot: 0,
        Neutral: 0,
      },
      message: '',
      error: false
    }
  }
  componentDidMount() {
    fetch('/.netlify/functions/scores')
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          this.setState({
            message: `An unexpected HTTP error code ${res.status} was encountered.`,
            error: true
          })
        }
      })
      .then((res) => {
        this.setState({
          scores: {
            Ab: res.Ab,
            Bargot: res.Bargot,
            Neutral: res.Neutral
          }
        })

        if (res.Ab > res.Bargot) {
          this.setState({
            message: 'Looks like Bargot needs some help.'
          })
        } else if (res.Bargot > res.Ab) {
          this.setState({
            message: 'Looks like Ab is losing'
          })
        }
      })
      .catch((err) => {
        this.setState({
          message: err.message,
          error: true
        })
      })
  }
  render() {
    return (
      <Layout>
        <Container>
          <h1>Scores{this.state.error ? ' :(' : '!'}</h1>
          <p>{this.state.message}</p>
          <table>
            <thead>
              <tr>
                <td>
                </td>
                {Object.keys(this.state.scores).map(heading => <td key={heading}>{heading}</td>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Messages
                </td>
                {Object.entries(this.state.scores).map(row => <td key={row[0]}>{row[1]}</td>)}
              </tr>
              <tr>
                <td>
                  Message Score<br />
                  (3 Points per 100 messages)
                </td>
                {Object.entries(this.state.scores).map(row => <td key={row[0]}>{Math.floor((row[1]/100)*3)}</td>)}
              </tr>
            </tbody>
          </table>
        </Container>
      </Layout>
    )
  }
}

export default Podcast
