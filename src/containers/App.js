import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import logo from '../logo.svg';
import '../App.css';

import RootPageContainer from './RootPageView'
import CategoryContainer from './CategoryView'

import { fetchCategories } from '../actions/category';
import { fetchPostsIfNeeded } from '../actions/post';


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
          <Route exact path="/" component={RootPageContainer} />
          <Route path="/category/:categoryName" component={CategoryContainer} />
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

let AppContainer = connect(null, mapDispatchToProps)(App);

export default AppContainer;
