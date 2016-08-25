import React from 'react';
import { connect } from 'react-redux';
import PostList from '../views/post-list';
import * as postApi from '../../api/post-api';
import store from '../../store';
import { loadSearchLayout } from '../../actions/search-layout-actions';

const PostListContainer = React.createClass({

  componentDidMount: function() {
    postApi.getPosts();
    store.dispatch(loadSearchLayout('posts', '文章'));
  },

  render: function() {
    return (
      <PostList posts={this.props.posts} deletePost={postApi.deletePost} />
    );
  }

});

const mapStateToProps = function(store) {
  return {
    posts: store.postState.posts
  };
};

export default connect(mapStateToProps)(PostListContainer);
