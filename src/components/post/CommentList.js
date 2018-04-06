import React, { Component } from 'react'
import { Jumbotron, Button, Row, ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import Modal from '../modal'
import VotePanel from '../../components/votePanel'
import Comment from './Comment'

import { submitCommentVote } from '../../actions/vote'
import { deleteReply, editReply } from '../../actions/comment'

class ListOfComments extends Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this);
  }

  static propTypes = {
    comments: PropTypes.array,
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired,
  }

  handleDelete(comment_id){
    this.props.deleteComment(comment_id);
  }

  render() {
  const { voteUp, voteDown, deleteReply, loading, submitEdit, userName } = this.props;
  const noCommentsDisplay = (this.props.comments.length < 1 && loading === false)
    return (
      <ListGroup className="flush comment-list">
        {noCommentsDisplay &&
          <Jumbotron className="pad-top">
            <h1>Uh oh!</h1>
            <p>Looks like there are no comments here. Submit one and be the first!</p>
          </Jumbotron>
        }
        {this.props.comments && this.props.comments.map((comment,index) =>
          <ListGroupItem
            className="comment-listing"
            key={comment.id}>
            <VotePanel
                voteScore={comment.voteScore}
                voteUp={voteUp}
                voteDown={voteDown}
                voteID={comment.id}
                currentUser={userName}
                />
              <Comment comment={comment}>
                { comment.author === userName && (
                  <Row className="user-actions">
                      <Modal
                        optionalClass="edit"
                        relatedId={comment.id}
                        onSubmit={submitEdit}
                        displayText={"Edit this comment"}
                        title={"Edit comment"}
                        startingValue={comment.body}
                      />
                      <span className="delete"
                        onClick={() => {if(window.confirm('Delete this comment'))
                          this.handleDelete(comment.id)}}>
                        Delete Comment
                      </span>
                  </Row>
                )}
              </Comment>
          </ListGroupItem>
        )}
      </ListGroup>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    voteUp: (currentUser, voteID) => dispatch(submitCommentVote(currentUser, voteID, 'upVote')),
    voteDown: (currentUser, voteID) => dispatch(submitCommentVote(currentUser, voteID, 'downVote')),
    deleteComment: (comment_id) => dispatch(deleteReply(comment_id)),
    submitEdit: (form) => dispatch(editReply({
      comment_id: form.relatedId,
      body: form.body,
    }))
  };
};
const mapStateToProps = (state) => {
  return {
    comments: state.comments.list,
    loading: state.comments.commentStatus.loading || state.posts.postStatus.loading,
    userName: state.users.username
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfComments);
