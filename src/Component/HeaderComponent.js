import React, {useEffect, useState} from 'react';
import {Avatar} from "@material-ui/core";
import { deepPurple, deepOrange} from '@mui/material/colors';
import {Card, CardContent, Container} from "@material-ui/core";
import NavBar from "./NavBar";
import {useNavigate} from "react-router-dom";


function HeaderComponent(props) {
    const [sessionStorageValue, setSessionStorageValue] =useState(false);
    useEffect(() => {
        if(sessionStorage.userId)
            setSessionStorageValue(true);
    }, []);

    return (
        <div>

            {sessionStorageValue &&
                <NavBar/>
            }
        </div>

    );
}

export default HeaderComponent;