import React, { Component } from 'react';
import { Segment, Image } from 'semantic-ui-react';

class Music extends Component {
  constructor() {
    super();
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    let dataURL = 'http://erickwu.dev/wp-json/wp/v2/pages/2';
    fetch(dataURL)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res
        });
      });
  }

  render() {
    console.log(this.state.data);
    return (
      <Segment style={{ padding: '2em 0em' }} vertical>
        <h2>erickwu</h2>
      </Segment>
    );
  }
}

export default Music;
