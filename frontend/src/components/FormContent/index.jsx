import React from 'react'


import "./styles.css";

const FormContent = (props) => {
  return (
    <div className="item form-content">{props.children}</div>
  )
}


export default FormContent