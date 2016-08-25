import React from 'react';
import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default function(props) {
  const posts = props.posts
  return (
    <div className="data-list">
      {
        posts && posts.length > 0 ?
          <div>
            <div className="row text-right">
                <Link className="btn btn-primary" to='/posts/new'>新建</Link>
            </div>
            <hr/>
            {
              posts.map(post => {
                return (
                  <div key={post.id} className="data-list-item">
                    <div className="details">
                      <Link to={'/posts/' + post.id}>{post.title}</Link>
                    </div>
                    <div className="controls">
                      <button onClick={props.deletePost.bind(null, post.id)} className="btn btn-danger">删除</button>
                    </div>
                  </div>
                );
              })
            }
          </div>
          :
          <div className="new">
            <Link to='/posts/new'><h1>创建第一篇文章！</h1></Link>
          </div>
      }
    </div>
  );
}
