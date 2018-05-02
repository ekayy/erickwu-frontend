import React, { Component } from 'react';
import { Container, Header, Image, Button } from 'semantic-ui-react';

import './styles/projects.css';
import bg from '../images/banner.jpg';
import chunk from 'lodash/chunk';

import LazyLoad from 'react-lazyload';
import { Fade } from 'react-reveal';
import { Link } from 'react-scroll';

class Projects extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    let dataURL = `${process.env.REACT_APP_API_URL}/wp/v2/projects?per_page=15`;

    fetch(dataURL)
      .then(res => res.json())
      .then(res => {
        this.setState({
          projects: res
        });
      });
  }

  componentWillUnmount() {}

  parseTitle(val) {
    return val
      .split(' ')
      .join('-')
      .toLowerCase();
  }

  renderButton(href) {
    if (href) {
      return (
        <Button inverted target="_blank" href={href}>
          Visit
        </Button>
      );
    }
  }

  render() {
    let projects = chunk(this.state.projects, 1);

    projects = projects.map((section, index) => {
      return (
        <div className="project-row" key={index}>
          {section.map((project, index) => {
            return (
              <div
                key={index}
                className={`${this.parseTitle(project.title.rendered)} project`}
              >
                <Image src={project.better_featured_image.source_url} />
                <Container className="project-text" fluid>
                  <Header as="h2" textAlign="center" style={{ color: '#fff' }}>
                    {project.title.rendered}
                  </Header>
                  <div style={{ textAlign: 'center' }}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: project.content.rendered
                      }}
                      className="text"
                    />
                    {this.renderButton(project.acf.link)}
                  </div>
                </Container>
              </div>
            );
          })}
        </div>
      );
    });

    return (
      <div>
        <div style={styles.hero} className="hero-image" />

        <Container textAlign="center" className="hero" text>
          <Fade left>
            <Header as="h1" textAlign="center">
              I am a web developer based in Los Angeles.
            </Header>
            <Button
              as={Link}
              to="projects"
              spy={true}
              smooth={true}
              duration={500}
              style={styles.button}
            >
              View my work
            </Button>
          </Fade>
        </Container>

        <div id="projects">{projects}</div>
      </div>
    );
  }
}

const styles = {
  hero: {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    position: 'relative',
    height: '100vh',
    width: '100%',
    opacity: '0.5',
    marginTop: '-177px',
    zIndex: '-1'
  },
  button: {}
};

export default Projects;
