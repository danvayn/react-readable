import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
// import LinkContainer from 'react-router-bootstrap';
import PropTypes from 'prop-types'
import Modal from '../modal'
// import { NavLink } from 'react-router-dom';
import VotePanel from '../../components/votePanel'
import { connect } from 'react-redux';
import { voteDownComment, voteUpComment } from '../../actions/vote'
import { deleteReply, editReply } from '../../actions/comment'
import { Button, Row } from 'react-bootstrap';
import ListedComment from './listedComment'
import { sortArray } from '../../utils/sort';
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
  let oldComments = prevProps.comments
  let newComments = this.props.comments
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
                voteID={comment.id}/>
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
                    onClick={() => {if(window.confirm('Delete this post')){this.handleDelete(comment.id)}}}
                    bsStyle="danger">
                    Delete Post
                  </Button>

                    <Modal
                      relatedId={comment.id}
                      onSubmit={submitEdit}
                      displayText={"Edit this post"}
                      title={"Edit post"}
                      placeholder={comment.body}
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
    voteUp: (voteID) => dispatch(voteUpComment(voteID)),
    voteDown: (voteID) => dispatch(voteDownComment(voteID)),
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

// const ListOfPosts = ({posts, postStatus}) => {
//   if(postStatus.loading === false && postStatus.error === false) {
//     return (
//       <div>
//         <ListGroup className="post-list">
//
//           { posts.map((post,index) =>
//             <ListGroupItem to="/"
//                           className="post" key={post.id} href={`/${post.path}`}>
//                           {post.title}
//                         </ListGroupItem>
//                       )}
//         </ListGroup>
//       </div>
//     )
//   } else {
//     return (<div>loading or error...</div>);
//   }
// }
//
// ListOfPosts.propTypes = {
//   posts: PropTypes.array.isRequired,
//   postStatus: PropTypes.shape({
//     loading: PropTypes.boolean,
//     error: PropTypes.boolean,
//   }).isRequired,
// };
