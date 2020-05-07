import React, { useState, useContext, useEffect } from "react";
import logo from "../../logo.svg";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { userContext } from "../../states/auth/auth.context";



export const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [fullname, setFullname] = useState(false);

    const  isAuthenticated  = useAuth();
    const {state: {user}, dispatch} = useContext(userContext);

    
    useEffect(() => {
        if (user) {
            setFullname(user.fullname);
        }
        
        
    }, [user]);

    const Logout = () => {    
        dispatch({
            type:"LOGOUT_SUCCESS"
        });
    
    };


    return (
        <header className='bg-green-600 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3'>
            <div className='flex justify-between items-center px-4 py-3'>
                <div>
                    <img className="h-12" src={logo}  alt="Logo"/>
                </div>
                <div className="sm:hidden">
                    <button onClick = {() => setIsOpen(!isOpen)} className='block text-gray-500 hover:text-white focus:text-white focus:outline-none'>
                    <svg className="  h-6 w-6 fill-current" viewBox="0 0 24 24">
                        {isOpen && <path fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>}
                        {!isOpen && <path  fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>}
                    </svg>
                    </button>
                </div>
            </div>
            <nav className={`${isOpen? "block" : "hidden "} duration-500 px-2 pt-2 pb-4 sm:flex sm:p-0`}>
                <Link className='block text-white px-2 py-1 font-semibold rounded hover:bg-green-400' to='/'>Home </Link>
                { isAuthenticated && <Link onClick = {() => Logout()} className='block text-white px-2 py-1 font-semibold rounded hover:bg-green-400' to='/login'>logout </Link>}
                { !isAuthenticated && <Link className='block text-white px-2 py-1 font-semibold rounded hover:bg-green-400' to='/login'>Login </Link>}
                { !isAuthenticated && <Link className='block text-white px-2 py-1 font-semibold rounded hover:bg-green-400' to='/signup'>Sign Up </Link>}
                { isAuthenticated && <Link className='block text-white px-2 py-1 font-semibold rounded hover:bg-green-400' to='/signup'>{fullname ? fullname : null} </Link>}


            </nav>

        </header>
    );
};