import React from 'react'
import { Panel, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import Modal from '../modal'
import { timeConverter } from '../../utils/misc'
import { submitReply } from '../../actions/comment'

const PostHeader = ({submitReply, post}) => {
  return(
  <Panel  bsStyle="primary">
    <Panel.Heading>
      <Panel.Title componentClass="h3">{post.title}</Panel.Title>
    </Panel.Heading>
    <Panel.Body>
      <p>{post.body}</p>
    </Panel.Body>
    <Panel.Footer>
      <Row>
        <span>Submitted by {post.author} to {'/r/' + post.category} on {timeConverter(post.timestamp)}</span></Row>
      <Row>
        <Modal
          relatedId={post.id}
          onSubmit={submitReply}
          displayText={"Reply to this post"}
          title={"Reply to post"}
          replyID={post.id}/></Row>
    </Panel.Footer>
    </Panel>
)
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
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
