const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const jwt = require('jsonwebtoken');




const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const Post = require('./models/Post');
const fs = require('fs');

const AuthRoute = require('./funtions/Login');
const cookieParser = require('cookie-parser');
const path = require('path');
app.use('/uploads', express.static(__dirname + '/uploads'));




app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
}))



// SERVER SET UP
app.listen(3003,()=>{
    console.log('The Back Server Is Running')
})


// TESTING

app.get('/test',(req, res)=>{
    res.json('test- ok02')
})



// CONNECT DATABASE
mongoose.connect('mongodb+srv://maxhaotz:6848hao@blog-website.taww1xv.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('DataBase Is Connected')
})



screte = 'aslkfjaslkaopflka';
app.use('/auth',AuthRoute);
app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, screte, {}, (err,info) => {
      if (err) throw err;
      res.json(info);
    });
  });

app.post('/logout',(req,res) => {
    res.cookie('token','').json('ok')
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  const { originalname, path } = req.file; // Retrieve originalname and path from req.file
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext; // Append the extension to the path

  fs.renameSync(path, newPath);

  const {token} = req.cookies;
  jwt.verify(token, screte, {}, async (err,info) => {
    if (err) throw err;
    const {title,summary,content} = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover:newPath,
      author:info.id


  });
  res.json(postDoc)

});



})
app.get('/post', async (req, res) => {
  res.json(await Post.find()
  .populate('author', ['username'])
  .sort({createdAt: -1})
  .limit(20)
  
  );
});

app.get('/post/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
});

app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  }

  
  const {token} = req.cookies;
  jwt.verify(token, screte, {}, async (err,info) => {
    if (err) throw err;
    const {id,title,summary,content} = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });

});