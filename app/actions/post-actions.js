import * as types from '../actions/action-types';

export function fetchPostsSuccess(posts) {
  return {
    type: types.FETCH_POSTS_SUCCESS,
    posts
  };
}

export function getPostsSuccess(posts) {
  return {
    type: types.GET_POSTS_SUCCESS,
    posts
  };
}

export function deletePostSuccess(postId) {
  return {
    type: types.DELETE_POST_SUCCESS,
    postId
  };
}

export function getPostSuccess(post) {
  return {
    type: types.GET_POST_SUCCESS,
    post
  };
}
export function uploadCoverSuccess(uploadedCover) {
  return {
    type: types.UPLOAD_COVER_SUCCESS,
    uploadedCover
  };
}
export function addPostSuccess(post) {
  return {
    type: types.ADD_POST_SUCCESS,
    post
  };
}
export function previewPostSuccess(post) {
  return {
    type: types.PREVIEW_POST_SUCCESS,
    post
  };
}
export function sendPostSuccess(post) {
  return {
    type: types.SEND_POST_SUCCESS,
    post
  };
}
