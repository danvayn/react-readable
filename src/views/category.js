import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../App.css';

import Header from '../containers/Header'
import PostList from '../components/PostList'
import Sidebar from '../components/Sidebar'
import { Grid, Row, Col } from 'react-bootstrap';

 const CategoryPageContainer = ({category, posts}) => {
   const genericBody = (
     <Grid flexible>
     <Row>{category+' is a subreddit on readable.'}</Row>
     <Row>{category+' is great.'}</Row>
     <Row>{'Dont you love visiting /r/'+category+'?'}</Row>
     </Grid>
   )

  return (
    <div className="page category">

      <Header showSort={true} currentCategory={category}/>

        <Grid>
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
