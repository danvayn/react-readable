import React, {Component} from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from './modal';

import { Row, ListGroup, ListGroupItem, Badge } from 'react-bootstrap';
import { submitEditPost, deleteYourPost } from '../actions/post'
import { timeConverter } from '../utils/misc'

class ListedPost extends Component {
  constructor(props){
    super(props);
    this.state = {
      commentCount: this.props.commentCount || 0
    }
  }
  render(){
    const {post, submitPostEdit, deleteYourPost} = this.props;
    const listedStyle = {
      display: "inline-block",
      marginLeft: "25px",
      verticalAlign: "top",
      marginTop: "5px"
    }
    return (
      <div style={listedStyle}>
        <Row>
          <NavLink to={"/"+post.category+'/'+ post.id}>
            <h4 className="list-group-item-heading" style={{display: "inline"}}>{post.title}</h4>
          </NavLink>
        </Row>
        <Row>
            <span>{"Submitted to "}
            <Badge>/r/{post.category}</Badge>
              {' by '+post.author+' on '}
              {timeConverter(post.timestamp)}
          </span>
        </Row>
        <Row>
          <NavLink to={'/'+post.category+ '/' + post.id}>
            {post.commentCount} comments
          </NavLink>
          { post.author === this.props.userName && (
            <div className="author-links">
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
