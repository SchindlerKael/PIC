import React from 'react'

import PropTypes from 'prop-types'

import "./styles.css";

const Button = (props) => <button type={props.submit ? "submit" : "button"} className="btn" onClick={props.onClick} disabled={props.disabled}> {props.label} </button>

const { string, func } = PropTypes

Button.propTypes = {
  label: string.isRequired,
  onClick: func,
}

export default Button