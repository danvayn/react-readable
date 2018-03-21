import {
  CATEGORY_RECEIVE_SUCCESS,
  CATEGORY_RECEIVE_FAIL,
} from '../actions/category';

const initialState = {
  categoryStatus: {
    error: false,
    loading: true,
  },
  list: [
  ],
};
const category = (state = initialState, action) => {
  const categoriesAction = action.categories
  switch(action.type) {
    case CATEGORY_RECEIVE_SUCCESS:
      return {
        ...state,
        list: categoriesAction.categories,
        categoryStatus: {
          error: false,
          loading: false,
        }
      }
    case CATEGORY_RECEIVE_FAIL:
      return {
        ...state,
        categories: [],
        categoryStatus: {
          error: false,
          loading: false
        }
      }
    default:
      return state;
  }
};


export default category;
