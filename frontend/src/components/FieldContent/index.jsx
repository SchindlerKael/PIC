import React from 'react'

import PropTypes from 'prop-types'

import "./styles.css";

const FieldContent = (props) => {
  return (
    <div className="field-content">
      <label className="field-label"> { props.label } </label>
      {props.children} 
    </div>
    
  )
}

const { string } = PropTypes

FieldContent.propTypes = {
  label: string,
}

export default FieldContent