import { combineReducers } from 'redux'
import posts from './post'
import categories from './category'
import comments from './comment'


export default combineReducers({
  categories,
  posts,
  comments,
});
