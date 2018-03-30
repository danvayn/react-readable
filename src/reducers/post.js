import {
  RECEIVE_POSTS_FAILURE,
  RECEIVE_POSTS_SUCCESS,
  RECEIVE_POST_FAILURE,
  RECEIVE_POST_SUCCESS,
  REQUEST_POSTS,
  REQUEST_POST,
} from '../actions/post'
import {
  UPVOTE_POST,
  DOWNVOTE_POST,
} from '../actions/vote'
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
    selectedSort: '',
  },
};

const post = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        postStatus: {
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
        list: action.posts,
        postStatus: {
          error: false,
          loading: false,
          selectedSort: 'highest',
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
    case UPVOTE_POST:
      return {
        ...state,
        }
    case DOWNVOTE_POST:
      return {
        ...state,
        }
    case SORT_POSTS_BY_NEW:
      return {
        ...state,
        list: sortArray({contents: [...state.list], order: 'newest'}),
      }
    case SORT_POSTS_BY_OLD:
      return {
        ...state,
        list: sortArray({contents: [...state.list], order: 'oldest'}),
      }
    case SORT_POSTS_BY_HIGHEST_VOTE:
      return {
        ...state,
        list: sortArray({contents: [...state.list], order: 'highest'}),
      }
    case SORT_POSTS_BY_LOWEST_VOTE:
      return {
        ...state,
        list: sortArray({contents: [...state.list], order: 'lowest'}),
      }
    default:
      return state;
  }
}
export default post;
