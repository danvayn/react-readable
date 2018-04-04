import React from 'react'
import { Panel, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import Modal from '../modal'
import { timeConverter } from '../../utils/misc'
import { submitReply } from '../../actions/comment'
import VotePanel from '../votePanel'
import { submitPostVote } from '../../actions/vote'
import { deleteYourPost } from '../../actions/post'

const PostHeader = ({voteUp, voteDown, submitEdit, deleteYourPost, submitReply, post}) => {
  return(
  <Panel  bsStyle="primary">
    <Panel.Heading>
      <Panel.Title componentClass="h3">{post.title}</Panel.Title>
    </Panel.Heading>
    <Panel.Body>
      <VotePanel
        voteScore={post.voteScore}
        voteUp={voteUp}
        voteDown={voteDown}
        voteID={post.id}/>
      <p className="pull-right">{post.body}</p>
    </Panel.Body>
    <Panel.Footer>
      <Row>
        <span>Submitted by {post.author} to {'/r/' + post.category} on {timeConverter(post.timestamp)}</span></Row>
      <Row>{ post.author === 'bobby' ? (
        <Row>
          <Button
            onClick={() => {
              if(window.confirm('Delete this post')){
                deleteYourPost(post.id)}
              }
            }
            bsStyle="danger">
            Delete Post
          </Button>

            <Modal
              relatedId={post.id}
              onSubmit={submitEdit}
              displayText={"Edit this post"}
              title={"Edit post"}
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
    </Panel.Footer>
    </Panel>
)
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    voteUp: (currentUser, voteID) => dispatch(submitPostVote(currentUser, voteID, 'upVote')),
    voteDown: (currentUser, voteID) => dispatch(submitPostVote(currentUser, voteID, 'downVote')),
    deleteYourPost: (post_id) => dispatch(deleteYourPost(post_id)),
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

export default connect(null, mapDispatchToProps)(PostHeader);
