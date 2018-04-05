import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../App.css';

import Header from '../containers/Header'
import PostList from '../components/PostList'
import Sidebar from '../components/Sidebar'
import { Grid, Row, Col } from 'react-bootstrap';

//refactor to be full react component and then componentwillmount if category not found redirect to 404

 const CategoryPageContainer = ({category, posts}) => {
   const genericBody = (
     <div>
     <Row>{category+' is a subreddit on readable.'}</Row>
     <Row>{category+' is great.'}</Row>
     <Row>{'Dont you love visiting /r/'+category+'?'}</Row>
     </div>
   )

  return (
    <div className="page category">

      <Header showSort={true} currentCategory={category}/>

        <Grid fluid className="content-container">
          <Row>
            <Col xs={12} md={8}>
            <PostList posts={posts}/>
            </Col>
            <Col xs={12} md={4}>
      <Sidebar category={category}>
        {genericBody}
      </Sidebar>
      </Col>
    </Row>
  </Grid>
  </div>
  );};

const mapStateToProps = (state, ownProps) => {
  let currentCategory = ownProps.match.params.categoryName
  return {
    category: currentCategory,
    posts: state.posts.list.filter(post => post.category === currentCategory)
  }
}

const mapDispatchToProps = dispatch => ({

});

let CategoryView = connect(mapStateToProps, mapDispatchToProps)(CategoryPageContainer);
export default CategoryView;
