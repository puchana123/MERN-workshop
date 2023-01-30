import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from 'axios'
import Swal from 'sweetalert2'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { getToken } from "../services/authorize";

function EditComponent() {

    const [state,setState] = useState({
        title:'',
        author:''
    })

    const {title,author} = state

    const [content,setContent] = useState('')

    let {slug} = useParams() // get url from /:slug

    //get data from api
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/blog/${slug}`)
        .then(response=>{
            const {title,content,author,slug} = response.data
            setState({...state,title,author,slug})
            setContent(content)
        }).catch(err=>alert(err))
        // eslint-disable-next-line
    },[])

    const showEditForm = ()=>{
        return(
            <form onSubmit={submitForm}>
            <div className="form-group">
                <label>ชื่อบทความ</label>
                <input type='text' className="form-control" 
                    value={title} 
                    onChange={inputValue('title')}
                />
            </div>
            <div className="form-group">
                <label>รายละเอียด</label>
                <ReactQuill 
                    value={content}
                    onChange={submitContent}
                    theme='snow'
                />
            </div>
            <div className="form-group">
                <label>ผู้แต่ง</label>
                <input type='text' className="form-control" 
                    value={author}
                    onChange={inputValue('author')}   
                />
            </div>
            <br/>
            <input type='submit' value='แก้ไข' className="btn btn-primary" />
        </form>
        )
    }

    const inputValue = (name) => (e)=>{
        setState({...state,[name]:e.target.value})
    }

    const submitForm = (e)=>{
        e.preventDefault()
        axios.put(`${process.env.REACT_APP_API}/blog/${slug}`,{title,content,author},
        {
            headers:{
                Authorization:`Bearer ${getToken()}`
            }
        })
        .then(response=>{
            Swal.fire({
                title: 'แจ้งเตือน',
                text: 'แก้ไขข้อมูลเรียบร้อย',
                icon: 'success',
                confirmButtonText: 'OK'
              })
            const {title,content,author,slug} = response.data
            setState({...state,title,author,slug})
            setContent(content)
        }).catch(err=>{
           alert(err)
        })
    }

    const submitContent = (e)=>{
        setContent(e)
    }

    return (
      <div className='container p-5'>
        <Navbar/>
        <h1>แก้ไขบทความ</h1>
            {showEditForm()}
      </div>
    );
  }
  
  export default EditComponent;