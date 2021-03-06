import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';
// import bg from './images/3px-tile.png';
import { Menu, Button, Icon } from 'semantic-ui-react';

import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';

class App extends Component {
  state = {
    isListLayout: false
  };

  render() {
    const currentYear = new Date().getFullYear();
    const { isListLayout } = this.state;

    return (
      <Router>
        <div style={styles.bg}>
          <div style={{ minHeight: '100vh' }} className="main-container">
            <Menu
              size="massive"
              borderless
              style={{
                boxShadow: 'none',
                border: 'none',
                position: 'fixed',
                // backgroundColor:'transparent',
                margin: 0,
                zIndex: 10,
                top: 0
              }}
              inverted
              className="header"
            >
              <Menu.Item as={Link} to="/">
                erickwu
              </Menu.Item>
              <Menu.Menu position="right">
                <Menu.Item as={NavLink} to="/" exact>
                  Work
                </Menu.Item>
                <Menu.Item as={NavLink} to="/about">
                  About
                </Menu.Item>
                <Menu.Item as={NavLink} to="/contact">
                  Contact
                </Menu.Item>

                <Menu.Item>
                  <Button
                    icon
                    basic
                    color=""
                    onClick={() => this.setState({ isListLayout: true })}
                    active={isListLayout}
                    inverted
                  >
                    <Icon name="list layout" />
                  </Button>
                  <Button
                    icon
                    basic
                    onClick={() => this.setState({ isListLayout: false })}
                    active={!isListLayout}
                    inverted
                  >
                    <Icon name="block layout" />
                  </Button>
                </Menu.Item>
              </Menu.Menu>
            </Menu>

            <div>
              <Route
                path="/"
                exact
                render={props => <Projects {...props} isListLayout={isListLayout} />}
              />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
            </div>
          </div>

          <div>
            <Menu size="massive" attached="bottom" borderless inverted className="footer">
              <Menu.Item to="/">&copy; {currentYear} erickwu</Menu.Item>
              <Menu.Menu position="right">
                <Menu.Item as={NavLink} to="/about">
                  About
                </Menu.Item>
                <Menu.Item as={NavLink} to="/contact">
                  Contact
                </Menu.Item>
              </Menu.Menu>
            </Menu>
          </div>
        </div>
      </Router>
    );
  }
}

const styles = {
  bg: {
    backgroundRepeat: 'repeat',
    height: '100%'
  }
};

export default App;
