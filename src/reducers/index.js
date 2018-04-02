import { combineReducers } from 'redux'
import posts from './post'
import categories from './category'
import comments from './comment'
import user from './user'


export default combineReducers({
  posts,
  comments,
  categories,
  user,
});
