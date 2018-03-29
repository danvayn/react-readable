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
