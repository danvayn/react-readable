export const SORT_POSTS_BY_HIGHEST_VOTE = 'SORT_POSTS_BY_HIGHEST_VOTE';
export const SORT_POSTS_BY_LOWEST_VOTE = 'SORT_POSTS_BY_LOWEST_VOTE';
export const SORT_POSTS_BY_NEW = 'SORT_POSTS_BY_NEW';
export const SORT_POSTS_BY_OLD = 'SORT_POSTS_BY_OLD';

export const SORT_COMMENTS_BY_NEW = 'SORT_COMMENTS_BY_NEW';
export const SORT_COMMENTS_BY_OLD = 'SORT_COMMENTS_BY_OLD';
export const SORT_COMMENTS_BY_HIGHEST_VOTE = 'SORT_COMMENTS_BY_HIGHEST_VOTE';
export const SORT_COMMENTS_BY_LOWEST_VOTE = 'SORT_COMMENTS_BY_LOWEST_VOTE';

//post actions
export const sortPostsByNew = () => ({
  type: SORT_POSTS_BY_NEW,
});
export const sortPostsByOld = () => ({
  type: SORT_POSTS_BY_OLD,
});
export const sortPostsByHighestVote = () => ({
  type: SORT_POSTS_BY_HIGHEST_VOTE,
});
export const sortPostsByLowestVote = () => ({
  type: SORT_POSTS_BY_LOWEST_VOTE,
});

//comment actions
export const sortCommentsByNew = () => ({
  type: SORT_COMMENTS_BY_NEW,
});
export const sortCommentsByOld = () => ({
  type: SORT_COMMENTS_BY_OLD,
});
export const sortCommentsByHighestVote = () => ({
  type: SORT_COMMENTS_BY_HIGHEST_VOTE,
});
export const sortCommentsByLowestVote = () => ({
  type: SORT_COMMENTS_BY_LOWEST_VOTE,
});
