import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import '../App.css';

import { fetchCategories } from '../actions/category';
import { fetchPostsIfNeeded } from '../actions/post';
import { updateUser } from '../actions/vote'

import Modal from '../components/modal'
import RootPageView from '../views/root'
import CategoryRouter from './Category'
import PostView from './Post'
import SubmitPost from './Submit'
import NoMatch  from '../views/NotFound'

class App extends Component {
  componentWillMount() {
    this.props.getCategories();
    this.props.getPosts();
  }

  render() {
    const {currentUser, changeUser} = this.props
    return (
      <div className="readable-app">
      <Router>
        <Switch>
          <Route exact path="/" component={RootPageView} />
          <Route path="/:categoryName" component={CategoryRouter} />
          <Route path="/post/:postID" component={PostView} />
          <Route exact path="/submit" component={SubmitPost} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
      <div className="user-control">
          <span>Current user: {currentUser}</span>
          <Modal
            onSubmit={changeUser}
            displayText={"Change user"}
            title={"Change username"}
            placeholder={currentUser}
          />
      </div>
    </div>
    );
  }
}

App.propTypes = {
  getCategories: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(fetchCategories()),
  getPosts: () => dispatch(fetchPostsIfNeeded()),
  changeUser: (form) => dispatch(updateUser(form.body)),
});

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.username
  }
}

let AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
