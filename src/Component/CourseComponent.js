import React, {useEffect} from 'react';
import {Button, List, ListItemButton, Table, TableCell, Typography} from "@mui/material";
import PDFViewerComponent from "./PDFViewerComponent";
import QuizComponent from "./QuizComponent";
import axios from "axios";
import {BACKEND_URL, contractAddress} from "../utils/constants";
import getContract from "../utils/contractHelper";
import {ethers} from "ethers";
import {useLocation} from "react-router-dom";

function CourseComponent(props) {
    const {state} = useLocation()
    const {courseId} = state;
    const [contentColor, setContentColor] = React.useState("lightpink");
    const [quizColor, setQuizColor] = React.useState("none");
    const [quizSelected, setQuizSelected] = React.useState(false);
    const [userStatus, setUserStatus] = React.useState(false);
    const [quiz, setQuiz] = React.useState([]);
    const [documentUrl, setDocumentUrl] = React.useState("");
    const [score, setScore] = React.useState(0);
    const [refunded, setRefunded] = React.useState(false);
    const [refundedToUserWalletAddress, setRefundedToUserWalletAddress] = React.useState();
    const [contract, setContract] = React.useState();
    const [courseCost, setCourseCost] = React.useState();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                let response = await axios.get(BACKEND_URL + "/courseAlt/getCourse/"+courseId,{ withCredentials: true });
                console.log(response);
                if (response.data.msg === "Success") {
                    setDocumentUrl(response.data.courseDetails.documentUrl);
                    setQuiz(JSON.parse(response.data.courseDetails.quiz));
                    setCourseCost(response.data.courseDetails.cost)
                }
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchCourse().catch(err=>{
            console.log(err);
        });

        const fetchStatus = async () => {
            try {
                let response = await axios.get(BACKEND_URL + "/courseAlt/status/"+courseId,{ withCredentials: true });
                console.log("fetchStatus");
                console.log(response);
                if (response.data.msg === "Success") {
                    setUserStatus(response.data.completed);
                    setScore(response.data.score);
                    setRefunded(response.data.refunded);
                    setRefundedToUserWalletAddress(response.data.refundedToUserWalletAddress);
                }
            }
            catch (err) {
                console.error(err);
            }

            const fetchContract = async () => {
                setContract(getContract(contractAddress));
                console.log(contract)
            }
            fetchContract().catch(err=>{
                console.log(err);
            });
        }
        fetchStatus().catch(err=>{
            console.log(err);
        });
    }, []);

    const handleButtonClick =async (e) =>{
        console.log(e.currentTarget.id);
        console.log(e.target.id);
        if(e.target.id==="content"){
            setQuizColor("none");
            setContentColor("lightpink");
            setQuizSelected(false)
        }
        else{
            setQuizColor("lightpink");
            setContentColor("none");
            setQuizSelected(true);
        }
    }

    const [selectedAnswers, setSelectedAnswers] = React.useState({});
    const handleSelected =(e) =>{
        console.log("Hello")
        console.log(e.target)
        console.log(e.target.value)
        let location = parseInt(e.target.name.substring(e.target.name.indexOf("-")+1))
        console.log(location)
        let dummySelection ={};
        dummySelection[location] = e.target.value
        setSelectedAnswers({...selectedAnswers, ...dummySelection})
        // let ele = (HTMLInputElement)(e.target).id;
        // let val = (HTMLInputElement)(e.target).value;
        // console.log(ele);
        // console.log(val);
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(selectedAnswers);
        const requestBody ={"courseId":courseId, "quizResponse":selectedAnswers};
        const response = await axios.post(BACKEND_URL + '/courseAlt/evaluate',requestBody,{ withCredentials: true });
        console.log("handleSubmit");
        console.log(response);
        if(response.data.msg==="Success") {
            setUserStatus(true);
            setScore(response.data.score);
            setRefunded(response.data.refunded);
            setRefundedToUserWalletAddress(response.data.refundedToUserWalletAddress);
        }

        //Make axios call to backend

    }

    const getScore =()=>{
        if(score<40){
            return 1;
        }
        else if(score<60)
            return 2;
        else if(score<80)
            return 3;
        else
            return 4;
    }
    //Sessoion Check
    const handleTransaction = async (e) =>{
        e.preventDefault();
        contract.then( async (res) =>{
            let performance = getScore();
            let contractResponse = await res.studentCourseGrade(performance, 2, courseCost);

            console.log(contractResponse);
            let updateRequest ={"courseId": courseId, "updates": [
                    {
                        "fieldName": "refundedToUserWalletAddress",
                        "fieldValue": contractResponse.from,
                        "type":"string"
                    },

                    {
                        "fieldName": "refundedPercentage",
                        "fieldValue": (performance-1)*10,
                        "type":"int"
                    },

                    {
                        "fieldName": "refunded",
                        "fieldValue": true,
                        "type":"boolean"
                    }
                ]}
            let updateResponse = await axios.post(BACKEND_URL+'/courseAlt/updateProgress',updateRequest,{ withCredentials: true });
            // if(updateResponse.data.msg=== "Success")
                console.log(updateResponse);

            setRefunded(true);
            setRefundedToUserWalletAddress(contractResponse.from);
        })
    }

    return (


        <div>
            <Table>
                <TableCell style={{width:"20%"}}>
                    <List>
                        <ListItemButton id ={"content"} style ={{background:contentColor}} defaultChecked={true} onClick={handleButtonClick}>
                            Content
                        </ListItemButton>

                        <ListItemButton id={"quiz"} style ={{background:quizColor}} onClick={handleButtonClick}>
                            Quiz
                        </ListItemButton>
                    </List>
                </TableCell>
                <TableCell align={"bottom"}>
                    {quizSelected ? (userStatus? (<div> <Typography > You have already submitted the quiz and scored {score}%.</Typography>
                            <div><Button variant={"outlined"} disabled={refunded} onClick={handleTransaction}>Get The Reward </Button><Typography hidden={!refunded}> You have already recieved the reward at address {refundedToUserWalletAddress}.</Typography> </div>
                     </div>):
                        ((<div>
                                {quiz.map((currentQuiz, i) => {
                                    console.log(currentQuiz);
                                    return (
                                        <QuizComponent selectedAnswers={selectedAnswers} handleSelected={handleSelected}
                                                       data={currentQuiz}/>)
                                })}
                                <Button variant="contained" onClick={handleSubmit}>Submit</Button>

                            </div>)

                        )) : (
                            <div>
                                <Typography variant="h3" component="h3">
                                    Course Content
                                </Typography>
                                <PDFViewerComponent data={{url: documentUrl}}/>
                            </div>)
                    }
                </TableCell>
            </Table>
        </div>
    );
}

export default CourseComponent;