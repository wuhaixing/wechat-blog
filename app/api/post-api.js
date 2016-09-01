import axios from 'axios';
import store from '../store';
import {
  fetchPostsSuccess,
  getPostsSuccess,
  uploadCoverSuccess,
  addPostSuccess,
  previewPostSuccess,
  sendPostSuccess,
  deletePostSuccess,
  getPostSuccess } from '../actions/post-actions';

  /**
   * Fetch posts
   */

export function fetchPosts() {
  return axios.get('/api/posts')
    .then(response => {
      var posts = response.data
      if(posts && posts.length > 0) {
        posts = posts.map((post,index) => {
          post.id = index
          return axios.post('http://localhost:3001/posts',post)
        })
      }
      return posts
    })
    .then(posts => {
      store.dispatch(fetchPostsSuccess(posts));
      return posts;
    });
}
/**
 * Get all posts
 */

export function getPosts() {
  return axios.get('http://localhost:3001/posts')
    .then(response => {
      store.dispatch(getPostsSuccess(response.data));
      return response;
    });
}

/**
 * Search posts
 */

export function searchPosts(query = '') {
  return axios.get('http://localhost:3001/posts?q='+ query)
    .then(response => {
      store.dispatch(getPostsSuccess(response.data));
      return response;
    });
}

export function uploadCover(file) {
    var form = new FormData();
    form.append('cover',file);
    return axios.put('/upload', form)
          .then(response => response.data)
          .then(data => {
            if(data.errcode) {
              console.log(data.errmsg);
              throw new Error(data)
            } else {
              return axios.post('http://localhost:3001/medias/',data)
            }
          })
          .then(response => {
            store.dispatch(uploadCoverSuccess(response.data));
            return response;
          })
          .catch(function (err) {
            console.log(err);
          });

}
/**
 * Add a post
 */

export function addPost(post) {
  return axios.post('/add',post)
              .then(response => response.data)
              .then(data => {
                console.log(data);
                post.id = Date.now();
                post.mediaId = data.media_id;
                return axios.post('http://localhost:3001/posts/',post)
              })
              .then(response => {
                store.dispatch(addPostSuccess(post));
                return response;
              });
}
/**
 * preview a post
 */

export function previewPost(mediaId,openId) {
  return axios.post('/preview',{
                  "mediaId":mediaId,
                  "openId":openId,
                })
              .then(response => {
                store.dispatch(previewPostSuccess(mediaId));
                return response;
              });
}
/**
 * send a post
 */

export function sendPost(mediaId) {
  return axios.post('/send',{"mediaId":mediaId})
              .then(response => {
                store.dispatch(sendPostSuccess(mediaId));
                return response;
              });
}
/**
 * Delete a post
 */

export function deletePost(post) {
  return axios.post('/del',post)
              .then(response => response.data)
              .then(data => {
                if(data.errcode === 0) {
                    return axios.delete('http://localhost:3001/posts/' + post.id)
                } else {
                  throw new Error(data)
                }
              })
              .then(response => {
                store.dispatch(deletePostSuccess(post.id));
                return response;
              })
              .catch(err => {
                console.log(err.errmsg);
              });

}

/**
 * getPost() is much more complex because it has to make
 * three XHR requests to get all the profile info.
 */

export function getPost(postId) {

  // Start with an empty profile object and build it up
  // from multiple XHR requests.

  // Get the post data from our local database.
  return axios.get('http://localhost:3001/posts/' + postId)
    .then(response => {

      let post = response.data;

      store.dispatch(getPostSuccess(post));

      return response;

    });

}
