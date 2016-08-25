import React from 'react';

const Home = React.createClass({
  render: function() {
    return (
      <div className="home-page">
        <h1>可以发送微信公众号消息的博客</h1>
        <p>
          为了验证wechat-es的Demo应用，演示如何用wechat-es获取用户信息，创建（上传）素材及发送公众号消息。
        </p>
      </div>
    );
  }
});

export default Home;
