import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../App.css';

import Header from '../containers/Header'
import PostList from '../components/posts/PostList'
import Sidebar from '../components/Sidebar'
import { Grid, Row, Col } from 'react-bootstrap';

//refactor to be full react component and then componentwillmount if category not found redirect to 404

 const CategoryPage = ({category, posts}) => {
   const genericBody = (
     <div>
     <p>{category+' is a subreddit on readable.'}</p>
     <p>{category+' is great.'}</p>
     <p>{'Dont you love visiting /r/'+category+'?'}</p>
     </div>
   )

  return (
    <div className="page category-page">
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
  )
}
export default CategoryPage
