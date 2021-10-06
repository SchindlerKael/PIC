import React, {useState, useEffect} from 'react';

import './styles.css';

import api from '../../services/api';

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Button from "../../components/Button";
import ToggleButton from "../../components/ToggleButton";
import Container from "../../components/Container";
import FormContent from "../../components/FormContent";
import Chart from "../../components/Chart";
import OptionGroup from "../../components/OptionGroup";

import useForm from '../../hooks/form.hook';
import {useOptionList, useResult} from '../../hooks/optionList.hook';

const Main = (props) => {
    const [{ values, loading }, handleChange, handleSubmit] = useForm();
    const [answer, setAnswer] =  useState([]);
    const [hideResultButton, setHideResultButton] =  useState(true);
    const [checkResult, setCheckResult] =  useState(false);

    const {id} = props.match.params;
    const [experiment, setExperiment] = useState([]);
    const {setOptions} = useOptionList();
    const result = useResult();

    useEffect(() => {
        (async () => {
            const { data } = await api.get('/experiments/'+id);
            setExperiment(data);
        })();
    }, [id]);
    
    useEffect(() => {
        if(experiment.options){
            setOptions(experiment.options.map((option) => {
                option.used = false;
                return option
            }));
        }
    }, [experiment.options]);

    const sendOptions = () => {
        setAnswer(Object.values(values));
        setHideResultButton(false);
    };

    return (
        <>
        <Header />
        <Container>
            <FormContent>
                <div className="title-content">
                    <h1>{experiment.title}</h1>
                    <p>{experiment.suport_text}</p>
                </div>
                <form onSubmit={handleSubmit(sendOptions)}>
                    <div className="option-groups">
                        {result.map((value, i) => {
                            return <OptionGroup handleChange={handleChange} id={"b"+(i+1)} label={"B"+(i+1)} />
                        })}
                    </div>
                    <div className="button-content">
                        <Button label="Enviar" onClick={() => null} submit={true}/>
                    </div>
                </form>
            </FormContent>
            <div className="item view-content">
                {!hideResultButton && 
                <ToggleButton 
                    label1="Conferir Resposta" 
                    label2="Ocultar Resposta" 
                    value={checkResult}
                    disabled={false}
                    onClick={() => setCheckResult(!checkResult)} 
                />}
                <Chart
                    initial_value = {experiment.initial_value}
                    expected_rate = {experiment.expected_rate}
                    event_rate = {experiment.event_rate}
                    answer={answer} 
                    result={result}
                    checkResult={checkResult} 
                />
            </div>
        </Container>
        <Footer />
        </>
    )
}

export default Main;