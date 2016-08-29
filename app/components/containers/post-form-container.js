import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import PostForm from '../views/post-form';
import * as postApi from '../../api/post-api';

const PostFormContainer = React.createClass({
  getInitialState: function () {
      return {
        cover: {}
      };
  },
  uploadCover: function(files) {
    this.setState({
      cover:files[0]
    });
    postApi.uploadCover(files[0])
  },
  add: function(event) {
    event.preventDefault();

    // By assigning a "child" ref to <SearchForm />, we
    // can use that reference to gain access to the
    // .getQuery() method. See the code for
    // <SearchForm /> to see how it returns a value.
    let post = this.refs.child.getPost();
    if(post && post.title) {
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
      <PostForm add={this.add}
        uploadCover={this.uploadCover}
        cover={this.state.cover}
        uploadedCover = {this.props.uploadedCover}
        ref="child"  />
    );
  }

});

const mapStateToProps = function(store) {
  return {
    post: store.postState.post,
    uploadedCover:store.postState.uploadedCover
  };
};

export default connect(mapStateToProps)(PostFormContainer);
