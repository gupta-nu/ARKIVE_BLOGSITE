const express= require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogroutes = require('./routes/blogroutes')

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

//blog middlewear used here
app.use('/blogs',blogroutes);


app.use((req,res)=> 
{
res.status(404).render('404',{title: '404'});
})

