import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Panel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const SidebarContainer = ({category=false, body="placeholder"}) => {

 return (

   <Panel className="sidebar" defaultExpanded>
     <Panel.Heading>
       <Panel.Title>
         <LinkContainer to={"/submit/" + category}>
           <Button bsStyle="primary">Submit post to {category}</Button>
         </LinkContainer>
       </Panel.Title>
     </Panel.Heading>
     <Panel.Collapse>
     <Panel.Body>
       {body}
     </Panel.Body>
    </Panel.Collapse>
   </Panel>
 );};
 export default SidebarContainer;
