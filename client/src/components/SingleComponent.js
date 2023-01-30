import { useParams } from "react-router-dom"
import axios from "axios"
import { useState,useEffect } from "react"
import Navbar from "./Navbar"
import parse from 'html-react-parser';

const SingleComponent = ()=>{

    let {slug} = useParams() // get url from /:slug

    const [blog,setBlog] = useState('')

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/blog/${slug}`)
        .then(response=>{
            setBlog(response.data)
        }).catch(err=>alert(err))
    },[slug])
    
    return(
        <div className="container p-5">
            <Navbar/>
            { blog &&
            <div>
                <h1>{blog.title}</h1>
                <div>{parse(blog.content)}</div>
                <p className='text-muted mt-2'>ผู้เขียน : {blog.author}, เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
            </div>
            }
        </div>
    )
}

export default SingleComponent