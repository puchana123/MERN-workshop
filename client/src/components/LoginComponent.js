import Navbar from "./Navbar";
import { useState,useEffect } from "react";
import axios from 'axios'
import { authenticate, getUser } from "../services/authorize";
import {useNavigate} from "react-router-dom";
  

const LoginComponent = (props)=>{

    const navigate = useNavigate()

    const [state,setState] = useState({
        username:'',
        password:''
    })
    
    const {username,password} = state

    const inputValue = (name) => (e)=>{
        setState({...state,[name]:e.target.value})
    }

    const submitForm = (e)=>{
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API}/login`,{username,password})
        .then(response=>{
            //sucess login
            console.log('Success');
            authenticate(response,()=>navigate('/create'))
            
        }).catch(err=>console.log(err.response.data.error))
    }

    useEffect(()=>{
        getUser() && navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className='container p-5'>
          <Navbar/>
          <h1>Admin | Login</h1>
          <form onSubmit={submitForm}>
              <div className="form-group">
                  <label>Username</label>
                  <input type='text' className="form-control" 
                      value={username} 
                      onChange={inputValue('username')}
                  />
              </div>
              <div className="form-group">
                  <label>Password</label>
                  <input type='password' className="form-control" 
                      value={password}
                      onChange={inputValue('password')}   
                  />
              </div>
              <br/>
              <input type='submit' value='เข้าสู่ระบบ' className="btn btn-primary" />
          </form>
        </div>
      );
}

export default LoginComponent