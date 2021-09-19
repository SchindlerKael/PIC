import React from 'react'

const ToggleButton = ({ label1, label2, onClick, value, disabled }) => {

  return (
    <button className="btn" onClick={onClick} disabled={disabled}>
      {!value ? label1 : label2} 
    </button>
  )
}

export default ToggleButton