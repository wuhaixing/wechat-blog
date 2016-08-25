import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import PostForm from '../views/post-form';
import * as postApi from '../../api/post-api';

const PostFormContainer = React.createClass({
  add: function(event) {
    event.preventDefault();

    // By assigning a "child" ref to <SearchForm />, we
    // can use that reference to gain access to the
    // .getQuery() method. See the code for
    // <SearchForm /> to see how it returns a value.
    let post = this.refs.child.getPost();
    if(post && post.title) {
      post.id = Date.now()
      postApi.addPost(post)
              .then(response => {
                console.log(response)
                browserHistory.push('/posts')
              })
    } else {
      alert('标题不能为空')
    }
  },

  render: function() {
    return (
      <PostForm add={this.add} ref="child"  />
    );
  }

});

const mapStateToProps = function(store) {
  return {
    post: store.postState.post
  };
};

export default connect(mapStateToProps)(PostFormContainer);