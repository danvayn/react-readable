import logo from '../logo.svg';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

//TODO: add category filter click event when category is clciked, and also handle that click from the router
//https://reactjs.org/docs/handling-events.html

const HeaderBar = (categories, handler) => {
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
    <Nav>
      { categories && categories.categories.map((category, index) => (
        <LinkContainer key={index} to={`/category/${category.path}/`}>
            <NavItem>
              {category.name}
            </NavItem>
        </LinkContainer>
      ))}
      {//  <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">}
      //  <MenuItem eventKey={3.1}>Action</MenuItem>//*}
      //  <MenuItem eventKey={3.2}>Another action</MenuItem>//*}
      //  <MenuItem eventKey={3.3}>Something else here</MenuItem>//*}
      //  <MenuItem eventKey={3.4}>Separated link</MenuItem>//*}
      //</NavDropdown>
      }
    </Nav>
  </Navbar>
);
}
export default HeaderBar
