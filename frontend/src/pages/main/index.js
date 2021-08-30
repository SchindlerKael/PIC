import React, {useState, useContext} from 'react';

import './styles.css';

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Button from "../../components/Button";
import ToggleButton from "../../components/ToggleButton";
import Container from "../../components/Container";
import FormContent from "../../components/FormContent";
import Chart from "../../components/Chart";
import OptionGroup from "../../components/OptionGroup";

import useForm from '../../hooks/form.hook';

const Main = (props) => {


    const [{ values, loading }, handleChange, handleSubmit] = useForm();

    const [answer, setAnswer] =  useState([]);
    const [hideResultButton, setHideResultButton] =  useState(true);
    const [checkResult, setCheckResult] =  useState(false);

    const sendOptions = () => {
        setAnswer([values.b1, values.b2, values.b3]);
        setHideResultButton(false);
    };

    return (
        <>
        <Header />
        <Container>
            <FormContent>
                <div className="title-content">
                    <h1>Experimento Teste</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum consequat ligula, et sagittis tellus interdum quis. Cras quis cursus libero. Maecenas in urna odio. Mauris non commodo metus.</p>
                </div>
                <form onSubmit={handleSubmit(sendOptions)}>
                    <div className="option-groups">
                        <OptionGroup handleChange={handleChange} id="b1" label="B1" />
                        <OptionGroup handleChange={handleChange} id="b2" label="B2" />
                        <OptionGroup handleChange={handleChange} id="b3" label="B3" />
                    </div>
                    <div className="button-content">
                        <Button label="Enviar" onClick={null} submit={true}/>
                    </div>
                </form>
            </FormContent>
            <div className="item view-content">
                <div className={`${hideResultButton ? "hide" : "show"} check-content`}>
                    <ToggleButton 
                        label1="Conferir Resposta" 
                        label2="Ocultar Resposta" 
                        value={checkResult}
                        disabled={false}
                        onClick={() => setCheckResult(!checkResult)} 
                    />
                </div>
                <Chart data={[37.8, 30.9, 25.4, 11.7]} answer={answer} checkResult={checkResult} />
            </div>
        </Container>
        <Footer />
        </>
    )
}

export default Main;