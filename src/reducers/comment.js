import {
  COMMENTS_RECEIVE_SUCCESS,
  COMMENTS_RECEIVE_FAIL,
  REPLY_SEND_SUCCESS,
  REPLY_SEND_FAIL,
  LOADING_COMMENTS,
  DESTROY_COMMENTS,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  EDIT_COMMENT_FAIL,
  EDIT_COMMENT_SUCCESS,
} from '../actions/comment';

import {
  SORT_COMMENTS_BY_LOWEST_VOTE,
  SORT_COMMENTS_BY_HIGHEST_VOTE,
  SORT_COMMENTS_BY_NEW,
  SORT_COMMENTS_BY_OLD,
} from '../actions/sort'


import {
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
} from '../actions/vote'


import { sortArray } from '../utils/sort';

const initialState = {
  commentStatus: {
    error: false,
    loading: false,
    order: 'highest',
  },
  list: [
  ],
};

const comments = (state = initialState, action) => {
  const comments = action.comments
  switch(action.type) {
    case LOADING_COMMENTS:
      return {
        ...state,
        commentStatus: {
          error: false,
          loading: true,
        }
      }

    case COMMENTS_RECEIVE_SUCCESS:
      return {
        ...state,
        list: sortArray({contents: comments, order: state.commentStatus.order}),
        commentStatus: {
          error: false,
          loading: false,
          order: 'highest',
        }
      }
    case COMMENTS_RECEIVE_FAIL:
      return {
        ...state,
        list: [],
        commentStatus: {
          error: true,
          loading: false
        }
      }
    case DESTROY_COMMENTS:
      return {
        ...state,
        list: [],
        commentStatus: {
          error: false,
          loading: false
        }
      }

    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        list: state.list.filter(comment => comment.id !== action.comment_id),
        commentStatus: {
          error: false,
          loading: false
        }
      }
    case DELETE_COMMENT_FAIL:
      return {
        ...state,
        commentStatus: {
          error: true,
          loading: false
        }
      }
      case EDIT_COMMENT_SUCCESS:
        const indexOf = state.list.findIndex((comment) => (comment.id === action.response.id))
        state.list[indexOf] = action.response
        return {
          ...state,
          list:  [...state.list]
        }
      case EDIT_COMMENT_FAIL:
        return {
          ...state,
          commentStatus: {
            error: true,
            loading: false
          }
        }
    case REPLY_SEND_SUCCESS:
      return {
        ...state,
        list: sortArray({contents: [...state.list, action.response], order: state.commentStatus.order}),
      }
    case REPLY_SEND_FAIL:
      return {
        ...state,
        commentStatus: {
          error: true,
          loading: false
        }
      }
      case UPVOTE_COMMENT:
        return {
          ...state,
          }
      case DOWNVOTE_COMMENT:
        return {
          ...state,
          }
        case SORT_COMMENTS_BY_NEW:
          return {
            ...state,
            list: sortArray({contents: [...state.list], order: 'newest'}),
            commentStatus: {order: 'newest'}
          }
        case SORT_COMMENTS_BY_OLD:
          return {
            ...state,
            list: sortArray({contents: [...state.list], order: 'oldest'}),
            commentStatus: {order: 'oldest'}
          }
        case SORT_COMMENTS_BY_HIGHEST_VOTE:
          return {
            ...state,
            list: sortArray({contents: [...state.list], order: 'highest'}),
            commentStatus: {order: 'highest'}
          }
        case SORT_COMMENTS_BY_LOWEST_VOTE:
          return {
            ...state,
            list: sortArray({contents: [...state.list], order: 'lowest'}),
            commentStatus: {order: 'lowest'}
          }
    default:
      return state;
  }
};


export default comments;
