import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap';

import Header from '../containers/Header'
import OriginalPost from '../components/post/detailedPost'
import CommentSort from '../components/post/commentSort'
import CommentList from '../components/post/CommentList'
import Sidebar from '../components/Sidebar'

const PostPage = ({post, userName, comments}) => {
  const genericBody = (
    <div>
      <p>{post.category+' is a subreddit on readable.'}</p>
      <p>{`'${post.title}' is a great title.`}</p>
      <p>{'Why dont you try submitting to '+post.category+'?'}</p>
    </div>)

  return (
    <div className="page post-page">
      <Header showSort={false} currentCategory={post.category}/>
      <Grid className="content-container">
        <Row>
          <Col xs={12} md={8}>
            <OriginalPost username={userName} post={post}/>
            <CommentSort/>
            <CommentList comments={comments}/>
          </Col>
          <Col xs={12} md={4}>
            <Sidebar category={post.category}>
              {genericBody}
            </Sidebar>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}
PostPage.propTypes = {
  post: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  comments: PropTypes.array.isRequired,
}

export default PostPage
