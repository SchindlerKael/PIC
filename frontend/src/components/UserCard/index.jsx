import React from "react";

import "./styles.css";

import { useLocalUser } from '../../hooks/auth.hook.js';

const UserCard = () => {    
    const user = useLocalUser();

    return(
    <div className="user-content">
        <h3>{user.name}</h3>
        <h5>({user.roles.map((role) => role.title).join(', ')})</h5> 
    </div>
    )
};

export default UserCard;