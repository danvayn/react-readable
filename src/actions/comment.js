import { getComments } from '../utils/serverAPI';
import { submitComment } from '../utils/serverAPI'

export const COMMENTS_RECEIVE_SUCCESS = 'COMMENTS_RECEIVE_SUCCESS';
export const COMMENTS_RECEIVE_FAIL = 'COMMENTS_RECEIVE_FAIL';
export const REPLY_SEND_SUCCESS = 'REPLY_SEND_SUCCESS';
export const REPLY_SEND_FAIL = 'REPLY_RECEIVE_FAIL';
export const LOADING_COMMENTS = 'LOADING_COMMENTS';
export const DESTROY_COMMENTS = 'DESTROY_COMMENTS';


export const fetchComments = (post_id) => dispatch => {
  getComments(post_id)
    .then(comments => dispatch(receiveComments(comments)))
    .catch(error => dispatch(errorReceivingComments(error)));
  }

export const receiveComments = comments => ({
  type: COMMENTS_RECEIVE_SUCCESS,
  comments: comments
});

export const errorReceivingComments = () => ({
  type: COMMENTS_RECEIVE_FAIL,
});

export const destroyComments = () => ({
  type: DESTROY_COMMENTS,
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

  export const SUBMIT_REPLY = 'SUBMIT_REPLY'
  export const submitReply = (reply) => dispatch => {
    submitComment(reply)
      .then((response) => dispatch(replyReceived(response)))
      .catch(error => dispatch(errorSubmittingReply(error)));
  }

  export const replyReceived = (response) => ({
    type: REPLY_SEND_SUCCESS,
    response: response
  });

  export const errorSubmittingReply = (error) => ({
    type: REPLY_SEND_FAIL,
    error: error
  });


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
