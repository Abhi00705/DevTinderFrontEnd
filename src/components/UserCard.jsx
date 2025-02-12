import React from 'react'


const UserCard = ({user}) => {
 
  return  (
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
      <button className="btn btn-secondary">Intrested</button>
      <button className="btn btn-primary">Ignore</button>
    </div>
  </div>
</div>
  )
}


export default UserCard