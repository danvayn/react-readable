import React from 'react';
import PropTypes from 'prop-types';

import '../App.css';

import Header from '../containers/Header'
import PostList from '../components/posts/PostList'
import Sidebar from '../components/Sidebar'
import { Grid, Row, Col } from 'react-bootstrap';

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
      {category &&
      <Grid fluid className="content-container">
        <Row>
          <Col xs={12} sm={8}>
            <PostList posts={posts}/>
          </Col>
          <Col xs={12} sm={4}>
            <Sidebar category={category}>
              {genericBody}
            </Sidebar>
          </Col>
        </Row>
      </Grid>
      }
    </div>
  )
};

CategoryPage.propTypes = {
  category: PropTypes.string,
  posts: PropTypes.array.isRequired
}

export default CategoryPage
