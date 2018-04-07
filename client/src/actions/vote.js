import { sendPostVote, sendCommentVote } from '../utils/serverAPI';
import { updateComment } from './comment'
import { updatePost } from './post'

export const UPDATE_USER = "UPDATE_USER"

export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const REMEMBER_VOTE = "REMEMBER_VOTE"
export const VOTING_ERROR = 'VOTING_ERROR'

export const submitCommentVote = (user, voteID, voteDirection) => dispatch => {
  const voteProps = {user, voteID, voteDirection}
  sendCommentVote({...voteProps})
    .then(response => {
      dispatch(rememberVote({...voteProps}))
      dispatch(updateComment(response))
  })
    .catch(error => dispatch(errorVoting(error)));
}

export const submitPostVote = (user, voteID, voteDirection) => dispatch => {
  const voteProps = {user, voteID, voteDirection}
  sendPostVote({...voteProps})
    .then(response => {
      dispatch(rememberVote({...voteProps}))
      dispatch(updatePost(response))
  })
}

export const updateUser = (name) => ({
  type: UPDATE_USER,
  name: name
});

export const voteUpPost = (user, voteID) => ({
  type: UPVOTE_POST, user, voteID,
})

export const voteDownPost = (user, voteID) => ({
  type: DOWNVOTE_POST, user, voteID,
})

export const voteUpComment = (user, voteID) => ({
  type: UPVOTE_COMMENT, user, voteID,
})

export const voteDownComment = (user, voteID) => ({
  type: DOWNVOTE_COMMENT, user, voteID,
})

export const rememberVote = props => ({
  type: REMEMBER_VOTE, ...props
})

export const errorVoting = error => ({
  type: VOTING_ERROR, error
})
