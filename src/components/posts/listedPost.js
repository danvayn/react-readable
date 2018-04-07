import React, {Component} from 'react'
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Badge } from 'react-bootstrap';

import Modal from '../modal';

import { submitEditPost, deleteYourPost } from '../../actions/post'

class ListedPost extends Component {
  render(){
    const {post, submitPostEdit, deleteYourPost} = this.props;

    const postDate = new Date(post.timestamp);
    return (
      <div className="listed-post">
        <Row>
          <NavLink to={"/"+post.category+'/'+ post.id}>
            <h4 className="list-group-item-heading" style={{display: "inline"}}>{post.title}</h4>
          </NavLink>
        </Row>
        <Row>
            <p className="post-info">Submitted to <Badge>/r/{post.category}</Badge> by
              <span className="author">{` ${post.author} `}</span>
              <Moment fromNow>{postDate}</Moment>
          </p>
        </Row>
        <Row>
          <NavLink className="comment-count" to={'/'+post.category+ '/' + post.id}>
            {post.commentCount} comments
          </NavLink>
          { post.author === this.props.userName && (
            <div className="user-actions post-actions">
              <Modal
                optionalClass="edit"
                relatedId={post.id}
                onSubmit={submitPostEdit}
                displayText={"Edit this post"}
                title={'Edit the body of your post.'}
                startingValue={post.body}
              >
                <p className="hint">If you want to change the post title, you must resubmit your post.</p>
              </Modal>

              <span className="delete"
                onClick={() => {
                  if(window.confirm('Are you sure you want to delete this post?')){
                    deleteYourPost(post.id)}
                    this.setState({ fireRedirect: true })
                  }
                }>
                Delete Post
              </span>
            </div>
          )
        }
      </Row>
      </div>
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
    deleteYourPost: (post_id) => dispatch(deleteYourPost(post_id)),
    submitPostEdit: (form) => dispatch(submitEditPost({
      post_id: form.relatedId,
      body: form.body,
    })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListedPost);
