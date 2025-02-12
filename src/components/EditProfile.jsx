import axios from 'axios';
import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addUser } from '../utils/userSlice';

const EditProfile = () => {
    const user = useSelector(store=>store.user);
    const dispatch = useDispatch();

    const[firstName, setFirstName] = useState(user.firstName);
    const[lastName, setLastName] = useState(user.lastName);
    const[age, setAge] = useState(user.age);
    const[gender, setGender] = useState(user.gender);
    const[photoURL, setPhotoURL] = useState(user.photoURL);
    const[about, setAbout] = useState(user.about);
    const[skill, setSkill] = useState(user.skill);
    const [error, setError] = useState('');
    const[showTost, setShowTost] = useState(false);
    

    {/**i am not able to fetch the data! */}

    const fetch =  async()=>{
        setError('');
        
        try{
            
            const response = await axios({
                
                method:'patch',
                url:'http://localhost:7777/profile/edit',
                data:{

                    firstName:firstName,
                    lastName:lastName,
                    age:age,
                    gender:gender,
                    photoURL:photoURL,
                    about:about,
                    skills:skill,
                    
                },
                withCredentials:true,

            });
            console.log(response?.data?.data);
            dispatch(addUser(response?.data?.data));
            setShowTost(true);
            setTimeout(()=>{
                setShowTost(false);
            },2000);
        }
        catch(err){
            setError(err.message);
            console.log("Error : "+ err.message);
        }
    }

  return (
    <>
         <div className="card bg-base-300 text-neutral-content w-96     flex items-center justify-center gap-5 p-4">
           {/* firstName */}
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">First Name</span>
              
            </div>
            <input type="text" placeholder="First Name" className="input input-bordered w-full max-w-xs" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            
            </label> 
    
            {/* lastName */}
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Last Name</span>
              
            </div>
            <input type="text" placeholder="Last Name" className="input input-bordered w-full max-w-xs" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            
            </label> 
           
           {/* age */}
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Age</span>
              
            </div>
            <input type="text" placeholder="Age" className="input input-bordered w-full max-w-xs" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            
            </label> 

            {/* gender */}
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Gender</span>
              
            </div>
            <input type="text" placeholder="Gender" className="input input-bordered w-full max-w-xs" 
                value={gender}
                onChange={(e) => setGender(e.target.value)}
            />
            
            </label> 

            {/*photoURL */}
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">photoURL</span>
              
            </div>
            <input type="text" placeholder="Gender" className="input input-bordered w-full max-w-xs" 
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
            />
            
            </label> 

            {/*about */}
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">About</span>
              
            </div>
            <input type="text" placeholder="Gender" className="input input-bordered w-full max-w-xs" 
                value={about}
                onChange={(e) => setAbout(e.target.value)}
            />
            
            </label> 

            {/*skill */}
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Skill</span>
              
            </div>
            <input type="text" placeholder="Gender" className="input input-bordered w-full max-w-xs" 
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
            />
            
            </label> 
             <p className='text-red-500'>{error}</p>

            <button className='bg-slate-700 text-white w-[8rem] h-[3rem] font-semibold rounded-sm'
                    onClick={()=> fetch()}
            >save changes</button>
        </div>

        {showTost && (<div className="toast toast-top toast-center">
            <div className="alert alert-success">
                <span>Message sent successfully.</span>
            </div>
        </div>)}
        
    </>
  )
}

export default EditProfile