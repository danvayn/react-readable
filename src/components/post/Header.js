import React from 'react'
import { Panel } from 'react-bootstrap';

const PostHeader = ({post}) => {
  return(
  <Panel  bsStyle="primary">
    <Panel.Heading>
      <Panel.Title componentClass="h3">{post.title}</Panel.Title>
    </Panel.Heading>
    <Panel.Body>
      <p>{post.body}</p>
    </Panel.Body>
    <Panel.Footer>Submitted on {post.timestamp}</Panel.Footer>
    </Panel>
)
}
export default PostHeader;
