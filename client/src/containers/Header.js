import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CategoryBar from '../components/header/categoryBar';
import HeaderBottom from '../components/header/Bottom';

const HeaderBar = ({categories, currentCategory, showSort}) => {
return (
    <Grid fluid className="header-bar">
      <Row>
        <Col className="remove-col-padding" xs={12}>
          <CategoryBar
            categories={categories}
          />
        </Col>
      </Row>
      <HeaderBottom
          current={currentCategory}
          showSort={showSort}
          />
    </Grid>
  )
}

HeaderBar.propTypes = {
  categories: PropTypes.array.isRequired,
  currentCategory: PropTypes.string.isRequired,
  showSort: PropTypes.bool.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories.list,
    currentCategory: ownProps.currentCategory || '',
    showSort: ownProps.showSort,
    currentUser: state.users.username
  }
}

export default connect(mapStateToProps, null, null, { pure: false })(HeaderBar)
