import React from 'react';
import { connect } from 'react-redux';
import Post from '../views/post';
import * as postApi from '../../api/post-api';

const PostContainer = React.createClass({

  componentDidMount: function() {
    let postId = this.props.params.postId
    if(postId) {
      postApi.getPost(postId)
    }
  },

  render: function() {
    return (
      <Post {...this.props.post} />
    );
  }

});

const mapStateToProps = function(store) {
  return {
    post: store.postState.post
  };
};

export default connect(mapStateToProps)(PostContainer);
