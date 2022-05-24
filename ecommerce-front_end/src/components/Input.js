import React from "react";

const Input = (props) => {
  return (
    <div className="form_group">
      <label htmlFor={props.label}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        onChange={props.handleChange}
        required={props.required}
        placeholder={props.placeholder}
        className={props.classes}     
        value={props.value} 
      />
    </div>
  );
};

export default Input;