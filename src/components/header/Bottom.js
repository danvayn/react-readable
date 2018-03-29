import React from 'react';

import logo from '../../logo.svg';
import { NavLink } from 'react-router-dom';
import { Button, PageHeader, Grid, Row, Col } from 'react-bootstrap';
import PostSort from './postSort'

const Bottom = ({current, showSort}) => {
  return (
    <Row className="header-bottom">
      <Col xsHidden md={3} >
        <img src={logo} height="100px"/>
        <NavLink to={current ? '/r/'+current: current}>
          <span>{current ? current : "Readable"}</span>
        </NavLink>
      </Col>
      {showSort &&
        <Col xs={12} md={5}>
          <PostSort/>
        </Col>
      }
    </Row>
 );
}

export default Bottom;
