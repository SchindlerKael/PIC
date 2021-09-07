import { useState, useRef } from 'react';


export const useDropDown = (callback) => {
  const [dropdown, setDropdown] = useState(""); 
  const dropdownRef = useRef(null);

  const toggleDropdown  = () => {
    setDropdown("show");
    document.body.addEventListener("click", closeDropdown, true);
  }

  const closeDropdown = event => {
    const notContain = dropdownRef.current === null || !dropdownRef.current.contains(event.target);

    if (notContain) { 
      setDropdown("");
      document.body.removeEventListener("click", closeDropdown);
    }
  };

  return [{ dropdown, dropdownRef }, toggleDropdown ];
}