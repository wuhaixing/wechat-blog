import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
  posts: [],
  post: {},
  uploadedCover: {}
};

const postReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.GET_POSTS_SUCCESS:
      return Object.assign({}, state, { posts: action.posts });

    case types.DELETE_POST_SUCCESS:

      // Use lodash to create a new post array without the post we want to remove
      const newUsers = _.filter(state.posts, post => post.id != action.postId);
      return Object.assign({}, state, { posts: newUsers });

    case types.GET_POST_SUCCESS:
      return Object.assign({}, state, { post: action.post });
    case types.UPLOAD_COVER_SUCCESS:
      return Object.assign({}, state, { uploadedCover: action.uploadedCover });
    case types.ADD_POST_SUCCESS:
      return Object.assign({}, state, { post: action.post });
    case types.SEND_POST_SUCCESS:
        return Object.assign({}, state, { post: action.post });
  }

  return state;

}

export default postReducer;
