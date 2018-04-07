import React from 'react'
import { Grid, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const NoMatch = ({ location }) => (
  <Grid className="content-container">
    <Row>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </Row>
  <Row>
  <h3>
    <NavLink to="/">Click here to go back to the main page</NavLink>
  </h3>
  </Row>
  </Grid>
);

NoMatch.propTypes = {
  location: PropTypes.object.isRequired,
}

export default NoMatch
