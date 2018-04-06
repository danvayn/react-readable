import React from 'react'

import { Row } from 'react-bootstrap';
import { timeConverter } from '../../utils/misc'

const Comment = ({comment, children}) => {
  return (
    <div className="listed-comment">
      <Row>
        <h4 style={{display: "inline"}}>{comment.body}</h4>
      </Row>
      <Row>
        <span>Submitted by {comment.author} on {timeConverter(comment.timestamp)}</span>
      </Row>
      {children}
    </div>
  )
}

export default Comment
