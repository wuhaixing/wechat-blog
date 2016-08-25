import React from 'react';

export default React.createClass({

  getPost: function() {
    return {
      "title":this.refs.title.value,
      "author":this.refs.author.value,
      "content":this.refs.content.value
    }
  },

  render: function() {
    return (
      <form onSubmit={this.props.add} className="search">
        <input type="text" ref="title" placeholder="标题" />
        <input type="text" ref="author" placeholder="作者" />
        <input type="textarea" ref="content" placeholder="内容" />
        <button>保存</button>
      </form>
    );
  }

});
