import {
  getComments,
  submitComment,
  deleteComment,
  editComment,
 } from '../utils/serverAPI';

export const LOADING_COMMENTS = 'LOADING_COMMENTS';
export const COMMENTS_RECEIVE_SUCCESS = 'COMMENTS_RECEIVE_SUCCESS';
export const COMMENTS_RECEIVE_FAIL = 'COMMENTS_RECEIVE_FAIL';
export const REPLY_SEND_SUCCESS = 'REPLY_SEND_SUCCESS';
export const REPLY_SEND_FAIL = 'REPLY_SEND_FAIL';
export const DELETE_COMMENT_SUCCESS = 'COMMENT_DELETE_SUCCESSFUL';
export const DELETE_COMMENT_FAIL = 'COMMENT_DELETE_FAIL';
export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAIL = 'EDIT_COMMENT_FAIL';

export function fetchCommentsIfNeeded(post_id){
  return (dispatch, getState) => {
    if (shouldFetchComments(post_id, getState())) {
      return dispatch(fetchComments(post_id))
    }
  }
}

function shouldFetchComments(state, post_id) {
    //currently works better this way
    return true;
}

export const fetchComments = post_id => dispatch => {
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

export const deleteReply = comment_id => dispatch => {
  deleteComment(comment_id)
    .then(response => dispatch(commentDeleteSuccessful(response.id)))
    .catch(error => dispatch(errorDeletingComment(error)));
}

export const commentDeleteSuccessful = comment_id => ({
  type: DELETE_COMMENT_SUCCESS,
  comment_id: comment_id
})

export const errorDeletingComment = error => ({
  type: DELETE_COMMENT_FAIL,
  error: error
})

export const editReply = reply => dispatch => {
  editComment(reply)
    .then(response => dispatch(updateComment(response)))
    .catch(error => dispatch(errorEditingComment(error)));
}

export const updateComment = response => ({
  type: UPDATE_COMMENT_SUCCESS,
  response: response
});

export const errorEditingComment = error => ({
  type: EDIT_COMMENT_FAIL,
  error: error
});

export const submitReply = reply => dispatch => {
  submitComment(reply)
    .then(response => dispatch(replyReceived(response)))
    .catch(error => dispatch(errorSubmittingReply(error)));
}

export const replyReceived = response => ({
  type: REPLY_SEND_SUCCESS,
  response: response
});

export const errorSubmittingReply = error => ({
  type: REPLY_SEND_FAIL,
  error: error
});
