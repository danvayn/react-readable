import CategoryBar from '../components/header/categoryBar';
import HeaderBottom from '../components/header/Bottom';
import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Modal from '../components/modal'
import {updateUser} from '../actions/vote'


const HeaderBar = ({currentUser,changeUser, categories, currentCategory, showSort}) => {
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

          <div className="pull-right user-control">
              <span>Current user: {currentUser}</span>
              <Modal
                onSubmit={changeUser}
                displayText={"Change user"}
                title={"Change username"}
                placeholder={currentUser}
              />
          </div>
    </Grid>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeUser: (form) => dispatch(updateUser(form.body)),
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories.list,
    currentCategory: ownProps.currentCategory || '',
    showSort: ownProps.showSort,
    currentUser: state.user.username
  }
}
let Header = connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(HeaderBar)
export default Header
