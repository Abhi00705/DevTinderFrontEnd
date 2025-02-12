import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import {  useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';

const Login = () => {
    const[emailId, setEmailId] = useState("balram@gmail.com");
    const[password,  setPassword] = useState("Balram123*#@");
    const dispatch = useDispatch();
    const selector = useSelector(store => store.user);
  
   const navigate = useNavigate();
   const[error, setError] = useState();

    const  clickHandler = async() => {
        try{
            const res = await axios({
            method:'post',
            url: BASE_URL+'/login',
            data:{
                emailId: emailId,
                password: password,
            },
            withCredentials: true,  //default value is false

        }
    );

    console.log(res.data);
    dispatch(addUser(res.data));
    navigate('/');
    }
        catch(err){
            setError(err?.response?.data);
            // console.error(err);
    }
        
    }

    
   
  return (
    <>
        <div className="card bg-base-300 text-neutral-content w-96 m-auto mt-32 w-[25rem] h-[25rem] flex items-center justify-center gap-5">
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Email Id</span>
              
            </div>
            <input type="text" placeholder="xxxx@gmail.com" className="input input-bordered w-full max-w-xs" 
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
            />
            
            </label> 
 
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Password</span>
              
            </div>
            <input type="text" placeholder="password" className="input input-bordered w-full max-w-xs" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            
            </label> 
           {/* { console.log("checking")}
            {!selector?.emailId & <p className='text-red-500'>no credential input!</p> } */}
            { <p className='text-red-500'>{error}</p>}

            <button className='bg-slate-700 text-white w-[8rem] h-[3rem] font-semibold rounded-sm'
                    onClick={()=> clickHandler()}
            >Login</button>
        </div>
    </>
  )
}

export default Login;