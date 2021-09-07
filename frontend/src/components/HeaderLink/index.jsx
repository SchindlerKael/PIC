import React from 'react';
import { Link } from "react-router-dom";

import "./styles.css";

export default (props) => {
  
    return (
    <li><Link to={props.to}> { props.name } </Link></li>
    );
};

