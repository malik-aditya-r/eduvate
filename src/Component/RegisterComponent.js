import React, {useEffect, useState} from 'react';
import {Card, CardContent, Typography, Button, CardActions, Link} from "@mui/material";
import styled from 'styled-components';
import axios from "axios";
import {BACKEND_URL, chairPersonAddress, contractAddress} from "../utils/constants";
import {useNavigate} from "react-router-dom";
import getContract from "../utils/contractHelper";
import {ethers} from "ethers";

//Add sending user webid to backend for storage.

function RegisterComponent(props) {
    const [contract,setContract] = useState();
    useEffect(() => {

        const fetchContract = async () => {
            await setContract(getContract(contractAddress));
            console.log(contract)
        }
        fetchContract().catch(err=>{
            console.log(err);
        });
    }, []);

    const navigate = useNavigate();
    const StyledInput = styled.input`
              display: table-cell;
              margin:  auto;
              border: 1px solid lightblue;
            `;
    const StyledButton = styled.button `background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
   background: palevioletred;
    color: white;`;

    const [displayProperty, setDisplayProperty] = React.useState({
        emailDisplay:"none",
        passwordDisplay:"none"
    });
    const errorStyle = {
        color: "red",
        display: displayProperty.passwordDisplay
    }

    const [registerValues, setRegisterValues] = React.useState({
        email:'',
        confirmEmail: '',
        password:'',
        confirmPassword: '',
        fname: '',
        lname: '',
        profilePicture:''

    });

    const formChange = (e) => {
        e.preventDefault();
        console.log(e.target.name);
        setRegisterValues({...registerValues, [e.target.name]:e.target.value});
        if(e.target.name === "password" || e.target.name ==="confirmPassword"){
            if (registerValues.password !== registerValues.confirmPassword ){

            }
        }
        // this.setState({user})
    }
    const submitRequest =(e) =>{
        console.log(contract)
        e.preventDefault();
        //To test
        axios.post(BACKEND_URL+"/user/register",{"email":registerValues.email,"password":registerValues.password,"fname":registerValues.fname,"lname":registerValues.lname}
        ,{ withCredentials: true }).then(response =>{
            console.log(response.data);
            if(response.data.msg ==="Success"){
                localStorage.setItem('user', response.data.userId);
                let userType = response.data.userType;
                contract.then( async (res) =>{
                    let contractResponse = await res.registerUser(response.data.userId);
                    console.log(contractResponse);
                    let updateRequest ={"userId": response.data.userId, "userWalletAddr": contractResponse.from}
                    let chainUserType = await res.getUserType();
                    console.log("User Types", chainUserType,userType )
                    console.log(contractResponse.from)
                    console.log(chairPersonAddress)
                    if( contractResponse.from === chairPersonAddress){
                        updateRequest["userType"] = 2;
                    }
                    let updateResponse = await axios.post(BACKEND_URL+'/user/update',updateRequest,{ withCredentials: true });
                    console.log(updateResponse.data);

                })
                navigate('/');
            }
            else{
                console.log("Failed");
                setDisplayProperty("inline");
            }
            console.log(response);

        }).catch(err =>{
            console.log(err);
        })
    }

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
                    <Typography variant="h3" component="h3">
                        Register
                    </Typography>
                    <br/>
                    <CardContent className="login-form" style={{display: "table"}}>

                        <Typography variant="h6" component="h6"  style={errorStyle}>
                            Passwords Don't match
                        </Typography>
                        <form onSubmit={submitRequest} >

                            <div className="login-form" style={{display: "table"}}>

                                <CardContent style={{display: "table-row"}}>
                                    <label style={{display: "table-cell"}}>First Name</label> <input onChange={formChange} value={registerValues.fname} name="fname" placeholder="Enter First Name"/>
                                </CardContent>
                                <br/>

                                <CardContent style={{display: "table-row"}}>
                                    <label style={{display: "table-cell"}}>Last Name</label> <input onChange={formChange} value={registerValues.lname} name="lname" placeholder="Enter Last Name"/>
                                </CardContent>
                                <br/>

                                <CardContent style={{display: "table-row"}}>
                                <label style={{display: "table-cell"}}>Email</label> <input onChange={formChange} value={registerValues.email} name="email" placeholder="Enter Email"/>
                            </CardContent>
                            <br/>

                            <CardContent style={{display: "table-row"}}>
                                <label style={{display: "table-cell"}}>Confirm Email</label> <input onChange={formChange} value={registerValues.confirmEmail} name="confirmEmail" placeholder="Enter Confirm Email"/>
                            </CardContent>
                            <br/>
                            <CardContent style={{display: "table-row"}}>
                                <label style={{display: "table-cell"}}>Password</label> <input onChange={formChange} type="password" value={registerValues.password} name = "password" placeholder="Enter Password"/>
                            </CardContent>
                            <br/>
                            <CardContent style={{display: "table-row"}}>
                                <label style={{display: "table-cell"}}>Confirm Password</label> <input onChange={formChange} type="password" value={registerValues.confirmPassword} name = "confirmPassword" placeholder="Enter ConfirmPassword"/>
                            </CardContent>
                            <br/>
                                <CardContent style={{display: "table-row"}}>
                                    <label style={{display: "table-cell"}}>Profile picture</label> <input onChange={formChange} type="text" value={registerValues.profilePicture} name = "profilePicture" placeholder="Enter Profile Picture URL"/>
                                </CardContent>
                                <br/>
                            <CardContent style={{display: "table-row"}}>
                                <CardActions>
                                    <StyledButton size="small" onClick={submitRequest}>Register</StyledButton>
                                </CardActions>
                            </CardContent>
                            </div>
                        </form>
                    </CardContent>
                </CardContent>
            </Card>
        </div>
    );
}

export default RegisterComponent;