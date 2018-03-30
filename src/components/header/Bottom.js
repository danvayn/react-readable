import React from 'react';

import logo from '../../logo.svg';
import { NavLink } from 'react-router-dom';
import { Button, PageHeader, Grid, Row, Col } from 'react-bootstrap';
import PostSort from './postSort'

const Bottom = (props) => {
  const catDisplay = () => {
    if(props.current) {
      return (<NavLink to={'/r/'+ props.current}>
      {props.current}
    </NavLink>)
    } else {
      return (<NavLink to={'/'}>Readable</NavLink>)
    }
  }
  return (
    <Row className="header-bottom">
      <Col xsHidden md={3} >
        <img src={logo} height="100px"/>
        {/* <NavLink to={current ? '/r/'+current: current}>
      </NavLink>*/}
        {catDisplay()}
      </Col>
      {props.showSort &&
        <Col xs={12} md={5}>
          <PostSort/>
        </Col>
      }
    </Row>
 );
}

export default Bottom;
