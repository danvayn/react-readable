import {
  RECEIVE_POSTS_FAILURE,
  RECEIVE_POSTS_SUCCESS,
  // RECEIVE_POST_FAILURE,
  // RECEIVE_POST_SUCCESS,
  REQUEST_POSTS,
  REQUEST_POST,
  UPDATE_POST,
  DELETE_POST_FAIL,
  DELETE_POST_SUCCESS,
  POST_SEND_SUCCESS,
  POST_SEND_FAIL
} from '../actions/post'

// import {
//   UPVOTE_POST,
//   DOWNVOTE_POST,
// } from '../actions/vote'

import {
SORT_POSTS_BY_LOWEST_VOTE,
SORT_POSTS_BY_HIGHEST_VOTE,
SORT_POSTS_BY_NEW,
SORT_POSTS_BY_OLD,
} from '../actions/sort'

import { sortArray } from '../utils/sort';

const initialState = {
  list: [],
  postStatus: {
    error: false,
    loading: true,
    order: 'highest',
  },
};

const post = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        postStatus: {
          ...state.postStatus,
          error: false,
          loading: true,
        },
      }
      case REQUEST_POST:
        return {
          ...state,
          postStatus: {
            error: false,
            loading: true,
          },
        }
    case RECEIVE_POSTS_SUCCESS:
      return {
        ...state,
        list: sortArray({contents: [...action.posts], order: state.postStatus.order}),
        postStatus: {
          error: false,
          loading: false,
          order: 'highest',
        },
      }
    case RECEIVE_POSTS_FAILURE:
      return {
        ...state,
        postStatus: {
          error: true,
          loading: false,
        },
      }
    case POST_SEND_SUCCESS:
      return {
        ...state,
        list: sortArray({contents: [...state.list, action.post], order: state.postStatus.order}),
      }
    case POST_SEND_FAIL:
      return {
        ...state,
        postStatus: {
          error: true
        }
      }
    case UPDATE_POST:
      const indexOf = state.list.findIndex((post) => (post.id === action.response.id))
      state.list[indexOf] = action.response
      return {
        ...state,
        list:  [...state.list]
      }
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        list: sortArray({
          contents: state.list.filter(post => post.id !== action.post_id),
          order: state.postStatus.order}),
        postStatus: {
          error: false,
          loading: false
        }
      }
    case DELETE_POST_FAIL:
      return {
        ...state,
        postStatus: {
          error: true
        }
      }
    case SORT_POSTS_BY_NEW:
      return {
        ...state,
        list: sortArray({contents: [...state.list], order: 'newest'}),
        commentStatus: {order: 'newest'}
      }
    case SORT_POSTS_BY_OLD:
      return {
        ...state,
        list: sortArray({contents: [...state.list], order: 'oldest'}),
        commentStatus: {order: 'oldest'}
      }
    case SORT_POSTS_BY_HIGHEST_VOTE:
      return {
        ...state,
        list: sortArray({contents: [...state.list], order: 'highest'}),
        commentStatus: {order: 'highest'}
      }
    case SORT_POSTS_BY_LOWEST_VOTE:
      return {
        ...state,
        list: sortArray({contents: [...state.list], order: 'lowest'}),
        commentStatus: {order: 'lowest'}
      }
    default:
      return state;
  }
}
export default post;
