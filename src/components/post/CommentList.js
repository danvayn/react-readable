import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
// import LinkContainer from 'react-router-bootstrap';
import PropTypes from 'prop-types'
import Modal from '../modal'
// import { NavLink } from 'react-router-dom';
import VotePanel from '../../components/votePanel'
import { connect } from 'react-redux';
import { submitCommentVote } from '../../actions/vote'
import { deleteReply, editReply } from '../../actions/comment'
import { Button, Row } from 'react-bootstrap';
import { timeConverter } from '../../utils/misc'

class ListOfComments extends Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this);
    this.state = { comments: [] }
  }

  componentDidMount(){
    this.setState({comments: this.props.comments})
  }
  componentDidUpdate(prevProps,prevState, snapshot) {
    const oldComments = prevProps.comments
    const newComments = this.props.comments
    if (oldComments !== newComments) {
      this.setState({comments: newComments})
    }
  }

  static propTypes = {
    comments: PropTypes.array,
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired,
  }

  handleDelete(comment_id){
    this.props.deleteComment(comment_id);
    this.setState({comments: this.state.comments.filter(comment => comment.id !== comment_id)})
  }

  render() {
  const { voteUp, voteDown, deleteReply, submitEdit, userName } = this.props;

  const listedStyle = {
    display: "inline-block",
    marginLeft: "25px",
    verticalAlign: "top",
    marginTop: "5px"
  }

    return (
      <ListGroup className="flush comment-list">
        {this.state.comments && this.state.comments.map((comment,index) =>
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
            <div style={listedStyle}>

              <Row>
                <h4 style={{display: "inline"}}>{comment.body}</h4>
              </Row>
              <Row>
                <span>Submitted by {comment.author} on {timeConverter(comment.timestamp)}</span>
              </Row>
              { comment.author === userName && (
                <Row>
                  <Button
                    onClick={() => {if(window.confirm('Delete this comment')){this.handleDelete(comment.id)}}}
                    bsStyle="danger">
                    Delete Comment
                  </Button>

                    <Modal
                      relatedId={comment.id}
                      onSubmit={submitEdit}
                      displayText={"Edit this comment"}
                      title={"Edit comment"}
                      placeholder={comment.body}
                      startingValue={comment.body}
                    />
                </Row>
              )}
            </div>
        </ListGroupItem>
        )}
      </ListGroup>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
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
const mapStateToProps = (state, ownProps) => {
  return {
    comments: state.comments.list,
    userName: state.user.username
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfComments);
