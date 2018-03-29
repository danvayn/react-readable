import React from 'react'
import { Panel, Row } from 'react-bootstrap';
import Modal from './modal'
import { timeConverter } from '../../utils/misc'
const PostHeader = ({post}) => {
  return(
  <Panel  bsStyle="primary">
    <Panel.Heading>
      <Panel.Title componentClass="h3">{post.title}</Panel.Title>
    </Panel.Heading>
    <Panel.Body>
      <p>{post.body}</p>
    </Panel.Body>
    <Panel.Footer>
      <Row>
        <span>Submitted by {post.author} to {'/r/' + post.category} on {timeConverter(post.timestamp)}</span></Row>
      <Row><Modal replyID={post.id}/></Row>
    </Panel.Footer>
    </Panel>
)
}
export default PostHeader;
