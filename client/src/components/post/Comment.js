import React from 'react'

import { Row } from 'react-bootstrap';
import Moment from 'react-moment';

const Comment = ({comment, children}) => {
  const commentTimestamp = new Date(comment.timestamp)
  return (
    <div className="listed-comment">
      <Row>
        <h4 style={{display: "inline"}}>{comment.body}</h4>
      </Row>
      <Row>
        <span>{`Submitted by ${comment.author} `}
            <Moment fromNow>{commentTimestamp}</Moment>
        </span>
      </Row>
      {children}
    </div>
  )
}

export default Comment
