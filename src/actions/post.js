import { getPosts, getPost, postPost } from '../utils/serverAPI';
//constants
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const REQUEST_POST = 'REQUEST_POST'
export const RECEIVE_POSTS_SUCCESS = 'RECEIVE_POSTS_SUCCESS'
export const RECEIVE_POSTS_FAILURE = 'RECEIVE_POSTS_FAILURE'
export const RECEIVE_POST_SUCCESS = 'RECEIVE_POST_SUCCESS'
export const RECEIVE_POST_FAILURE = 'RECEIVE_POST_FAILURE'
export const POST_SEND_SUCCESS = 'REPLY_SEND_SUCCESS'
export const POST_SEND_FAIL = 'REPLY_SEND_FAIL'
export const POST_DELETE_SUCCESS = 'REPLY_DELETE_SUCCESS'
export const POSE_DELETE_FAIL = 'REPLY_DELETE_FAIL'

function requestPosts(category = null) {
  // getCategory = category || 'all'
  return {
    type: REQUEST_POSTS
  }
}

function requestPost(post_id) {
  // getCategory = category || 'all'
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

export function fetchPost(post_id) {
  return dispatch => {
    dispatch(requestPost(post_id))
    return getPost(post_id)
      .then(post => {
        dispatch(receivePosts(post));
      })
      .catch(error => dispatch(errorReceivingPost(error)));
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

export const submitPost = (reply) => dispatch => {
  postPost(reply)
    .then((post) => dispatch(postCreated(post)))
    .catch(error => dispatch(errorSubmittingPost(error)));
}

export const postCreated = (post) => ({
  type: POST_SEND_SUCCESS,
  post: post
});

export const errorSubmittingPost = (error) => ({
  type: POST_SEND_FAIL,
  error: error
});
