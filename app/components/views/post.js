import React from 'react';

// Using "Stateless Functional Components"
export default function(props) {
  return (
    <div className="post">
        <div className="details">
        <a href={props.url}>
          <h1>{props.title}</h1>
        </a>  
        <strong>{props.author}</strong>
        <p>
          <img src={props.thumb_url} width="900"/>
          {props.content}
        </p>
      </div>
    </div>
  );
}
