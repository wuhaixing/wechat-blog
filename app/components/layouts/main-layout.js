import React from 'react';
import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default function(props) {
  return (
    <div className="app">
      <header className="primary-header"></header>
      <aside className="primary-aside">
        <ul>
          <li><Link to="/" activeClassName="active">首页</Link></li>
          <li><Link to="/posts" activeClassName="active">文章</Link></li>
          <li><Link to="/galleries" activeClassName="active">媒体素材</Link></li>
          <li><Link to="/templates" activeClassName="active">模板</Link></li>
          <li><Link to="/users" activeClassName="active">订阅用户</Link></li>
          <li><Link to="/widgets" activeClassName="active">Widgets</Link></li>
        </ul>
      </aside>
      <main>
        {props.children}
      </main>
    </div>
    );
}
