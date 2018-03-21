import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import logo from '../logo.svg';
import '../App.css';

import { Route, Switch } from 'react-router-dom';

import Header from './Header'
import PostList from '../components/PostList'

const CategoryPageContainer = ({category, posts}) => {
  console.log(posts)
 return (
   <div className="page category">
     <Header/>
     <PostList posts={posts}/>
   </div>
 );};

 const CategoryRoutingContainer = () => {
  <Switch>
    <Route exact path="/:categoryUrl" component={CategoryPageContainer} />
      {
        //<Routepath="/:categoryUrl/:postId/:postSlug" component=PostPageContainer/>
      }
  </Switch>

 };

const mapStateToProps = (state, ownProps) => {
  const currentCategory = ownProps.match.params.categoryName
  return {
    category: ownProps.match.params.categoryName,
    posts: state.posts.list.filter(post => post.category === currentCategory)
  }
}

const mapDispatchToProps = dispatch => ({

});

let CategoryView = connect(mapStateToProps, mapDispatchToProps)(CategoryPageContainer);
export default CategoryView;
