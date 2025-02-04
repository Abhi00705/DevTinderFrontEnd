import React from 'react'
import { useParams } from 'react-router-dom';

const Signup = () => {
  const {userId} = useParams();
  console.log(userId);
  return (
    <>
    <div>userId : {userId}</div>
    <div>Signup1123</div>
    <div>hello</div>
    </>
  )
}

export default Signup