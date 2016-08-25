import React from 'react';

// Using "Stateless Functional Components"
export default function(props) {
  return (
    <div className="post">
        <div className="details">
        <h1>{props.title}</h1>
        <strong>{props.author}</strong>
        <p>{props.content}</p>
      </div>
    </div>
  );
}
