import React from 'react';

import logo from '../../logo.svg';
import { NavLink } from 'react-router-dom';
import { Button, PageHeader, Grid, Row, Col } from 'react-bootstrap';
import PostSort from './postSort'
import Modal from '../modal'

const Bottom = (props) => {
  const catDisplay = () => {
    if(props.current) {
      return (<NavLink to={'/'+ props.current}>
      {props.current}
    </NavLink>)
    } else {
      return (<NavLink to={'/'}>Readable</NavLink>)
    }
  }
  return (
    <Row className="header-bottom">
      <Col xsHidden sm={3} md={2} >
        <img src={logo} height="50px"/>
        {catDisplay()}
      </Col>
      {props.showSort &&
        <Col xs={12} sm={9} md={10}>
          <PostSort/>
        </Col>
      }
    </Row>
 );
}

export default Bottom;
