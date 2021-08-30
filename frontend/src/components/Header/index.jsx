import React, { useContext } from "react";

import "./styles.css";

import { AuthContext } from '../../store/auth.context.js';

import Button from "../../components/Button";

const Header = () => {

    const { handleLogout  } = useContext(AuthContext);

    return(
    <div>
        <header>
            <Button label="Fisiologia Animal" />
            <Button label="Sair" onClick={handleLogout} />
        </header>
    </div>
    )
};

export default Header;