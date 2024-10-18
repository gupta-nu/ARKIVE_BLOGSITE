const express= require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog=require('./models/blog');
const { result } = require('lodash');
const app= express();
//connect to mongodb
const dbURI ='mongodb+srv://nodeproj:whitelighters@nunukive.tyc9j.mongodb.net/nukive?retryWrites=true&w=majority&appName=nunukive';
mongoose.connect(dbURI)
.then((result)=>{app.listen(3000,()=>{console.log("Now listenng for requests on port 3000");});}).catch((err)=>{console.log(err)});

//register view engine
app.set('view engine', 'ejs');


//listen for requests

//middleware and static files 
app.use(express.static("public"));

//use to handling form submission and convertin data into js obj
app.use(express.urlencoded({extended:true}));
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


app.post('/blogs',(req,res)=>{
const blog= new Blog(req.body)
blog.save()
.then((result)=>{
    res.redirect('/blogs');
}).catch((err)=>{
    console.log(err)
})
})

app.get('/blogs/create',(req,res)=>{
    res.render('create',{title: 'create'}); 
})

app.use((req,res)=>
{
res.status(404).render('404',{title: '404'});
})

