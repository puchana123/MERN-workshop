import './App.css';
import Navbar from './components/Navbar';
import axios from 'axios'
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import parse from 'html-react-parser';
import { getUser,getToken } from './services/authorize';

function App() {

  const [blogs,setBlogs] = useState([])

  const fetchData = ()=>{
    axios.get(`${process.env.REACT_APP_API}/blogs`)
    .then(response=>{
      setBlogs(response.data)
    }).catch(err=>alert(err))
  }

  useEffect(()=>{
    fetchData()
  },[])

  const confirmDelete = (slug)=>{
    Swal.fire({
      title: 'ต้องการลบบทความหรือไม่?',
      text: "คุณจะไม่สามารย้อนกลับได้อีก!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // confirmed
      if (result.isConfirmed) {
        deleteBlog(slug)
      }
    })
  }

  const deleteBlog = (slug)=>{
  
    axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`,
    {
        headers:{
            Authorization:`Bearer ${getToken()}`
        }
    })
    .then(response=>{
      Swal.fire({
        title:'Deleted',
        text:response.data.message,
        icon:'success'}
      )
      fetchData()
    }).catch(err=>alert(err))
  }

  return (
    <div className='container p-5'>
      <Navbar/>
      <h1>MERN STACK | Workshop</h1><hr/>
      {blogs.map((blog,index)=>{
        return(
          <div className='row'key={index} style={{borderBottom:'1px solid gray'}}>
            <div className='col pt-2 pb-2'>
            <Link to={`/blog/${blog.slug}`}>
              <h2 className='fw-bold'>{blog.title}</h2>
            </Link>
              <p>{parse(blog.content.substring(0,80),{trim:true})} ...</p>
              <p className='text-muted'>ผู้เขียน : {blog.author}, เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
              {getUser() &&
                <div>
                  <Link className='btn btn-outline-success' to={`/blog/edit/${blog.slug}`}>แก้ไขบทความ</Link> &nbsp;
                  <button className='btn btn-outline-danger' onClick={()=>confirmDelete(blog.slug)}>ลบบทความ</button>
                </div>}
            </div>
          </div>
      )})}
      <br/>
      <a className='btn btn-primary' href='/create'>เขียนบทความ</a>
    </div>
  );
}

export default App;
