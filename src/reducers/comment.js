import {
  COMMENTS_RECEIVE_SUCCESS,
  COMMENTS_RECEIVE_FAIL,
  LOADING_COMMENTS,
  SORT_COMMENTS_BY_LOWEST_VOTE,
  SORT_COMMENTS_BY_HIGHEST_VOTE,
  SORT_COMMENTS_BY_NEW,
  SORT_COMMENTS_BY_OLD,
} from '../actions/comment';


import {
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
} from '../actions/vote'

const initialState = {
  commentStatus: {
    error: false,
    loading: false,
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
        list: comments,
        commentStatus: {
          error: false,
          loading: false,
        }
      }
    case COMMENTS_RECEIVE_FAIL:
      return {
        ...state,
        comments: [],
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
      case SORT_COMMENTS_BY_HIGHEST_VOTE:
        return {
          ...state,
          commentStatus: { ...state.commentStatus, selectedSort: 'highest' },
        }
      case SORT_COMMENTS_BY_LOWEST_VOTE:
        return {
          ...state,
          commentStatus: { ...state.commentStatus, selectedSort: "lowest" },
        }
    default:
      return state;
  }
};


export default comments;
