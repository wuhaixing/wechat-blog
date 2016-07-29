import React from 'react'
import ReactDOM from 'react-dom'
import Editor from "./editor"

const content = <div>
                  <h1>请点击页面编辑</h1>
                  <p>编辑本页内容</p>
                </div>
ReactDOM.render(
  <Editor container="editable" content={content}/>,
  document.getElementById("app")
)
