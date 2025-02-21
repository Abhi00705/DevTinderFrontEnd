import React from 'react'
import { BASE_URL } from '../utils/constant'
import axios from 'axios'
import {useDispatch} from 'react-redux';
import { removeFeed } from '../utils/feedSlice';


const UserCard = ({user}) => {
  const dispatch = useDispatch();
  console.log(user)
  const handleClick= async(status,_id)=>{
    const res = await axios({
      method:'post',
      url: BASE_URL+'/request/send/'+status+'/'+_id,
      data:{},
      withCredentials:true,
      
    })
    console.log(res?.data?.data);
    dispatch(removeFeed(_id));
  }
 if(!user){
  return <h1>data not found!</h1>
 }
 if(user.length <= 0 ){
  return <h1>No more user there!</h1>
 }
  return (
    <div className="card card-compact bg-base-100 w-86 h-76 shadow-xl border-2 border-white rounded-md ">
  <figure >
    <img
      className=' h-[20rem]'
      src={user.photoURL}
      alt="userProfileImage" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{user.firstName+" "+ user.lastName}</h2>
    <p>{user.about}</p>
    <div className="card-actions justify-center">
      <button 
        className="btn btn-secondary"
        onClick={()=>handleClick("interested",user._id)}
      >Intrested</button>
      <button 
        className="btn btn-primary"
        onClick={()=>handleClick("ignored",user._id)}
      >Ignore</button>
    </div>
  </div>
</div>
  )
}


export default UserCard