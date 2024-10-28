const express = require('express');
const Blog=require('../models/blog'); //here we double dot to come out of the routes folder to go into the models folder
const blogController= require('../controller/BlogController');
const blogdetails= require('../controller/BlogController');
const blogdelete= require('../controller/BlogController');
const blogcreatepost= require('../controller/BlogController');
const blogcreateget= require('../controller/BlogController');

const router= express.Router();

router.get('/',(blogController.blog_index));

router.post('/',(blogController.blog_create_post));

router.get('/create',(blogController.blog_create_get));

router.get('/:id',(blogController.blog_details));

router.delete('/:id',(blogController.blog_delete));

module.exports= router;