import React from 'react';

import "./styles.css";

import { MdArrowDropDown } from 'react-icons/md';

const ItenDropDown = (props) => {

    const handleDropdown = (event) => {
        let li = event.currentTarget;
        let a = li.children[0];
        let dropdown = li.children[1];
        const isOpen = dropdown.style.height === 'auto';
        if(isOpen){
            dropdown.style.height = '0';
            a.children[0].style.transform = 'rotate(0deg)';
        }else{
            dropdown.style.height = 'auto';
            a.children[0].style.transform = 'rotate(-90deg)';
        }
    };
    
    return (
        <li onClick={handleDropdown}>
            <label>{props.name} <MdArrowDropDown/></label>
            <ul className="dropdown">
                {props.children}
            </ul>
        </li>
        
    )
}

export default ItenDropDown;