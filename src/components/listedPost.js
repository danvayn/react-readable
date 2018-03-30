import React, {Component} from 'react'
import { NavLink } from 'react-router-dom';
import { ListGroup, ListGroupItem, Badge } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { timeConverter } from '../utils/misc'
class ListedPost extends Component {
  constructor(props){
    super(props);
    this.state = {
      commentCount: this.props.commentCount || 0
    }
  }
  render(){
  const post = this.props.post;
  const listedStyle = {
    display: "inline-block",
    marginLeft: "25px",
    verticalAlign: "top",
    marginTop: "5px"
  }
  return (
    <div style={listedStyle}>
      <Row>
        <NavLink to={"/post/" + post.id}>
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
      <NavLink to={"/post/" + post.id}>
        {post.commentCount} comments
      </NavLink>
    </Row>
    </div>
  )
}
}

export default ListedPost
