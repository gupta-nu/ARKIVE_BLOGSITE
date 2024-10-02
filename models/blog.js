const mongoose= require('mongoose');
const Scehma = mongoose.Schema;

const blogSchema= new Schema(
    {
        title:{
            type:String,
            required: true
        },
        snippet :{
            type: String,
            required: true
        },
        body : {
            type :String,
            required :true
        }
    }, {timestamps : true});