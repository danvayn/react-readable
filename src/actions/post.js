import { getPosts } from '../utils/serverAPI';

//constants
export const LOAD_POSTS = 'FETCH_POSTS'
export const REQUEST_POSTS = 'REQUEST_POSTS'
function requestPosts(category = null) {
  // getCategory = category || 'all'
  return {
    type: REQUEST_POSTS
  }
}

export const RECEIVE_POSTS_SUCCESS = 'RECEIVE_POSTS_SUCCESS'
export const receivePosts = posts => ({
  type: RECEIVE_POSTS_SUCCESS,
  posts,
});

export const RECEIVE_POSTS_FAILURE = 'RECEIVE_POSTS_FAILURE';
export const errorReceivingPosts = () => ({
  type: RECEIVE_POSTS_FAILURE,
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
  const posts = state.posts.list
  if (posts[1] == null) {
    return true //see if theres a better way to do this
  } else if (posts.status.isFetching) {
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
