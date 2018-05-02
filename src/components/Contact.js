import React, { Component } from 'react';
import { Container, Button, Form } from 'semantic-ui-react';
import { Fade } from 'react-reveal';
import axios from 'axios';

import LazyLoad from 'react-lazyload';
import bg from '../images/banner.jpg';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      name: '',
      email: '',
      message: ''
    };
  }

  componentDidMount() {
    let dataURL = `${process.env.REACT_APP_API_URL}/wp/v2/pages/53`;

    fetch(dataURL)
      .then(res => res.json())
      .then(res => {
        this.setState({
          content: res.content.rendered
        });
      });
  }

  // onChange = e => {
  //   const state = this.state;
  //   state[e.target.name] = e.target.value;
  //   this.setState(state);
  // };
  //
  // handleSubmit = e => {
  //   e.preventDefault();
  //   const { name, email, message } = this.state;
  // };

  render() {
    const { content } = this.state;
    return (
      <div>
        <LazyLoad>
          <div style={styles.hero} className="hero-image" />
        </LazyLoad>
        <Container text className="wrapper">
          <Fade>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </Fade>
        </Container>
      </div>
    );
  }
}

const styles = {
  hero: {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    height: '100vh',
    width: '100%',
    opacity: '0.5',
    top: '0',
    zIndex: '-1',
    position: 'absolute'
  }
};

export default Contact;
