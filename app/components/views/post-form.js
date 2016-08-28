import React from 'react';
import Dropzone from 'react-dropzone';

export default React.createClass({
  getPost: function() {
    return {
      "title":this.refs.title.value,
      "thumb_media_id" : this.props.uploadedCover.media_id,
      "show_cover_pic" : this.refs.showCoverPic.checked ? 1 : 0,
      "author":this.refs.author.value,
      "content":this.refs.content.value,
    }
  },

  render: function() {
    return (
      <form onSubmit={this.props.add}>
        <div className="form-group">
          <Dropzone onDrop={this.props.uploadCover} accept={"image/*"}
            style={{
              width:"360px",
              height:"200px",
              border: "2px dashed rgb(102, 102, 102)",
              borderRadius: "5px",
              textAlign:"center"
            }}>
            {
              this.props.cover &&  this.props.cover.preview?
                <img height="196px" src={this.props.cover.preview} />
                :
                <h5>封面 <small>建议尺寸：900像素 * 500像素</small></h5>
            }
          </Dropzone>
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" ref="showCoverPic"/> 封面图片显示在正文中
          </label>
        </div>

        <div className="form-group">
          <input type="text"
            className="form-control title-control"
            name="title" ref="title"
            placeholder="请输入标题"/>
        </div>

        <textarea className="form-control" ref="content" placeholder="正文" />
        <textarea className="form-control" rows="3" ref="digest" placeholder="摘要"></textarea>
        <div className="form-group">
          <input type="text"
            className="form-control post-author"
            name="author" ref="author"
            placeholder="作者"/>
        </div>
        <button className="btn btn-default">保存</button>
      </form>
    );
  }

});
