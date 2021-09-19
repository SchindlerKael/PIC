import React, { useContext } from "react";

import "./styles.css";

import { AuthContext } from '../../store/auth.context.js';
import { useDropDown } from '../../hooks/dropdown.hook';

import Button from "../../components/Button";
import UserCard from "../../components/UserCard";
import HeaderDropDown from '../HeaderDropDown';
import HeaderLink from '../HeaderLink';

import { AiOutlineMenu} from 'react-icons/ai';
import { AiOutlineClose} from 'react-icons/ai';

const Header = () => {

    const [{ dropdown, dropdownRef }, toggleDropdown] = useDropDown ();

    const { handleLogout } = useContext(AuthContext);
    
    return(
    <>
        <header>
            <li onClick={toggleDropdown}><label className="btn-open"> <AiOutlineMenu/> Abrir</label></li>
            
            <h2>Fisiologia Animal</h2>
            <div className="user-info">
                <UserCard />
                <Button label="Sair" onClick={handleLogout} />
            </div>
        </header>
        <nav id="menu"  className={`${dropdown}`}>
            <li><label className="btn-close"> <AiOutlineClose/> Fechar</label></li>
            <ul ref={dropdownRef}>
                <HeaderLink to="/" name="Principal"/>
                <HeaderDropDown name="Experimentos">
                    <HeaderLink to="/experiment/list" name="Listagem de experimentos"/>
                    <HeaderLink to="/experiment/create" name="Criar Experimento"/>
                </HeaderDropDown>           
            </ul>
        </nav>
    </>
    )
};

export default Header;