import { randomID } from './misc'

const api = "http://localhost:3001"
const headers = {
  Authorization: 'some-token',
  'content-type': 'application/json',
  'cache-control': 'no-cache',
};

//GET commands

export const getPosts = () =>
  fetch(`${api}/posts`, {
    method: 'GET',
    headers: {
      ...headers,
    },
  }).then(res => res.json())
    .then(data => data);

export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, {
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


export const getComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, {
    method: 'GET',
    headers: {
      ...headers,
    },
  }).then(res => res.json())
    .then(data => data);

//POST commands (submitting)

export const submitComment = (comment) =>
  fetch(`${api}/comments`, {
    body: JSON.stringify({...comment, id: randomID(5)}),
    method: 'POST',
    headers: {
      ...headers,
    },
  }).then(res => res.json())
    .then(data => data);

export const postPost = (post) =>
  fetch(`${api}/posts`, {
    body: JSON.stringify({...post, id: randomID(5)}),
    method: 'POST',
    headers: {
      ...headers,
    },
  }).then(res => res.json())
    .then(data => data);

//DELETE Commands (removing)

export const deleteComment = (comment_id) =>
  fetch(`${api}/comments/${comment_id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
    },
  }).then(res => res.json())
    .then(data => data);
