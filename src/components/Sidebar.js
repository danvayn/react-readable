import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Panel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

//notes: this is not really a container, extract the view to components

const Sidebar = ({category, children}) => {
  const button = category ? (
    //note: i know this is a little weird but this is incase i wanted to disable the button

      <LinkContainer to={"/submit/" + category}>
    <Button bsStyle="primary">Submit post to {category}</Button>

    </LinkContainer>
  ) : (
  <LinkContainer to={"/submit/"}>
    <Button bsStyle="primary">Submit post</Button>
  </LinkContainer>
  )

 return (
   <Panel className="sidebar" defaultExpanded>
     <Panel.Heading>
       <Panel.Title>
         {button}
       </Panel.Title>
     </Panel.Heading>
     <Panel.Collapse>
     <Panel.Body>
       {children}
     </Panel.Body>
    </Panel.Collapse>
   </Panel>
 );};
 export default Sidebar;
