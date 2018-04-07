
import { Tabs, Tab } from 'react-bootstrap';
import PropTypes from 'prop-types'
import React from 'react'

const TabContainer = (props) => {
  return (
    <div className={`sort-tabs ${props.id}-container`}>
    <span>Sort by</span>
    <Tabs
      activeKey={props.activeKey}
      onSelect={props.onSelect}
      id={props.id}>
      <Tab eventKey={1} title="best"/>
      <Tab eventKey={2} title="worst"/>
      <Tab eventKey={3} title="new"/>
      <Tab eventKey={4} title="old">
      </Tab>
    </Tabs>
  </div>
  )
}

TabContainer.propTypes = {
  id: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  activeKey: PropTypes.number.isRequired
}


export default TabContainer
