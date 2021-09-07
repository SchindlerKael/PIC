import { useContext } from 'react';
import { OptionListContext } from "../store/optionList.context";

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
  