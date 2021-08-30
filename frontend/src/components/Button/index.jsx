import React from 'react'

import PropTypes from 'prop-types'

import "./styles.css";

const Button = (props) => <button type={props.submit ? "submit" : "button"} class="btn" onClick={props.onClick}> {props.label} </button>

const { string, func } = PropTypes

Button.propTypes = {
  label: string.isRequired,
  onClick: func.isRequired,
}

export default Button