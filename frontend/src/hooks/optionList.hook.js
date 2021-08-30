import { useState, useRef, useContext } from 'react';
import { OptionListContext } from "../store/optionList.context";


export const useDropDown = () => {
  const [dropdown, setDropdown] = useState(""); 
  const dropdownRef = useRef(null);

  const toggleDropdown  = () => {
    setDropdown("show");
    document.body.addEventListener("click", closeDropdown, true);
  }

  const closeDropdown = event => {
      setDropdown("");
      document.body.removeEventListener("click", closeDropdown);
  };

  return [{ dropdown, dropdownRef }, toggleDropdown ];
};

export function useOptionList() {
  const context = useContext(OptionListContext);
  const {options, setOptions} = context;
  return {options, setOptions};
}

export function useResult() {
  const context = useContext(OptionListContext);
  const {options} = context;

  return [options[0].value, options[1].value, options[2].value];
}
  