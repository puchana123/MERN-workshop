const mongoose =require('mongoose')

const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    content:{
        type:{},
        required:true
    },
    author:{
        type:String,
        default:'Admin'
    },
    slug:{
        type:String,
        lowercase:true,
        
    }
},{timestamps:true})

module.exports = mongoose.model('Blogs',blogSchema)