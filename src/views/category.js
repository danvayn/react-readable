import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../App.css';
// import { Route, Switch } from 'react-router-dom';
// import PostPageContainer from './post'

import Header from '../containers/Header'
import PostList from '../components/PostList'
import Sidebar from '../containers/Sidebar'
import { Grid, Row, Col } from 'react-bootstrap';

 const CategoryPageContainer = ({category, posts}) => {
  return (
    <div className="page category">

      <Header showSort={true} currentCategory={category}/>

        <Grid>
          <Row>
            <Col xs={12} md={8}>
            <PostList posts={posts}/>
            </Col>
            <Col xs={12} md={4}>
      <Sidebar category={category} body={"This is where a category would have a body if it was part of the API request"}/>
      </Col>
    </Row>
  </Grid>
  </div>
  );};

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
