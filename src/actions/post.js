import { getPosts } from '../utils/serverAPI';
import { getPost } from '../utils/serverAPI';
//constants
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const REQUEST_POST = 'REQUEST_POST'

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

export const RECEIVE_POSTS_SUCCESS = 'RECEIVE_POSTS_SUCCESS'
export const receivePosts = posts => ({
  type: RECEIVE_POSTS_SUCCESS,
  posts,
});

export const RECEIVE_POSTS_FAILURE = 'RECEIVE_POSTS_FAILURE';
export const RECEIVE_POST_FAILURE = 'RECEIVE_POST_FAILURE';
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

export const SORT_POSTS_BY_NEW = 'SORT_POSTS_BY_NEW';
export const sortPostsByNew = () => ({
  type: SORT_POSTS_BY_NEW,
});

export const SORT_POSTS_BY_OLD = 'SORT_POSTS_BY_OLD';
export const sortPostsByOld = () => ({
  type: SORT_POSTS_BY_OLD,
});

export const SORT_POSTS_BY_HIGHEST_VOTE = 'SORT_POSTS_BY_HIGHEST_VOTE';
export const sortPostsByHighestVote = () => ({
  type: SORT_POSTS_BY_HIGHEST_VOTE,
});

export const SORT_POSTS_BY_LOWEST_VOTE = 'SORT_POSTS_BY_LOWEST_VOTE';
export const sortPostsByLowestVote = () => ({
  type: SORT_POSTS_BY_LOWEST_VOTE,
});
