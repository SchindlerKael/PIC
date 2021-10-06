import { useState } from 'react';

const useForm = (callback) => {
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(false);

    const handleValue = (event) => {
      if(event.target.type == 'checkbox' || event.target.type == 'radio') {
        if(!event.target.checked)
          return null;
      }
      return event.target.value;
    }
  
    const handleChange = (event) => {
      const auxValues = { ...values };

      let name_decomposition  = event.target.name.replace(/]/g, '').split('[')
    
      if(name_decomposition.length > 1) {
        const attribute = name_decomposition.shift();
        if(parseInt(name_decomposition[0]) != 'NaN'){
          console.log(event.target.name);
          console.log(`${attribute}[${parseInt(name_decomposition[0])}] = ${handleValue(event)}`);
          auxValues[attribute] = auxValues[attribute] ? [...auxValues[attribute]] : [];
          auxValues[attribute][parseInt(name_decomposition[0])] = handleValue(event);
        }else{
          auxValues[attribute] = {...auxValues[attribute]}
          auxValues[attribute][name_decomposition[0]] = handleValue(event);
        }
      }else
        auxValues[event.target.name] = handleValue(event);
      setValues(auxValues);
    };
  
    const handleSubmit = (callback, values) => (event) => {
      event.preventDefault();
      setLoading(true);
      callback(values);
      setLoading(false);
    };

    return [{ values, loading }, handleChange, handleSubmit];
  };
  
  export default useForm;