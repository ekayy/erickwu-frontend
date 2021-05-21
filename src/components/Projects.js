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
      projects: [],
      tags: [],
      headline: '',
    };
  }

  componentDidMount() {
    let dataURL = `${process.env.REACT_APP_API_URL}/wp/v2/projects?per_page=50`;

    fetch(dataURL)
      .then(res => res.json())
      .then(res => {
        this.setState({
          projects: res,
        });
      });

    let tagsList = `${process.env.REACT_APP_API_URL}/wp/v2/tags?per_page=50`;

    fetch(tagsList)
      .then(res => res.json())
      .then(res => {
        this.setState({
          tags: res,
        });
      });

    let pageUrl = `${process.env.REACT_APP_API_URL}/wp/v2/pages/157`;

    fetch(pageUrl)
      .then(res => res.json())
      .then(res => {
        this.setState({
          headline: res.content.rendered,
        });
      });
  }

  componentWillUnmount() {}

  parseTitle(val) {
    return val.split(' ').join('-').toLowerCase();
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

  renderTags(tagIds) {
    const projectTags = this.state.tags.filter(
      tag => tagIds.indexOf(tag.id) !== -1
    );

    const tagNames = projectTags.map(projectTag => projectTag.name);

    return (
      <ul className="project__tags">
        {tagNames.sort().map(tagName => {
          return (
            <li className="project__tag" key={tagName}>
              {tagName}
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    let projects = chunk(this.state.projects, 1);
    console.log(this.state.headline);

    projects = projects.map((section, index) => {
      return (
        <div className="project-row" key={index}>
          {section.map((project, index) => {
            return (
              <div
                key={index}
                className={`${this.parseTitle(project.title.rendered)} project`}
                style={{ backgroundColor: project.acf.background_color }}
              >
                {/* <LazyLoad height={300}> */}
                <Image src={project.better_featured_image.source_url} />
                {/* </LazyLoad> */}
                <Container className="project-text" fluid>
                  {this.renderTags(project.tags)}

                  <Header as="h2" textAlign="center" style={{ color: '#fff' }}>
                    {project.title.rendered}
                  </Header>
                  <div style={{ textAlign: 'center' }}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: project.content.rendered,
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
        <div style={styles.bg} className="bg"></div>
        <div style={styles.hero} className="hero-image" />

        <Container textAlign="center" className="hero" text>
          <Fade left>
            <Header as="h1" textAlign="center">
              <div
                className="headline"
                dangerouslySetInnerHTML={{
                  __html: this.state.headline,
                }}
              />
            </Header>
            {/* <Button
              as={Link}
              to="projects"
              spy={true}
              smooth={true}
              duration={500}
              style={styles.button}
            >
              View my work
            </Button> */}
          </Fade>
        </Container>

        <div
          id="projects"
          className={this.props.isListLayout ? 'list' : 'grid'}
        >
          {projects}
        </div>
      </div>
    );
  }
}

const styles = {
  bg: {
    backgroundImage: `url(${bg})`,
  },

  hero: {
    // backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    position: 'relative',
    height: '60vh',
    width: '100%',
    opacity: '0.5',
    marginTop: '-150px',
    zIndex: '-1',
  },
  button: {},
};

export default Projects;
