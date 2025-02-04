import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const select = useSelector(store => store.user);

 
    async function fetchData (){
      
      try{
        const res= await axios({
          method:'get',
          url: BASE_URL+'/profile',
          withCredentials:true,
        });
        dispatch(addUser(res.data));
      }
      catch(err){
        if(err.status == 400){
          navigate('/login');
        }
        
        console.err(err.message);
      }
      
    } 
  
  
 

  useEffect(()=>{
    
    if(!select){
      fetchData();
    }
    
  },[]);

  return (
    <>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Body