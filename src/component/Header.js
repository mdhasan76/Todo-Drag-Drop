import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../routes/AuthProvider';
import {FaUserAlt} from "react-icons/fa"

const Header = () => {
    const {user, logOutUser} = useContext(AuthContext);
    const logOut = () =>{
        logOutUser()
        .then(() =>{
            console.log("logOut")
        })
        .catch(err=> console.log(err))
    }
    return (
        <div className="navbar  bg-gray-100">
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        {/* <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Item 1</a></li>
        <li tabIndex={0}>
          <a className="justify-between">
            Parent
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
          </a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul> */}
                    </div>
                    <p className="btn btn-ghost normal-case text-xl">Todo Drag & Drop</p>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to="/" className='font-semibold'>Home</Link></li>
                        <li><Link to="/massenger" className='font-semibold'>Massenger</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                <div className='ml-3'>
                        {
                            user && user?.photoURL ?
                            <div className="tooltip tooltip-bottom" data-tip={user?.displayName}>
                                <img src={user?.photoURL} className="h-10 w-10 rounded-full" alt=""/> 
                            </div>
                                : <p className="text-3xl mr-3 tooltip tooltip-bottom" data-tip={user?.displayName}><FaUserAlt/></p>
                        }
                    </div>
                    {
                        user ?
                       <button onClick={logOut} className='btn ml-3'>LogOut</button> : <Link to="/login" className="btn" >Login</Link>
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default Header;