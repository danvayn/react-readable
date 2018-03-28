import React from 'react';

import logo from '../../logo.svg';
import { NavLink } from 'react-router-dom';
import { Button, PageHeader, Grid, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PostSort from './postSort'

const Bottom = ({current, showSort}) => {
  return (
    <Row className="header-bottom">
      <Col xsHidden md={3} >
        <img src={logo} height="100px"/>
        <LinkContainer to={current ? '/r/'+current: current}>
          <Button>{current ? current : "Readable"}</Button>
        </LinkContainer>
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
