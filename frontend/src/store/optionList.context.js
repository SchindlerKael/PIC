import React, { createContext, useState } from 'react';

export const OptionListContext = createContext({});

export const OptionListProvider = (props) => {
    
    const [options, setOptions] = useState([
        //(0.5 + 0.4 * (0.2*a + 0.8*b))
        // {name: "Hormônio x", used: false, value: 0.2}, 
        // {name: "Hormônio y", used: false, value: 0.8}, 
        // {name: "Hormônio z", used: false, value: 0}, 
        // {name: "Hormônio a", used: false, value: -0.8},
        // {name: "Hormônio b", used: false, value: -0.2}, 
    ]);

    return (
        <OptionListContext.Provider value={{ options, setOptions }}>
            {props.children}
        </OptionListContext.Provider>
    );
}

