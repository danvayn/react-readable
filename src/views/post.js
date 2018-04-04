import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommentSort from '../components/post/commentSort'
import CommentList from '../components/post/CommentList'
import PostHeader from '../components/post/Header'
import Header from '../containers/Header'
import Sidebar from '../components/Sidebar'
import { Grid, Row, Col } from 'react-bootstrap';
import { Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCommentsIfNeeded } from '../actions/comment';
import { fetchPost } from '../actions/post';

class PostPage extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    getComments: PropTypes.func.isRequired,

  }
  render(){
    const { post, selectedSort } = this.props;
    const genericBody = (
      <div className="zeroMargin">
      <Row>{post.category+' is a subreddit on readable.'}</Row>
      <Row>{post.title+' is a great title.'}</Row>
      <Row>{'Why dont you try submitting to '+post.category+'?'}</Row>
      </div>
    )
    return (
      <div className="page post-page">
        <Header showSort={false} currentCategory={post.category}/>
        <Grid>
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

 const mapStateToProps = (state, ownProps) => {
   const post_id = ownProps.match.params.postID;
   const post = state.posts.list.filter(post => post.id === post_id);
   return {
     userName: state.user.username,
     post_id: post_id,
     post: post[0] || false,
     comments: state.comments.list || [],
     order: state.comments.commentStatus.order,
   }
 }

 const mapDispatchToProps = (dispatch, ownProps) => {
   return {
     getPost: (post_id) => dispatch(fetchPost(post_id)),
     getComments: (post_id) => dispatch(fetchCommentsIfNeeded(post_id)),
 }
}

class PostPageContainer extends React.Component {
  state = {
    comments: []
  }
  componentDidUpdate(prevProps,prevState, snapshot) {
    let oldComments = prevProps.comments
    let newComments = this.props.comments
   if (oldComments !== newComments) {
    this.setState({comments: this.props.comments})
  }
  }
  componentDidMount(){
    const post_id = this.props.post_id
    if(post_id){
      this.props.getComments(post_id);
    }
  }
  render(){
    const {post_id, getComments, post} = this.props;
    return (
      <PostPage post={post} comments={this.state.comments} getComments={getComments}/>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostPageContainer);
