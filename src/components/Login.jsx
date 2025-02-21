import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import {  useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';

const Login = () => {
    const[isloggedin, setIsloggedin] = useState(true);
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
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

    const HandleSignup = async ()=>{
        try{
            const res = await axios({
                method:'post',
                url: BASE_URL+'/signup',
                data:{
                    firstName:firstName,
                    lastName:lastName,
                    emailId:emailId,
                    password:password,
                },
                withCredentials:true,
            })
            console.log(res);
            dispatch(addUser(res?.data?.data));
            return navigate("/profile");
        }
        catch(err){
            setError(err?.response?.data || "something went wrong!");
        }
    }
   
  return (
    <div className='flex justify-center items-center h-[37rem]  '>
       
        <div className=" flex  flex-col gap-5 justify-center items-center   bg-base-300   w-[23rem] p-4 rounded-md ">
        
           {!isloggedin && <><label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">First Name</span>
              
            </div>
            <input type="text" placeholder="firstName" className="input input-bordered w-full max-w-xs" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            
            </label> 
           
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Last Name</span>
              
            </div>
            <input type="text" placeholder="LastName" className="input input-bordered w-full max-w-xs" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            
            </label> 
            
            
            </>} 


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
                    onClick={()=> isloggedin?clickHandler():HandleSignup()}
            >{isloggedin?"login":"signup"}</button>

            <p 
            className='underline hover:cursor-pointer hover:text-white hover:text-[1.01rem] p-2 font-bold'
            onClick={()=>setIsloggedin((toggle)=>!toggle)}

            >{isloggedin? " signup ":"login?"}</p>
        </div>
    </div>
  )
}

export default Login;