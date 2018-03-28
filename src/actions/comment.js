import { getComments } from '../utils/serverAPI';

export const COMMENTS_RECEIVE_SUCCESS = 'COMMENT_RECEIVE_SUCCESS';
export const COMMENTS_RECEIVE_FAIL = 'COMMENT_RECEIVE_FAIL';
export const LOADING_COMMENTS = 'LOADING_COMMENTS';

export const receiveComments = comments => ({
  type: COMMENTS_RECEIVE_SUCCESS,
  comments: comments
});

export const errorReceivingComments = () => ({
  type: COMMENTS_RECEIVE_FAIL,
});

export function fetchCommentsIfNeeded(post_id){
  return (dispatch, getState) => {
    if (shouldFetchComments(post_id, getState())) {
      return dispatch(fetchComments(post_id))
    }
  }
}

function shouldFetchComments(state, post_id) {
  const comments = state.comments
  if (comments && comments.commentStatus.loading) {
    return false
  }
  else {
    return true
  }
}
export const fetchComments = (post_id) => dispatch => {
  getComments(post_id)
    .then(comments => dispatch(receiveComments(comments)))
    .catch(error => dispatch(errorReceivingComments(error)));
  }

  export const SORT_COMMENTS_BY_NEW = 'SORT_COMMENTS_BY_NEW';
  export const sortCommentsByNew = () => ({
    type: SORT_COMMENTS_BY_NEW,
  });

  export const SORT_COMMENTS_BY_OLD = 'SORT_COMMENTS_BY_OLD';
  export const sortCommentsByOld = () => ({
    type: SORT_COMMENTS_BY_OLD,
  });

  export const SORT_COMMENTS_BY_HIGHEST_VOTE = 'SORT_COMMENTS_BY_HIGHEST_VOTE';
  export const sortCommentsByHighestVote = () => ({
    type: SORT_COMMENTS_BY_HIGHEST_VOTE,
  });

  export const SORT_COMMENTS_BY_LOWEST_VOTE = 'SORT_COMMENTS_BY_LOWEST_VOTE';
  export const sortCommentsByLowestVote = () => ({
    type: SORT_COMMENTS_BY_LOWEST_VOTE,
  });
