import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link
} from 'react-router-dom';
import bg from './images/3px-tile.png';
import { Menu } from 'semantic-ui-react';

import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';

import { Fade } from 'react-reveal';

class App extends Component {
  render() {
    return (
      <Router>
        <div style={styles.bg}>
          <div style={{ minHeight: '100vh' }} className="main-container">
            <Menu
              size="massive"
              borderless
              style={{
                background: 'transparent',
                boxShadow: 'none',
                border: 'none'
              }}
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
              </Menu.Menu>
            </Menu>

            <div>
              <Route path="/" exact component={Projects} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
            </div>
          </div>

          <div>
            <Menu
              size="massive"
              attached="bottom"
              borderless
              style={{ background: 'transparent' }}
              className="footer"
            >
              <Menu.Item to="/">&copy; 2018 erickwu</Menu.Item>
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
