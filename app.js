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

//mongoose and mongo sandbox routes 

app.get('/add-blog',(req,res)=>{
    const blog= new Blog({
        title : 'new entry',
        snippet : 'testing',
        body: 'more about testing',
    });

    blog.save()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{console.log(err)});
})

app.get('/',(req,res)=>
    {
        const blogs=[
            {title :'yoshi finds egg',snippet:' lorem ispum dolor somethingsomethin'},
            {title: 'mario saves princess', snippet: 'lorem ipsum dolor sit amet consectetur adipiscing elit'},
            {title: 'luigi enters the haunted mansion', snippet: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'},
            {title: 'peach throws a party', snippet: 'ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi'},
            {title: 'bowser attacks the kingdom', snippet: 'aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit'},
        ]
        res.render('index',{title: 'Home', blogs});
    });

app.get('/about',(req,res)=>
    {
        res.render('about',{title: 'about'});
    });


app.get('/arkive/create',(req,res)=>{
    res.render('create',{title: 'creat'}); 
})

app.use((req,res)=>
{
res.status(404).render('404',{title: '404'});
})
 
