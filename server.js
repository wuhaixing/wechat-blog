/**
 * This is just a dummy server to facilidate our React SPA examples.
 * For a more professional setup of Express, see...
 * http://expressjs.com/en/starter/generator.html
 */
require('dotenv').config();
import express from 'express';
import path from 'path';
import multer from 'multer';
import bodyParser from 'body-parser';
import Weixin from 'wechat-es';
import {
  MaterialManager,
  MassMessageManager,
  UserManager } from 'wechat-es';

const weixin = new Weixin({
	appId:process.env.APP_ID,
	appSecret: process.env.APP_SECRET,
	token:process.env.TOKEN
})
const adminOpenId = process.env.ADMIN_OPEN_ID

const talker = weixin.getTalker()
const storage = multer.diskStorage({
  destination: 'public/images/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname  )
  }
})

const upload = multer({ storage: storage })

const app = express();


/**
 * Anything in public can be accessed statically without
 * this express router getting involved
 */

app.use(express.static(path.join(__dirname, 'public'), {
  dotfiles: 'ignore',
  index: false
}));

app.use(bodyParser.json());

app.get('/api/users',function (req, res) {

  const msg = UserManager.getList()
  console.log(msg)
  talker.send(msg)
        .then(json => {
          if(json.total >= 1) {
            const openIds = json.data.openid
            console.log(openIds)
            return talker.send(UserManager.batchGetInfo(openIds))
          } else {
            return {
              "user_info_list": []
            }
          }
        })
        .then(json => {
          const userInfoList = json.user_info_list
          console.log(userInfoList)
          res.send(userInfoList)
        })
        .catch(err => {
          console.log(err);
          res.send(err);
        })
});

app.get('/api/posts',function (req, res) {
  const msg = MaterialManager.batchGet()
  console.log(msg)
  talker.send(msg)
        .then(json => {
          return json.item
        })
        .then(items => {
          var posts = items.map(item => {
            let article = item.content.news_item[0]
            article.media_id = item.media_id
            return article
          })
          console.log(posts)
          res.send(posts)
        })
        .catch(err => {
          console.log(err);
          res.send(err);
        })
});

app.put("/upload", upload.single('cover'),function (req, res) {
  const uploadedImg = req.file.path
  talker.send(MaterialManager.image(uploadedImg))
        .then(json => {
          console.log(json)
          res.send(json)
        })
        .catch(err => {
          console.log(err);
          res.send(err);
        })
});

app.post('/add',function (req, res) {
  const article = req.body
  var articles = MaterialManager.addArticle(article)
  talker.send(MaterialManager.articles(articles))
        .then(json => {
          console.log(json)
          res.send(json)
        })
        .catch(err => {
          console.log(err);
          res.send(err);
        })
});
app.post('/del',function (req, res) {
  const post = req.body
  console.log(post)
  const msg = MaterialManager.del(post.media_id)
  console.log(msg)
  talker.send(msg)
        .then(json => {
          console.log(json)
          res.send(json)
        })
        .catch(err => {
          console.log(err);
          res.send(err);
        })
});
app.post('/send',function (req, res) {

  const mediaId = req.body.mediaId;

  const msg = MassMessageManager.newsToTag(mediaId)
  console.log(msg)
  talker.send(msg)
        .then(json => {
          console.log(json)
          res.send(json)
        })
        .catch(err => {
          console.log(err);
          res.send(err);
        })
});

app.post('/preview',function (req, res) {

  const mediaId = req.body.mediaId;
  const openId = req.body.openId;

  const msg = MassMessageManager.newsToUsers(mediaId,adminOpenId,true)
  console.log(msg)
  talker.send(msg)
        .then(json => {
          console.log(json)
          res.send(json)
        })
        .catch(err => {
          console.log(err);
          res.send(err);
        })
});
/**
 * Always serve the same HTML file for none api requests
 */

app.get('*', function(req, res, next) {
  console.log('Request: [GET]', req.originalUrl)
  res.sendFile(path.resolve(__dirname, 'index.html'));
});


/**
 * Error Handling
 */

app.use(function(req, res, next) {
  console.log('404')
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.sendStatus(err.status || 500);
});


/**
 * Start Server
 */

const port = 3000;
app.listen(port);

console.log('Serving: localhost:' + port);
