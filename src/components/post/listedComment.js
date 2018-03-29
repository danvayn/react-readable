import React from 'react'
import { NavLink } from 'react-router-dom';
import { ListGroup, ListGroupItem, Badge } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { timeConverter } from '../../utils/misc'
import Modal from './modal'
const ListedComment = ({comment}) => {
  const listedStyle = {
    display: "inline-block",
    marginLeft: "25px",
    verticalAlign: "top",
    marginTop: "5px"
  }
  return (
    <div style={listedStyle}>

      <Row>
        <h4 style={{display: "inline"}}>{comment.body}</h4>
      </Row>
      <Row>
        <span>Submitted by {comment.author} on {timeConverter(comment.timestamp)}</span>
      </Row>
      <Row>
        <Modal replyID={comment.id}/>
    </Row>
    </div>
  )
}

export default ListedComment
