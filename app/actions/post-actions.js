import * as types from '../actions/action-types';

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
