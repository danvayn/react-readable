import CategoryBar from '../components/header/categoryBar';
import HeaderBottom from '../components/header/Bottom';
import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Modal from '../components/modal'
import {updateUser} from '../actions/user'


const HeaderBar = ({currentUser,changeUser, categories, currentCategory, showSort}) => {
return (
    <Grid fluid className="header-bar">
      <Row>
        <Col xs={12}>
          <CategoryBar
            categories={categories}
          />
          <div className="pull-right">
              <Modal
                onSubmit={changeUser}
                displayText={"Change user"}
                title={"Change username"}
                placeholder={currentUser}
              />
          </div>
        </Col>
      </Row>
      <HeaderBottom
          current={currentCategory}
          showSort={showSort}
          />
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
