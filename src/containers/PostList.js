import React from 'react'
import { connect } from 'react-redux'


import Post from '../components/Post'

const ListOfPosts = () => {
    return (
      <div>test</div>
    )
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.list
  }
}

let PostList = connect(mapStateToProps, null)(ListOfPosts)

export default PostList
