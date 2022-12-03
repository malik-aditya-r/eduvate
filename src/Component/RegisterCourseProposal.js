import React, {useEffect, useState} from 'react';
import {Card, CardContent, Typography, Button, Link, CardActions}  from "@mui/material";
import styled from 'styled-components';
import axios from "axios";
import {BACKEND_URL, contractAddress} from "../utils/constants";
import {useNavigate} from "react-router-dom";
import getContract from "../utils/contractHelper";
import {ethers} from "ethers";

//Add sending user webid to backend for storage.

function RegisterCourseComponent(props) {
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
        documentUrl:'',
        quiz: '',
        courseDesc:'',
        courseInstructor: '',
        imageSource: '',
        courseName: '',
        cost:''

    });

    const formChange = (e) => {
        e.preventDefault();
        console.log(e.target.name);
        setRegisterValues({...registerValues, [e.target.name]:e.target.value});
    }
    const submitRequest =(e) =>{
        console.log(contract)
        e.preventDefault();
        //To test
        axios.post(BACKEND_URL+"/courseAlt/proposal",registerValues
            ,{ withCredentials: true }).then(response =>{
            console.log(response.data);
            if(response.data.msg ==="Success"){
                localStorage.setItem('user', response.data.userId);
                contract.then( async (res) =>{
                    let contractResponse = await res.addProposal(response.data.proposalId);

                    console.log(contractResponse);
                })
                navigate('/profile');
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
                        Register Course
                    </Typography>
                    <br/>
                    <CardContent className="login-form" style={{display: "table"}}>

                        <form onSubmit={submitRequest} >

                            <div className="login-form" style={{display: "table"}}>

                                <CardContent style={{display: "table-row"}}>
                                    <label style={{display: "table-cell"}}>Course Name</label> <input onChange={formChange} value={registerValues.courseName} name="courseName" placeholder="Enter Course Name"/>
                                </CardContent>
                                <br/>

                                <CardContent style={{display: "table-row"}}>
                                    <label style={{display: "table-cell"}}>Course Description</label> <input onChange={formChange} value={registerValues.courseDesc} name="courseDesc" type={"textArea"} placeholder="Enter Course Description"/>
                                </CardContent>
                                <br/>

                                <CardContent style={{display: "table-row"}}>
                                    <label style={{display: "table-cell"}}>Course Instructor's Name</label> <input onChange={formChange} value={registerValues.courseInstructor} name="courseInstructor" placeholder="Enter Course Instructor's Name"/>
                                </CardContent>
                                <br/>

                                <CardContent style={{display: "table-row"}}>
                                    <label style={{display: "table-cell"}}>Course Document URL</label> <input onChange={formChange} value={registerValues.documentUrl} name="documentUrl" placeholder="Enter Course PDF Document URL"/>
                                </CardContent>
                                <br/>
                                <CardContent style={{display: "table-row"}}>
                                    <label style={{display: "table-cell"}}>imageSource</label> <input onChange={formChange} type="text" value={registerValues.imageSource} name = "imageSource" placeholder="Enter Teaser Image URL"/>
                                </CardContent>
                                <br/>
                                <CardContent style={{display: "table-row"}}>
                                    <label style={{display: "table-cell"}}>Course Cost (Wei)</label> <input onChange={formChange} type="number" value={registerValues.cost} name = "cost" placeholder="Enter Cost"/>
                                </CardContent>
                                <br/>
                                <CardContent style={{display: "table-row"}}>
                                    <label style={{display: "table-cell"}}>Quiz</label> <input onChange={formChange} type="textbox" rows="4" cols="50" value={registerValues.quiz} name = "quiz" placeholder='Enter Quiz in json Eg - [{"quizNumber":1,"quizTitle":"This is a quiz","options":[{"value":1,"label":"Option 1"},{"value":2,"label":"Option 2"},{"value":3,"label":"Option 3"},{"value":4,"label":"Option 4"}],"correctValue":2},{"quizNumber":2,"quizTitle":"This is a quiz 2","options":[{"value":5,"label":"Option 5"},{"value":6,"label":"Option 6"},{"value":7,"label":"Option 7"},{"value":8,"label":"Option 8"}],"correctValue":7}]'/>
                                </CardContent>
                                <br/>
                                <CardContent style={{display: "table-row"}}>
                                    <CardActions>
                                        <StyledButton size="small" onClick={submitRequest}>Register Course Proposal</StyledButton>
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

export default RegisterCourseComponent;