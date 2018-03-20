import logo from '../logo.svg';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

//TODO: add category filter click event when category is clciked, and also handle that click from the router
//https://reactjs.org/docs/handling-events.html

const HeaderBar = (categories) => {
  // handeClick(e) {
  //   e.preventDefault();
  //   console.log('Link Clicked');
  // }
return (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <img src="" className="" alt="logo" />
        <NavLink exact to="/" activeClassName="selected">
          Readable
        </NavLink>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav activeKey={1}
      onSelect={key => this.handleSelect(key)}>
      { categories && categories.categories.map((category, index) => (
        <NavItem to="/"
          className="tab" key={index} href={`/${category.path}`}>
          {category.name}
        </NavItem>
      ))}
        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem eventKey={3.4}>Separated link</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar>
);
}
export default HeaderBar
