import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const ADD_COMENT = 'ADD_COMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export function fetchPosts() {
  const request = axios.get('/post/');
  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function fetchPost(id) {
  const request = axios.get('/post/' + id);
  return {
    type: FETCH_POST,
    payload: request
  };
}

export function createPost(title) {
  axios.post('/post/', { title });
  const request = axios.get('/post/');

  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export function deletePost(id) {
  axios.delete('/post/' + id);
  const request = axios.get('/post/');

  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export function addComment(id, comment) {
  axios.patch('/post/comment/' + id, {comment});
  const request = axios.get('/post/' + id);

  return {
    type: FETCH_POST,
    payload: request
  }
}

export function deleteComment(id, comment) {
  axios.patch('/post/' + id, {comment});
  const request = axios.get('/post/' + id);

  return {
    type: FETCH_POST,
    payload: request
  }
}
