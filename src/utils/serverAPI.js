
const api = "http://localhost:3001"
const headers = {
  Authorization: 'some-token',
  'content-type': 'application/json',
  'cache-control': 'no-cache',
};

// export function fetchOffers(dispatch) {
// 	const request = axios({
// 		method: 'GET',
// 		url: `${BASE_URL}/offers`,
// 		headers: {
//     Authorization: 'Granted',
//     'content-type': 'application/json',
//     'cache-control': 'no-cache',
//   }
// 	});
//
// 	request.then((response) => {
// 		dispatch(fetchOffersSuccess(response));
// 	})
// 	.catch((err) => {
// 		dispatch(fetchOffersError(err))
// 	})
//
// 	return {
// 		type: FETCH_OFFERS,
// 		payload: request
// 	};
// }

export const getPosts = () =>
  fetch(`${api}/posts`, {
    method: 'GET',
    headers: {
      ...headers,
    },
  }).then(res => res.json())
    .then(data => data);

export const getCategories = () =>
  fetch(`${api}/categories`, {
    method: 'GET',
    headers: {
      ...headers,
    },
  }).then(res => res.json())
    .then(data => data);

export const getPostsFromCategory = (category) =>
  fetch(`${api}/${category}/posts`, {
    method: 'GET',
    headers: {
      ...headers,
    },
  }).then(res => res.json())
    .then(data => data);
