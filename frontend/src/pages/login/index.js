import React, { useContext } from 'react';

import './styles.css';

import { AuthContext } from '../../store/auth.context.js';

import Button from "../../components/Button";
import Input from "../../components/Input";
import Container from "../../components/Container";
import FormContent from "../../components/FormContent";

import useForm from '../../hooks/form.hook';

import logoPic from "../../assets/img/logo-pic.png";

export default function Login() {
  const { authenticated, handleLogin } = useContext(AuthContext);
  const [{ values, loading }, handleChange, handleSubmit] = useForm();

  return (
    <>
      <Container style={{maxWidth: '480px', margin: 'auto auto'}}>
        <FormContent>
          <div className="logo-content">
            <img src={logoPic} />
          </div>
          <form onSubmit={handleSubmit(handleLogin, values)}>
            <Input label={"Usuário"} type={"text"} name="email" onChange={handleChange} />
            <Input label={"Senha"} type={"password"} name="password" onChange={handleChange} />
            <Button label="Entrar" onClick={null} submit={true} />
          </form>
        </FormContent>
      </Container>
    </>
  );
}