import {
  UPDATE_USER,
  REMEMBER_VOTE,
} from '../actions/vote'

const initialState = {
  username: "bobby",
  votes: [],
};

const user = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_USER:
      return {
        ...state,
        username: action.name
      }
    case REMEMBER_VOTE:
      const {voteID, voteDirection, user} = action
      return {
        ...state,
        votes: {
          ...state.votes,
          [voteID]: {
            ...state.votes[voteID],
            [user]: voteDirection
          }
        }
      }
    default:
      return state;
  }
};

export default user;
