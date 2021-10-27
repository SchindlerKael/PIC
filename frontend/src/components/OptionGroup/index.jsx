import React, {useState, useEffect} from 'react'

import Button from "../../components/Button/index";

import {useOptionList} from '../../hooks/optionList.hook';
import {useDropDown } from '../../hooks/dropdown.hook';

import "./styles.css";

const OptionGroup = (props) => {

  const findIndexById = (options, id) => {
    return options.indexOf(options.find((option) => option.id === id));
  }

  const [{ dropdown }, toggleDropdown] = useDropDown();

  const {options, setOptions} = useOptionList();

  const [selectedOption, setSelectedOption] = useState(-1);

  useEffect(() => {
    const index = findIndexById(options, props.teste);
    setSelectedOption(index);
  }, []);

  const handleUpdateList = (i) => {
    let rows = options;
    if(selectedOption !== -1)
      rows[selectedOption].used = !rows[selectedOption].used;
    
    rows[i].used = !rows[i].used;
    setOptions(rows);
    setSelectedOption(i);
  }

  return (
    <div className="option">
      {/* <h1>{selectedOption}</h1> */}
      <div className="option-header">
        <Button label={props.label} onClick={toggleDropdown} />
        <label>{selectedOption !== -1 && options[selectedOption].name}</label>
      </div>
        
      <div className={`${dropdown} options-list`}>       
        <ul>
          {options.map((option, i) => {
            const id = `${props.label}-${i}`;
            return(
              <li key={i.toString()} className={option.used ? "hide" : ""}> 
                <label htmlFor={id} onClick={() => handleUpdateList(i)}>{option.name}</label>
                <input 
                  {...props}
                  type="radio" 
                  id={id}                  
                  value={option.id}
                  checked={option.id === props.teste ? true : false}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </div>       
  )
}


export default OptionGroup