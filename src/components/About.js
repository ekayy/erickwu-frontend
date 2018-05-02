import React, { Component } from 'react';
import { Container, Image } from 'semantic-ui-react';
import { Fade } from 'react-reveal';

import LazyLoad from 'react-lazyload';
import bg from '../images/banner.jpg';
import artwork from '../images/revolution-artwork.jpg';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  componentDidMount() {
    let dataURL = `${process.env.REACT_APP_API_URL}/wp/v2/pages/56`;

    fetch(dataURL)
      .then(res => res.json())
      .then(res => {
        this.setState({
          content: res.content.rendered
        });
      });
  }

  render() {
    const { content } = this.state;

    return (
      <div>
        <LazyLoad height={300}>
          <div style={styles.hero} className="hero-image" />
        </LazyLoad>
        <Container className="wrapper" text>
          <Fade>
            <Image src={artwork} style={styles.image} className="about-image" />
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
  },
  image: {
    width: '300px',
    margin: '0 auto'
  }
};

export default About;
