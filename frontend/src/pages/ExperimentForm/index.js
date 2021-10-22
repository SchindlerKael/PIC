import React, {useState, useEffect} from 'react';

import './styles.css';

import api from '../../services/api';
import history from '../../history';

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Container from "../../components/Container";
import FormContent from "../../components/FormContent";
import {Input, Select, Textarea, Checkbox} from "../../components/Field";
import FieldContent from "../../components/FieldContent";
import Button from "../../components/Button";

import { useForm } from "react-hook-form";

const ExperimentList = (props) => {

    const { register, handleSubmit, setValue } = useForm();

    const [options, setOptions] = useState([]);

    const [selectedOptions, setSelectedOptions] = useState([]);
  
    useEffect(() => {
      (async () => {
        const { data } = await api.get('/options');
        setOptions(data);
      })();
    }, []);
  
    const handleUpdateSelected = (option) => {
        let index = selectedOptions.indexOf(option);
        if (index > -1) {
            setSelectedOptions(selectedOptions.filter(item => option.name !== item.name));
        }else{
            setSelectedOptions(selectedOptions.concat(option))
        }
    }

    const optionFields = selectedOptions.map((option, i) => {
        setValue(`options[${i}][option_id]`, option.id);
        return (
            <fieldset className="option-field-set">
                <legend>{option.name}</legend>
                {/* <Input type="hidden" {...register(`options[${i}][option_id]`)} /> */}
                <FieldContent label="Peso">
                    <Input type="text" {...register(`options[${i}][weight]`)} />
                </FieldContent>
                <FieldContent>
                    <Checkbox label="Solução esperada?" value={true} {...register(`options[${i}][correct_answer]`)} />
                </FieldContent>
            </fieldset>
        )
    })

    const onSubmit = async data => {
        console.log(data);
        try {
            const res = await api.post('/experiments', data);
            if(res){
                alert( "Experimento Cadastrado com sucesso!" );
                history.push('/experiment/list');
            }
            
        } catch (error) {
            alert( error.response.data.error );
        }
    }

    return (
        <>
        <Header />
        <Container style={{justifyContent: 'left',}}>
            <FormContent>
                <h1 className="page-title">Criar experimento</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="split-form">
                        <div className="part-form">
                            <FieldContent label="Título do Experimento">
                                <Input type="text" {...register("title")} />
                            </FieldContent>

                            <FieldContent label="Texto Base">
                                <Textarea {...register("suport_text")}></Textarea>
                            </FieldContent>

                            <div className="field-group">
                                <FieldContent label="Valor inicial do Parâmetro">
                                    <div className="field-group">
                                        <Input type="text" className="valor-input" {...register("initial_value")} />
                                        <Input type="text" className="unidade-input" placeholder="Unidade"/>
                                    </div>
                                </FieldContent>
                                <FieldContent label="Variação Experada">
                                    <div className="field-group">
                                        <Input type="text" className="valor-input" {...register("expected_rate")} />
                                        <Input type="text" className="unidade-input" placeholder="Unidade"/>
                                    </div>
                                </FieldContent>
                                <FieldContent label="Variação sem Intervenção">
                                    <div className="field-group">
                                        <Input type="text" className="valor-input" {...register("event_rate")} />
                                        <Input type="text" className="unidade-input" placeholder="Unidade"/>
                                    </div>
                                </FieldContent>
                            </div>
                        </div>
                        
                        <div className="part-form flex-end">
                            <FieldContent label="Interações">
                                <Select className="option-select" multiple="multiple">
                                    {options.map(option => 
                                        <option value={option.id} onClick={() => handleUpdateSelected(option)}> {option.name}</option>
                                    )}
                                </Select>
                            </FieldContent>
                            <div className="scroll-panel">
                                {optionFields}
                            </div>
                        </div>
                    </div>
                    <Button label="Criar" submit={true} />
                </form>
            </FormContent>
        </Container>
        <Footer />
        </>
    )
}

export default ExperimentList;
