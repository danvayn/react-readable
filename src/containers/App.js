import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import logo from '../logo.svg';
import '../App.css';

import RootPageView from '../views/root'
import CategoryView from '../views/category'
import PostView from '../views/post'
import SubmitPost from './SubmitPost'

import { fetchCategories } from '../actions/category';
import { fetchPostsIfNeeded } from '../actions/post';
import Header from '../containers/Header'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends Component {
  componentWillMount() {
    this.props.getCategories();
    this.props.getPosts();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={RootPageView} />
          <Route path="/r/:categoryName" component={CategoryView} />
          <Route path="/post/:postID" component={PostView} />
          <Route path="/submit/:categoryName" component={SubmitPost} />
        </Switch>
      </Router>
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
});

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

let AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
