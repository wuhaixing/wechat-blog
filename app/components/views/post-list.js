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
                      <button onClick={props.previewPost.bind(null, post.media_id)} className="btn btn-primary">预览</button>
                      <button onClick={props.sendPost.bind(null, post.media_id)} className="btn btn-primary">群发</button>
                      <button onClick={props.deletePost.bind(null, post)} className="btn btn-danger">删除</button>
                    </div>
                  </div>
                );
              })
            }
          </div>
          :
          <div className="row text-center">
            <Link to='/posts/new'><h1>创建第一篇文章！</h1></Link>
            <span>或者</span><br/>
            <button onClick={props.fetchPosts.bind(null)} className="btn btn-default">下载文章数据</button>
          </div>
      }
    </div>
  );
}
