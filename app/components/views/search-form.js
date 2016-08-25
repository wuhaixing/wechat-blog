import React from 'react';

export default React.createClass({

  getQuery: function() {
    return this.refs.search.value;
  },

  render: function() {
    return (
      <form onSubmit={this.props.search} className="search">
        <input type="text" ref="search" placeholder="关键字..." />
        <button>搜索</button>
      </form>
    );
  }

});
