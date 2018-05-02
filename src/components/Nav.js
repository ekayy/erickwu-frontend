import React from 'react';

const navLinks = ['About', 'Work', 'Contact'];

const Nav = () => {
  let links = navLinks.map(navLink => {
    return (
      <li className="Nav__ListItem">
        <a>{navLink}</a>
      </li>
    );
  });

  return <ul className="Nav">{links}</ul>;
};

export default Nav;
