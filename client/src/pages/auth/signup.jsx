import React, { useState } from "react";
import phone  from "../../assets/undraw_personalization_triu.svg";
import wave  from "../../assets/wave.png";
import profile  from "../../assets/undraw_profile_pic_ic5t.svg";
import "./s.css";
import { Input, ButtonAuth } from "../../components/inputs/input";
import { Link } from "react-router-dom";
import axios from "axios";




export const SignUp = () => {
    const initialState = {
        user: {
            username: "",
            password:"",
            email: "",
            password2: "",
            fullname: ""
        },
        errors: {},
        submitted: false
    };
    const [state, setState] = useState(initialState);
    


    const handleChange = event => {
        const { user } = state;
        user[event.target.name] = event.target.value;
        setState({...state, user});
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        const { user: { username, password, fullname, email, password2 }} = state;
        let err = {};

        if (!username || !password || !fullname || !email || !password2) {
            err.fields = "All fields are required";
        }
        if (password.length < 8) {
            err.password = "Password must be at least 8 characters!";
        }
        if (password === password2) {
            err.password2 = "Both Passwords must be the same";
        }
        if (err.length > 0) {
            
            setState({...state, errors: err});
            return;
        }
        else {
            try {
                
                const res = await axios.post("http://localhost:5000/signup", state.user );
                const status = res.status;
                const result = await res.data;
                console.log(result, status);
                if (status === 200 | status === 201) {
                    setState({...initialState, submitted: true});
                }
                else {
                    setState({...state, errors:result});
                }
            } catch (error) {
                setState({...state, errors:error});
            }
        }

    };

    const {submitted, errors, user: { username, password, fullname, email, password2 }} = state;
    
    return(
    <>
        <img style={{zIndex: "-1"}} src={wave} alt="wave" className="fixed bottom-0 left-0  h-full"/>
        <div className=' m-auto h-screen'>

            
            <div className = 'grid contain  h-full pl-8 pr-8'>
                <div className=' l h-full flex justify-end items-center'>
                    <img width={"500px"} src={phone} alt="signup" className='z-10'/>
                </div>

                <div className='  h-full flex justify-start items-center text-center'>
                    <form style={{width: "360px"}}>
                        <img src={profile} alt="profile" className='h-24 m-auto'/>
                        <h2 className='text-center mt-4 mb-4 ml-0 mr-0 uppercase text-5xl'>Welcome</h2>
                        {submitted && <p className='text-green-500'>Registered Successfully</p>}
                        <Input error={errors.fullname}  onChange={handleChange} value={fullname}   name='fullname' type='text' label='Fullname' icon = 'address-book' required/>

                        <Input error={errors.username}  onChange={handleChange} value={username}   name='username' type='text' label='Username' icon = 'user' required/>
                        
                        <Input error={errors.email}    onChange={handleChange} value={email}   name='email' type='text' label='Email Address' icon = 'at' required/>
                    
                        <Input error={errors.password}  onChange={handleChange} value={password} name='password' type='password' label='Password' icon = 'lock' required/>

                        <Input error={errors.password2} onChange={handleChange} value={password2} name='password2' type='password' label='Check Password' icon = 'lock' required/>

                        <Link className="block text-right no-underline text-gray-500 duration-300 hover:text-green-300" to="#">Forgot Password?</Link>
                        
                        <ButtonAuth  className='text-xl text-white uppercase cursor-pointer  mt-1 block w-full h-12 outline-none border-none bg-green-500' value='Sign up' type="submit" handleClick={onSubmit} />

                    </form>
                </div>
            </div>
        </div>
    </>
);};