import React from 'react'
import EditProfile from './EditProfile'
import UserCard from './UserCard'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector(store=> store.user);
  return (!user )? <h1>loading user</h1> : (
    <div className='flex justify-center items-center gap-2'>
      <EditProfile/>
      <UserCard user={user}/>
    </div>
  );
}

export default Profile