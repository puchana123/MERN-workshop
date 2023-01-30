// ติดต่อกับฐานข้อมูล + ดำเนินการ
const slugtify = require('slugify') //เพิ่ม - ลงในช่องว่าง
const Blogs = require('../models/blogModel')
const {v4:uuidv4} = require('uuid')

// บันทึกข้อมูล
exports.create = (req,res)=>{

    const {title,content,author} = req.body
    let slug = slugtify(title)

    if(!slug){
        slug = uuidv4()
    }

    //validate data
    switch (true) {
        case !title:
            return res.status(400).json({error:'กรุณาป้อนชื่อบทความ'})
            break;
        case !content:
            return res.status(400).json({error:'กรุณาป้อนเนื้อหาบทความ'})
            break
    }

    //save data
    Blogs.create({title,content,author,slug},(err,blog)=>{
        if(err){
            res.status(400).json({error:"ชื่อบทความถูกใช้แล้ว"})
        }
        res.json(blog)
    })

}

//ดึงข้อมูลทั้งหมดมาแสดง
exports.getAllBlogs = (req,res)=>{
    Blogs.find({}).exec((err,blogs)=>{
        res.json(blogs)
    })
}

//ดึงข้อมูลตาม slug
exports.singleBlog = (req,res)=>{
    const {slug} = req.params
    Blogs.findOne({slug}).exec((err,blog)=>{
        res.json(blog)
    })
}

//ลบบทความตาม slug
exports.remove = (req,res)=>{
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).exec((err,blog)=>{
        if(err){
            console.log(err);
        }
        res.json({message:'ลบบทความเรียบรร้อย'})
    })
}

//แก้ไขข้อมูล
exports.update = (req,res)=>{
    const {slug} = req.params
    const {title,content,author} = req.body
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true})
    .exec((err,blog)=>{
        if(err)alert(err)
        res.json(blog)
    })
}