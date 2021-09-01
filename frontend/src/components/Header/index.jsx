import React, { useContext } from "react";

import "./styles.css";

import { AuthContext } from '../../store/auth.context.js';

import Button from "../../components/Button";
import UserCard from "../../components/UserCard";


const Header = () => {

    const { handleLogout  } = useContext(AuthContext);
    
    return(
    <div>
        <header>
            <Button label="Fisiologia Animal" />
            <div className="user-info">
                <UserCard />
                <Button label="Sair" onClick={handleLogout} />
            </div>
        </header>
    </div>
    )
};

export default Header;