const express= require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog=require('./models/blog');
const { result } = require('lodash');
const app= express();
//connect to mongodb
const dbURI ='mongodb+srv://nodeproj:whitelighters@nunukive.tyc9j.mongodb.net/nukive?retryWrites=true&w=majority&appName=nunukive';
mongoose.connect(dbURI)
.then((result)=>console.log(app.listen(3000)+"now listening for requests"))
.catch((err)=>console.log(err));

//register view engine
app.set('view engine', 'ejs');


//listen for requests

//middleware and static files 
app.use(express.static("public"));

app.use(morgan('dev'));


app.get('/',(req,res)=>
    {
        res.redirect('/blogs');
    });

app.get('/about',(req,res)=>
    {
        res.render('about',{title: 'about'});
    });


//blog routes

app.get('/blogs',(req,res)=>
{
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('index',{title: 'all entries', blogs: result})
    }).catch((err)=>{console.log(err)});
})

app.get('/arkive/create',(req,res)=>{
    res.render('create',{title: 'creat'}); 
})

app.use((req,res)=>
{
res.status(404).render('404',{title: '404'});
})
 
