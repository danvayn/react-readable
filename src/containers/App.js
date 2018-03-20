import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import logo from '../logo.svg';
import '../App.css';

import Header from './Header'
import PostList from './PostList'

import { fetchCategories } from '../actions/category';
import { fetchPostsIfNeeded } from '../actions/post';

class App extends Component {
  componentWillMount() {
    this.props.getCategories();
    this.props.getPosts();
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <PostList/>
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
});

let AppContainer = connect(null, mapDispatchToProps)(App);

export default AppContainer;
