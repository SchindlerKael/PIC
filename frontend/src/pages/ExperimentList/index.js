import React, {useState} from 'react';

import './styles.css';

import Footer from "../../components/Footer";
import Header from "../../components/Header";

const ExperimentList = (props) => { 
    return (
        <>
        <Header />
        <h1>Listagem de Experimentos</h1>
        <Footer />
        </>
    )
}

export default ExperimentList;
