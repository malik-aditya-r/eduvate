import React from 'react';
import styled from 'styled-components';
import {Link, CardActions, Typography, CardContent, Card} from "@mui/material";
import axios from 'axios';
import {BACKEND_URL} from "../utils/constants";
import {useNavigate} from "react-router-dom";
import {postRequest} from "../utils/axiosHelper";

function LoginComponent(props) {
    const navigate = useNavigate();
    const [loginValues, setLoginValues] = React.useState({
        email:'',
        password:''
    });
    const [displayProperty, setDisplayProperty] = React.useState("none");
    console.log(displayProperty)
    const errorStyle = {
        color: "red",
        display: displayProperty
    }
    const StyledButton = styled.button `background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
   background: palevioletred;
    color: white;`;

    const formChange = (e) => {
        e.preventDefault();
        console.log(e.target.name);
        setLoginValues({...loginValues, [e.target.name]:e.target.value});
        // this.setState({user})
    }
    // const emailChainge = (e) =>{
    //     e.preventDefault();
    //     setEmail(e.target.value);
    // }
    console.log(errorStyle);
    const submitRequest = async (e) =>{
        e.preventDefault();
        const response = await postRequest("/user/login",{"email":loginValues.email,"password":loginValues.password})
        if(response.data.msg ==="Success"){
            sessionStorage.setItem('userId', response.data.response[0].id);
            sessionStorage.setItem('userType', response.data.response[0].userType);
            console.log(sessionStorage);
            navigate('/profile');
        }
        else {
            console.log("Failed");
            setDisplayProperty("inline");
        }


    }
    //Redirect to different component?
    // const redirectRegisterPortal =(e) =>{
    //     e.preventDefault();
    //     console.log("Registeration Clicked");
    // }
    return (

        <div style={{}}>
            <Card
                style={{
                    width: 400,
                    backgroundColor: "lightgreen",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "250px"
                }}
            >
                <CardContent>
                    <Typography variant="h2" component="h2">
                        Login
                    </Typography>
                    <Typography variant="h6" component="h6"  style={errorStyle}>
                        Invalid Credentials. Please try again!!!!
                    </Typography>
                    <br/>
                    <form onSubmit={submitRequest}>
                    <div className="login-form" style={{display: "table"}}>
                        <div style={{display: "table-row"}}>
                            <label style={{display: "table-cell"}}>Email</label> <input onChange={formChange} value={loginValues.email} name="email" placeholder="Enter Email"/>
                        </div>
                        <br/>

                        <div style={{display: "table-row"}}>
                            <label style={{display: "table-cell"}}>Password</label> <input onChange={formChange} type="password" value={loginValues.password} name = "password" placeholder="Enter Password"/>
                        </div>
                        <br/>
                        <div style={{display: "table-row"}}>
                            <CardActions>
                                <StyledButton size="small" onClick={submitRequest}>Log In</StyledButton>
                            </CardActions>

                            <Link href={'/register'} style={{display: "table-cell", color: "red"}} >
                                New User?
                            </Link>
                        </div>

                    </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default LoginComponent;