import CategoryBar from '../components/header/categoryBar';
import HeaderBottom from '../components/header/Bottom';
import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
const HeaderBar = ({categories, currentCategory, showSort}) => {
return (
    <Grid fluid className="header-bar">
      <Row>
        <Col xs={12}>
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
const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories.list,
    currentCategory: ownProps.currentCategory || '',
    showSort: ownProps.showSort
  }
}
let Header = connect(mapStateToProps, null, null, { pure: false })(HeaderBar)
export default Header
