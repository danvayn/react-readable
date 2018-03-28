import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommentSort from '../components/post/commentSort'
import CommentList from '../components/CommentList'
import PostHeader from '../components/post/Header'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import { Grid, Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';

import { fetchCommentsIfNeeded } from '../actions/comment';
import { fetchPost } from '../actions/post';

class PostPage extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired,
    getComments: PropTypes.func.isRequired,

  }
  componentDidMount(){
    const post_id = this.props.post_id
    if(post_id){
      this.props.getComments(post_id);
    }
  }
  render(){
    const { post, comments } = this.props;
    return (
      <div className="page post-page">
        <Header showSort={false} currentCategory={post.category}/>
        <Grid>
          <Row>
            <Col xs={12} md={8}>
              <PostHeader post={post}/>
              <CommentSort/>
              <CommentList comments={comments}/>
            </Col>
            <Col xs={12} md={4}>
              <Sidebar category={post.category} body={"blah"}/>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

 const mapStateToProps = (state, ownProps) => {
   const post_id = ownProps.match.params.postID;
   const post = state.posts.list.filter(post => post.id === post_id);
   return {
     post_id: post_id,
     post: post[0] || {},
     comments: state.comments.list,
   }
 }

 const mapDispatchToProps = (dispatch, ownProps) => {
   return {
     getPost: (post_id) => dispatch(fetchPost(post_id)),
     getComments: (post_id) => dispatch(fetchCommentsIfNeeded(post_id)),
 }
}

const PostPageContainer = ({getComments, post, post_id}) => {
  return (
    <PostPage post={post} post_id={post_id} getComments={getComments}/>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(PostPageContainer);
