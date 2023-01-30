import { useState } from "react";
import Navbar from "./Navbar";
import axios from 'axios'
import Swal from 'sweetalert2'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { getUser,getToken } from "../services/authorize";

function FormComponent() {

    const [state,setState] = useState({
        title:'',
        author: getUser()
    })

    const [content,setContent] = useState('')

    const {title,author} = state

    const inputValue = (name) => (e)=>{
        setState({...state,[name]:e.target.value})
    }

    const submitContent = (e)=>{
        setContent(e)
    }

    const submitForm = (e)=>{
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API}/create`,{title,content,author},
        {
            headers:{
                Authorization:`Bearer ${getToken()}`
            }
        })
        .then(response=>{
            Swal.fire({
                title: 'แจ้งเตือน',
                text: 'บันทึกข้อมูลเรียบร้อย',
                icon: 'success',
                confirmButtonText: 'OK'
              })
            setState({...state,title:'',author:''})
            setContent('')
        }).catch(err=>{
            Swal.fire({
                title: 'แจ้งเตือน',
                text: err.response.data.error,
                icon: 'error',
                confirmButtonText: 'OK'
              })
        })
    }

    return (
      <div className='container p-5'>
        <Navbar/>
        <h1>เขียนบทความ</h1>
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
                    className="mb-3"
                    placeholder="เขียนรายละเอียดบทความของคุณ"
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
            <input type='submit' value='บันทึก' className="btn btn-primary" />
        </form>
      </div>
    );
  }
  
  export default FormComponent;