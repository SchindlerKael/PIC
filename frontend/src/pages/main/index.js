import React from 'react';

import './styles.css';

import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Main = (props) => {


    return (
        <>
        <Header />
        <h1 style={{textAlign: 'center'}}>You are Home!</h1>
        <Footer />
        </>
    )
}

export default Main;