import React, { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector} from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(store=>store.feed);
  // console.log("checking",selector)
  const fetchData = async()=>{
    if(feed)return;
    try{
      const response = await axios({
        mathod:'get',
        url: BASE_URL+'/user/feed',
        withCredentials:true,
      });
      
      dispatch(addFeed(response?.data));
    }
    catch(error){
    
      console.error("Error:" + error.message);
    }
  }

  useEffect(()=>{
    fetchData();
  })
  if(!feed){
    return <h1>no data found in the store!</h1>
  }
  return (
    <div className='flex justify-center my-14'>
      <UserCard user={feed[0]}/>
    </div>
  )
}

export default Feed