import React from 'react'

import PropTypes from 'prop-types'

import "./styles.css";

export const Input = (props) => {
  return ( <input {...props} /> )
}

export const Select = (props) => {

  const HandleMouseDown = (e) => {
    if(!e.currentTarget.multiple) return false;
    e.preventDefault();
    e.target.selected = !e.target.selected;
  }

  return ( <select {...props} onMouseDown={HandleMouseDown}> {props.children} </select>)
}

export const Textarea = (props) => {
  return ( <textarea {...props} />)
}

export const Checkbox = ({ label, value, checked, onChange, name }) => {
  return (
    <label className="checkbox">
      <input type="checkbox" value={value} checked={checked} onChange={onChange} name={name}/>
      {label}
    </label>
  );
};

const { array, func } = PropTypes

Input.propTypes = {
  onChange: func,
}

Select.propTypes = {
  onChange: func,
  children: array.isRequired,
}

Textarea.propTypes = {
  onChange: func.isRequired,
}

// Checkbox.propTypes = {
//   onChange: func,
//   label: string.Required,
//   checked: bool,
//   name: string,
// }
