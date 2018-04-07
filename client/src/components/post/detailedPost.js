import React, { Component } from 'react'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Redirect } from 'react-router-dom';
import { Panel } from 'react-bootstrap';

import Modal from '../modal';
import VotePanel from '../votePanel';

import { submitPostVote } from '../../actions/vote';
import { submitEditPost, deleteYourPost } from '../../actions/post';
import { submitReply } from '../../actions/comment';

class DetailedPost extends Component {
    constructor () {
      super();
      this.state = {
        fireRedirect: false
      }
  }
  render() {
    const {voteUp, voteDown, submitPostEdit, deleteYourPost, submitReply, post} = this.props
    const postCategory = post.category
    const postDate = new Date(this.props.post.timestamp);
     const { fireRedirect } = this.state
    return(
    <Panel className="original-post" bsStyle="primary">
      <Panel.Heading>
        <Panel.Title componentClass="h3">{post.title}</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        { post && <VotePanel
          voteScore={post.voteScore}
          voteUp={voteUp}
          voteDown={voteDown}
          voteID={post.id}
        />}
      <p className="post-body">{post.body}</p>
      </Panel.Body>
      <Panel.Footer>
          <span>{`Submitted by ${post.author} to /r/${post.category} `}
            <Moment fromNow>{postDate}</Moment>
          </span>
          { post.author === this.props.userName ? (
            <div className="user-actions detailed-actions">
              <Modal
                relatedId={post.id || ''}
                onSubmit={submitPostEdit}
                optionalClass={"edit"}
                displayText={"Edit this post"}
                title={"Edit post. You must resubmit to retitle."}
                startingValue={post.body}
              />
            <span className="delete"
                onClick={() => {
                  if(window.confirm('Delete this post?')){
                    deleteYourPost(post.id)}
                    this.setState({ fireRedirect: true })
                  }
                }>
                Delete Post
              </span>
            </div>
          ) : ( <Modal
            optionalClass="reply"
            relatedId={post.id  || ''}
            onSubmit={submitReply}
            displayText={"Reply to this post"}
            title={"Reply to post"}
            replyID={post.id}/>
        )}
      </Panel.Footer>
      {fireRedirect && (
         <Redirect to={'/'+postCategory}/>
      )}
      </Panel>
    )
  }
}
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
    submitReply: (form) => {
      dispatch(submitReply({
        timestamp: form.timestamp,
        parentId: form.relatedId,
        author: form.submittedBy,
        body: form.body,
      }))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedPost);
