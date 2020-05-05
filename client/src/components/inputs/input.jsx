/* eslint-disable no-debugger */
import React, { useState } from "react";
import PropTypes from "prop-types";

export const Input = ({name, label, type, icon}) => {
    const [value, setValue] = useState("");
    const handleChange = (e) => {
        setValue(e.target.value);
    };
  
    return(
       

        <>
            <div  style = {{gridTemplateColumns: "7% 93%"}}  className={`input-div ${ value.length > 0 ? "focus": null} border-b-2 border-gray-400 relative grid mt-0 mb-6 pt-1 pb-1 border-solid`}>
                <div className=" text-gray-400 flex justify-center items-center relative h-12">
                    <i className={`fas fa-${icon} duration-1000`}></i>
                </div>
                <div className="justify-center relative h-12">
                    <h5  className='text-gray-600 text-lg absolute duration-1000'>{label}</h5>
                    <input  onChange = {(e) => handleChange(e)} value = {value} name = {name} type={type} className="input" />
                </div>
            </div>
        </>
            
               
);};

Input.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired

};