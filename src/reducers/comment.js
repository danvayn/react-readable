import {
  COMMENTS_RECEIVE_SUCCESS,
  COMMENTS_RECEIVE_FAIL,
  REPLY_SEND_SUCCESS,
  REPLY_SEND_FAIL,
  LOADING_COMMENTS,
  DESTROY_COMMENTS,
  SORT_COMMENTS_BY_LOWEST_VOTE,
  SORT_COMMENTS_BY_HIGHEST_VOTE,
  SORT_COMMENTS_BY_NEW,
  SORT_COMMENTS_BY_OLD,
} from '../actions/comment';


import {
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
} from '../actions/vote'


import { sortArray } from '../utils/sort';

const initialState = {
  commentStatus: {
    error: false,
    loading: false,
    selectedSort: '',
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
        list: sortArray({contents: comments, order: 'highest'}),
        commentStatus: {
          error: false,
          loading: false,
          selectedSort: 'highest',
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
    case REPLY_SEND_SUCCESS:
      const commentList = state.list;
      commentList.push(action.response);
      return {
        ...state,
        list: commentList,
      }
    case REPLY_SEND_FAIL:
      return {
        ...state,
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
          }
        case SORT_COMMENTS_BY_OLD:
          return {
            ...state,
            list: sortArray({contents: [...state.list], order: 'oldest'}),
          }
        case SORT_COMMENTS_BY_HIGHEST_VOTE:
          return {
            ...state,
            list: sortArray({contents: [...state.list], order: 'highest'}),
          }
        case SORT_COMMENTS_BY_LOWEST_VOTE:
          return {
            ...state,
            list: sortArray({contents: [...state.list], order: 'lowest'}),
          }
    default:
      return state;
  }
};


export default comments;
