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

import { set, useForm } from "react-hook-form";
import {useOptionList, useResult, useAnswer} from '../../hooks/optionList.hook';

const Main = (props) => {
    const { register, handleSubmit } = useForm();
    const [disabledAnswer, setDisabledAnswer] =  useState(false);
    const [hideResult, setHideResult] =  useState(false);    
    const [checkResult, setCheckResult] =  useState(false);

    const {id} = props.match.params;
    const [experiment, setExperiment] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const {setOptions} = useOptionList();
    const result = useResult();
    const answer = useAnswer();

    useEffect(() => {
        (async () => {
            const { data: {experiment, answers} } = await api.get(`/experiments/${id}`);
            setExperiment(experiment);
            setUserAnswers(answers.map(answer => answer.option_id ));
            setDisabledAnswer(answers.length > 0 ? true : false);
        })();
    }, [id]);
    
    useEffect(() => {
        if(experiment.options){
            setOptions(experiment.options.map((option) => {
                option.used = userAnswers.find(answer => answer === option.id) ? true : false;
                return option
            }));
        }
    }, [experiment.options, userAnswers]);


    const optionGroups = result.map((value, i) => (
        <div key={i.toString()}>
            <OptionGroup {...register(`options[${i}]`)} teste={userAnswers[i]} label={"B"+(i+1)} />
        </div>
    ))

    const onSubmit = async data => {
        try {
            const res = await api.post(`/experiments/${id}/answer`, data);
            if(res){
                alert( "Experimento Respondido!" );
                setDisabledAnswer(true);
            }
            
        } catch (error) {
            alert( error.response.data.error );
        }
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="option-groups">
                        {optionGroups}
                    </div>
                    <div className="button-content">
                        <Button label="Responder" submit={true} disabled={disabledAnswer}/>
                    </div>
                </form>
            </FormContent>
            <div className="item view-content">
                {disabledAnswer && 
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
                    checkAnswer={disabledAnswer}
                />
            </div>
        </Container>
        <Footer />
        </>
    )
}

export default Main;