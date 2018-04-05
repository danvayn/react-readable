import {
  getPosts,
  getPost,
  postPost,
  editPost,
  deletePost } from '../utils/serverAPI';

import { handleRequest } from '../utils/misc'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const REQUEST_POST = 'REQUEST_POST'
export const RECEIVE_POSTS_SUCCESS = 'RECEIVE_POSTS_SUCCESS'
export const RECEIVE_POSTS_FAILURE = 'RECEIVE_POSTS_FAILURE'
export const RECEIVE_POST_SUCCESS = 'RECEIVE_POST_SUCCESS'
export const RECEIVE_POST_FAILURE = 'RECEIVE_POST_FAILURE'
export const POST_SEND_SUCCESS = 'POST_SEND_SUCCESS'
export const POST_SEND_FAIL = 'POST_SEND_FAIL'
export const DELETE_POST_SUCCESS = 'POST_DELETE_SUCCESS'
export const DELETE_POST_FAIL = 'POST_DELETE_FAIL'
export const UPDATE_POST = 'UPDATE_POST'
export const UPDATE_POST_FAIL = 'UPDATE_POST'

function requestPosts(category = null) {
  return {
    type: REQUEST_POSTS
  }
}

function requestPost(post_id) {
  return {
    post_id: post_id,
    type: REQUEST_POST
  }
}

export const receivePosts = posts => ({
  type: RECEIVE_POSTS_SUCCESS,
  posts,
});

export const errorReceivingPosts = () => ({
  type: RECEIVE_POSTS_FAILURE,
});
export const errorReceivingPost = () => ({
  type: RECEIVE_POST_FAILURE,
});


export function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts())
    return getPosts()
      .then(posts => {
        dispatch(receivePosts(posts));
      })
      .catch(error => dispatch(errorReceivingPosts(error)));
    }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.posts
  if (posts[1] == null) {
    return true //see if theres a better way to do this
  } else if (posts.postStatus.loading) {
    return false
  }
}

export function fetchPostsIfNeeded(){
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts())
    }
  }
}

export const submitPost = post => dispatch => {
  postPost(post)
    .then(response => dispatch(postCreated(response)))
    .catch(error => dispatch(errorSubmittingPost(error)));
}

export const postCreated = (post) => ({
  type: POST_SEND_SUCCESS,
  post: post
});

export const errorSubmittingPost = error => ({
  type: POST_SEND_FAIL,
  error: error
});


export const updatePost = response => ({
  type: UPDATE_POST,
  response: response
});

export const submitEditPost = post => dispatch => {
  // handleRequest({request: editPost, payload: post, onSuccess: updatePost, onFail: errorUpdatingPost})
  editPost(post)
    .then(response => dispatch(updatePost(response)))
    .catch(error => dispatch(errorUpdatingPost(error)));
}

export const deleteYourPost = post_id => dispatch => {
  // handleRequest({request: deletePost, payload: post_id, onSuccess: postDeleteSuccessful, onFail: errorDeletingPost})
  deletePost(post_id)
    .then(response => dispatch(postDeleteSuccessful(response.id)))
    .catch(error => dispatch(errorDeletingPost(error)));
}

export const postDeleteSuccessful = (post_id) => ({
  type: DELETE_POST_SUCCESS,
  post_id: post_id
})
export const errorUpdatingPost = (error) => ({
  type: UPDATE_POST_FAIL,
  error: error
})
export const errorDeletingPost = (error) => ({
  type: DELETE_POST_FAIL,
  error: error
})
