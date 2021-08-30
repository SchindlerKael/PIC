import React from 'react'

import PropTypes from 'prop-types'

import "./styles.css";

const Button = (props) => {
  return (
    <div className="input-content">
      <label className="input-label"> { props.label } </label>
      <input 
        type={ props.type } 
        onChange={ props.onChange }
        name={ props.name }
        id={ props.id }
      /> 
    </div>
    
  )
}

const { string, func } = PropTypes

Button.propTypes = {
  label: string.isRequired,
  onClick: func.isRequired,
}

export default Button