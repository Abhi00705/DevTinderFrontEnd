import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import {addRequests, removeRequests} from '../utils/RequestSlice'

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector(store=>store.requests);
    const fetchData= async()=>{
        try{
            const res = await axios({
                method:'get',
                url: BASE_URL+'/user/requests/review',
                withCredentials:true,
            })
            console.log(res);
            dispatch(addRequests(res?.data?.data));
        }
        catch(err){
            console.log(err.message);
        }
    }

    const requestReview = async(status,_id)=>{
        try{
            const res = axios({
                method:'post',
                url: BASE_URL+'/request/review/'+status+'/'+_id,
                withCredentials:true,
            })

            dispatch(removeRequests(_id));
        }
        catch(err){
            console.log(err.message);
        }
    }
    useEffect(()=>{
        fetchData();
    },[])
console.log(requests);
    if(!requests){
        return <h1>No data found!</h1>
    }
    if(requests.length === 0)return <h1>No Requests!</h1>

  return (
    <div className=' text-center mt-4'>
      <h1 className='font-sans text-3xl font-extrabold'>Connection Request</h1>
      <div className='flex  flex-col gap-4 items-center mt-4'>
      {
        requests.map((data)=>{
          const{_id, firstName, lastName, photoURL, age, gender, about, skills } = data.fromUserId;
          return(
            <>
              <div key={_id} className='border rounded-md flex items-center justify-evenly w-[50%] p-2 bg-black'>
                <img src={photoURL} alt="profileImg" className='w-[15rem] h-[10rem]'/> 
                <div className='font-sans text-left'>
                  <h1 className='text-lg font-bold'>{firstName} {lastName}</h1>
                  <h2 className='text-lg font-bold text-gray-400'>{age}, {gender}</h2>
                  <h3 className='text-lg text-gray-400'>{about}</h3>
                  <h3 className='text-lg font-bold text-gray-400'>{skills}</h3>
                </div>
                <div className='flex justify-center items-center gap-4'>
                <button
                    className="btn btn-primary"
                    onClick={()=>requestReview("accepted",data?._id)}
                >Accept</button>
                <button 
                className="btn btn-secondary"
                onClick={()=>requestReview("rejected",data?._id)}
                >Reject</button>
                </div>
              </div>
              
            </>
          )
        })
      }
      </div>
    </div>
  )
}

export default Requests