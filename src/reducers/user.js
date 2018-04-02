import {
  UPDATE_USER,
} from '../actions/user';

const initialState = {
  username: "bobby"
};
const user = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_USER:
      return {
        ...state,
        username: action.name
      }
    default:
      return state;
  }
};


export default user;
