import React from 'react';
import PropTypes from 'prop-types';
import { Button, Panel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Sidebar = ({category, children}) => {
  const button = category ? (
    <LinkContainer to={`/${category}/submit`}>
      <Button bsStyle="primary">Submit post to {category}</Button>
    </LinkContainer>) : (
    <LinkContainer to={'/submit/'}>
      <Button bsStyle="primary">Submit post</Button>
    </LinkContainer>
  )

return (
  <Panel id="sidebar" defaultExpanded>
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
)};

Sidebar.propTypes = {
  category: PropTypes.string,
}

export default Sidebar;
