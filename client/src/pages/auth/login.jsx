import React, { useState } from "react";
import phone  from "../../assets/undraw_personalization_triu.svg";
import wave  from "../../assets/wave.png";
import profile  from "../../assets/undraw_profile_pic_ic5t.svg";
import "./auth.css";
import { Input, ButtonAuth } from "../../components/inputs/input";
import { Link } from "react-router-dom";
import axios from "axios";




export const Login = () => {
    // Initial State of the app during login
    const initialState = {
        user: {
            password:"",
            email: "",
        },
        errors: {},
        submitted: false
    };
    const [state, setState] = useState(initialState);
    

// handles Event changes in the fields
    const handleChange = event => {
        const { user } = state;
        user[event.target.name] = event.target.value;
        setState({...state, user});
    };

    // Handles the form Submit logic
    const onSubmit = async (event) => {
        event.preventDefault();

        const {errors, user: { password,email }} = state;
    

        if ( !email || !password){
            errors.message = "All fields are required";
            setState({...state, errors});
           return;
        } 
            
        
        if (password.length < 8){
            errors.message = "Password must be at least 8 characters!";
            setState({...state, errors});
            return;
        } 
            
     
        try {
            
            const res = await axios.post("http://localhost:5000/signin", state.user );
            const status = res.status;
            const result = await res.data;

            if (status === 200 | status === 201) {

                localStorage.setItem("token",result.token);

                setState({...initialState, submitted: true});

            }
            else {
                setState({...state, errors:{message : result.toString()}});
            }
        } catch (error) {
            setState({...state, errors:{message : error.toString()}});
        }

    };

    const {submitted, errors, user: {  email, password }} = state;
    
    return(
    <>
        <img style={{zIndex: "-1"}} src={wave} alt="wave" className="fixed bottom-0 left-0  h-full wave"/>
        <div className=' m-auto h-screen'>

            
            <div className = 'grid contain  h-full pl-8 pr-8'>
                <div className=' l h-full flex justify-end items-center img'>
                    <img width={"500px"} src={phone} alt="signup" className='z-10'/>
                </div>

                <div className='  h-full flex justify-start items-center text-center content'>
                    <form style={{width: "360px"}}>
                        <img src={profile} alt="profile" className='h-24 m-auto'/>
                        <h2 className='text-center mt-4 mb-4 ml-0 mr-0 uppercase text-5xl'>Welcome</h2>
                        {submitted && <p className='text-green-500 mb-2'>Login Successfully</p>}
                        {errors && <p className='text-red-500 mb-2'>{errors.message}</p>}
                        <Input     onChange={handleChange} value={email}   name='email' type='text' label='Email Address' icon = 'at' required/>
                    
                        <Input   onChange={handleChange} value={password} name='password' type='password' label='Password' icon = 'lock' required/>


                        <Link className=" float-left text-xs inline-block text-right no-underline text-gray-500 duration-300 hover:text-green-300" to="#">Forgot Password?</Link>
                        <Link className=" float-right text-xs inline-block text-left no-underline text-gray-500 duration-300 hover:text-green-300" to="/signup">New? Sign Up</Link>

                        <ButtonAuth  className='text-xl text-white uppercase cursor-pointer  mt-1 block w-full h-12 outline-none border-none bg-green-500 mt-3' value='Login' type="submit" handleClick={onSubmit} />

                    </form>
                </div>
            </div>
        </div>
    </>
);};