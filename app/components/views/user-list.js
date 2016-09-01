import React from 'react';
import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default function(props) {
  return (
    <div className="data-list">
      <button onClick={props.fetchUsers.bind(null)} className="btn btn-default">同步用户资料</button>

      {
        props.users && props.users.length > 0 ?
          props.users.map(user => {
            return (
              <div key={user.id} className="data-list-item">
                <div className="details">
                  <Link to={'/users/' + user.id}>
                    <img src={user.headimgurl} width="32" height="32"/><span>{user.nickname}</span>
                  </Link>
                </div>
                <div className="controls">
                  <button onClick={props.deleteUser.bind(null, user.id)} className="delete">删除</button>
                </div>
              </div>
            );
          })
          :
          <div/>
    }

    </div>
  );
}
