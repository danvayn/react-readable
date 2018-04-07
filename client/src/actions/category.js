import { getCategories } from '../utils/serverAPI';

export const CATEGORY_RECEIVE_SUCCESS = 'CATEGORY_RECEIVE_SUCCESS';
export const CATEGORY_RECEIVE_FAIL = 'CATEGORY_RECEIVE_FAIL';

export const fetchCategories = () => dispatch =>
  getCategories()
    .then(categories => dispatch(receiveCategories(categories)))
    .catch(error => dispatch(errorReceivingCategories(error)));

export const receiveCategories = categories => ({
  type: CATEGORY_RECEIVE_SUCCESS,
  categories: categories
});

export const errorReceivingCategories = () => ({
  type: CATEGORY_RECEIVE_FAIL,
});
