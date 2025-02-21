import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {addConnections} from '../utils/connectionSlice';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector(store=>store.connections);
    const fetchData = async()=>{
          try{
            const res = await axios("http://localhost:7777/user/connections",{
              withCredentials: true, 
            });
            // console.log(res?.data?.data);
            dispatch(addConnections(res?.data?.data));
            
          }
          catch(err){
            console.log("Error", err.message);
          }
    }

    useEffect(()=>{
      fetchData();
    },[])
// console.log(connections);

  if(!connections){
    return <h1>No data found!</h1>
  }
  if(connections.length === 0)return <h1>Data is of zero length!</h1>
  return (
    <div className=' text-center mt-4'>
      <h1 className='font-sans text-3xl font-extrabold'>Connection</h1>
      <div className='flex justify-center flex-col items-center mt-4 gap-4'>
      {
        connections.map((data)=>{
          const{firstName, lastName, photoURL, age, gender, about, skills } = data;
          return(
            <>
              <div className='border rounded-md flex items-center gap-4 w-[50%] p-2 bg-black'>
                <img src={photoURL} alt="profileImg" className='w-[10rem] h-[10rem]'/>
                <div className='font-sans text-left'>
                  <h1 className='text-lg font-bold'>{firstName} {lastName}</h1>
                  <h2 className='text-lg font-bold text-gray-400'>{age}, {gender}</h2>
                  <h3 className='text-lg text-gray-400'>{about}</h3>
                  <h3 className='text-lg font-bold text-gray-400'>{skills}</h3>
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

export default Connections;