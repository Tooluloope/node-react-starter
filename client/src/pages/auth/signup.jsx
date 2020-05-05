import React from "react";
import phone  from "../../assets/undraw_personalization_triu.svg";
import wave  from "../../assets/wave.png";
import profile  from "../../assets/undraw_profile_pic_ic5t.svg";
import "./s.css";
import { Input } from "../../components/inputs/input";
import { Link } from "react-router-dom";




export const SignUp = () => (
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
                        
                        <Input   name='email' type='text' label='Email Address' icon = 'user' />
                    
                        <Input name='password' type='password' label='Password' icon = 'lock' />

                        <Link to="#">Forgot Password?</Link>
                        <input type="submit" className="btn" value="Login"></input>

                    </form>
                </div>
            </div>
        </div>
    </>
);