import {
  RECEIVE_POSTS_FAILURE,
  RECEIVE_POSTS_SUCCESS,
  REQUEST_POSTS
} from '../actions/post'

const initialState = {
  list: [],
  postStatus: {
    error: false,
    loading: false,
  },
  sortPosts: {
    //filter here
  }
};

const post = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        postStatus: {
          error: false,
          loading: true,
        }
      }
    case RECEIVE_POSTS_SUCCESS:
      return {
        ...state,
        list: action.posts
      }
      case RECEIVE_POSTS_FAILURE:
      return {
        ...state,
        postStatus: {
          error: true,
          loading: false,
        }
      }
    // case REQUEST_POSTS:
    //   return Object.assign({}, state, {
    //     isFetching: true,
    //     // didInvalidate: false,
    //   })
    // case RECEIVE_POSTS:
    //   return Object.assign({}, state, {
    //     isFetching: false,
    //     posts: action.posts,
    //     // didInvalidate: false,
    //   })
    default:
      return state;
  }
}
export default post;
