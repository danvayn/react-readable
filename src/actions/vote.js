// export const persistVotePost = (id, voteDirection, voteType) => (dispatch) => {
//   persistVote(id, voteDirection, voteType)
//     .then(data => dispatch(votePostSuccess(data)))
//     .catch(error => dispatch(failedVote(error)));
// };

export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'

export const voteUpPost = voteID => ({
  type: UPVOTE_POST, voteID,
})

export const voteDownPost = voteID => ({
  type: DOWNVOTE_POST, voteID,
})

export const voteUpComment = voteID => ({
  type: UPVOTE_COMMENT, voteID,
})

export const voteDownComment = voteID => ({
  type: DOWNVOTE_COMMENT, voteID,
})
