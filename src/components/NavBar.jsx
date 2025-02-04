import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const user = useSelector((store=> store.user));
  
  const handleClick = async(e)=>{
    e.preventDefault();
    try{
      const res = await axios({
        method:'get',
        url: BASE_URL+'/logout',
        withCredentials:true,
      })
      navigate('/login');
      console.log(res);
    }
    catch(error){
      console.error(error);
    }
    
  }

    return (
        <>
            <div className="navbar bg-base-300">
  <div className="flex-1">
    <Link className="btn btn-ghost text-xl"
        to="/"
    >DevTinder
    </Link>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      
    </div>
   {
    user &&  <div className="dropdown dropdown-end mx-5 flex">
      <p className="p-2 font-sans font-semibold">Welcome, {user.firstName} {user.lastName}</p>
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full ">
        <img
          alt="Tailwind CSS Navbar component"
          src={user.photoURL} 
        />
      </div>
    </div>
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
      <li>
        <Link className="justify-between"
              to='/profile'
        >
          Profile
          <span className="badge">New</span>
        </Link>
      </li>
      <li><a>Settings</a></li>
      <li onClick={(e)=>handleClick(e)}><a >logout</a></li>
    </ul>
  </div>
   }
  </div>
</div>        
        
        </>
    )
}
export default NavBar;