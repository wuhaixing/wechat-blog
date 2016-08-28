/**
 * This is just a dummy server to facilidate our React SPA examples.
 * For a more professional setup of Express, see...
 * http://expressjs.com/en/starter/generator.html
 */

import express from 'express';
import path from 'path';
import multer from 'multer';
import Weixin from 'wechat-es';
import { MaterialManager } from 'wechat-es';

const weixin = new Weixin({
	appId:'wx212af6a39faa2819',
	appSecret: 'ab0590c7f4d5fc9acbab77ac8408d9d7',
	token:'wx212af6a39faa2819'
})

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


/**
 * Always serve the same HTML file for all requests
 */

app.get('*', function(req, res, next) {
  console.log('Request: [GET]', req.originalUrl)
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.put("/upload", upload.single('cover'),function (req, res, next) {
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
