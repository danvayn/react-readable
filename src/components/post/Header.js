import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { browserHistory } from 'react-router'
import { Grid, Panel, Row, Button } from 'react-bootstrap';

import Modal from '../modal'
import VotePanel from '../votePanel'

import { submitPostVote } from '../../actions/vote'
import { submitEditPost, deleteYourPost } from '../../actions/post'
import { submitReply } from '../../actions/comment'
import { timeConverter } from '../../utils/misc'

class PostHeader extends Component {
    constructor () {
      super();
      this.state = {
        fireRedirect: false
      }
  }
  render() {
    const {voteUp, voteDown, submitReplyEdit, submitPostEdit, deleteYourPost, submitReply, post} = this.props
    const postCategory = post.category
     const { fireRedirect } = this.state
    return(
    <Panel  bsStyle="primary">
      <Panel.Heading>
        <Panel.Title componentClass="h3">{post.title}</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        {post && <VotePanel
          voteScore={post.voteScore}
          voteUp={voteUp}
          voteDown={voteDown}
          voteID={post.id}/>
        }
        <p className="pull-right">{post.body}</p>
      </Panel.Body>
      <Panel.Footer>
        <Grid>
        <Row>
          <span>Submitted by {post.author} to {'/r/' + post.category} on {timeConverter(post.timestamp)}</span></Row>
        <Row>{ post.author === this.props.userName ? (
          <Row>
            <span
              onClick={() => {
                if(window.confirm('Delete this post')){
                  deleteYourPost(post.id)}
                  this.setState({ fireRedirect: true })
                }
              }>
              Delete Post
            </span>

              <Modal
                relatedId={post.id}
                onSubmit={submitPostEdit}
                displayText={"Edit this post"}
                title={"Edit post. You must resubmit to retitle."}
                placeholder={post.body}
              />
          </Row>
        ) : (
          <Modal
            relatedId={post.id}
            onSubmit={submitReply}
            displayText={"Reply to this post"}
            title={"Reply to post"}
            replyID={post.id}/>
        )}</Row>
        </Grid>
      </Panel.Footer>
      {fireRedirect && (
         <Redirect to={'/'+postCategory}/>
      )}
      </Panel>
    )
  }
}
PostHeader.propTypes = {
    // {voteUp, voteDown, submitEdit, deleteYourPost, submitReply, post}
};
const mapStateToProps = (state) => {
  return {
    userName: state.users.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    voteUp: (currentUser, voteID) => dispatch(submitPostVote(currentUser, voteID, 'upVote')),
    voteDown: (currentUser, voteID) => dispatch(submitPostVote(currentUser, voteID, 'downVote')),
    deleteYourPost: (post_id) => dispatch(deleteYourPost(post_id)),
    submitPostEdit: (form) => dispatch(submitEditPost({
      post_id: form.relatedId,
      body: form.body,
    })),
    submitReplyEdit: (form) => {
      dispatch(submitReply({
        timestamp: form.timestamp,
        parentId: form.relatedId,
        author: form.submittedBy,
        body: form.body,
      }))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostHeader);
