import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap';
import { Redirect} from 'react-router-dom';

import CommentSort from '../components/post/commentSort'
import CommentList from '../components/post/CommentList'
import PostHeader from '../components/post/Header'
import Header from '../containers/Header'
import Sidebar from '../components/Sidebar'

class PostPage extends Component {
  static propTypes = {
    post: PropTypes.oneOfType([
      PropTypes.object, PropTypes.bool]).isRequired,
  }

  render(){
    const { post, selectedSort } = this.props;
    const genericBody = (
      <div>
      <p>{post.category+' is a subreddit on readable.'}</p>
      <p>{'\"' + post.title + '\"' +' is a great title.'}</p>
      <p>{'Why dont you try submitting to '+post.category+'?'}</p>
      </div>
    )

    return (
      <div className="page post-page">
        <Header showSort={false} currentCategory={post.category}/>
        <Grid className="content-container">
          <Row>
            <Col xs={12} md={8}>
              <PostHeader username={this.props.userName} post={post}/>
              <CommentSort/>
              <CommentList comments={this.props.comments}/>
            </Col>
            <Col xs={12} md={4}>
              <Sidebar category={post.category}>
                {genericBody}
              </Sidebar>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}


export default PostPage
