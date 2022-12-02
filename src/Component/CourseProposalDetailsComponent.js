import React, {useEffect} from 'react';
import {Button, ButtonGroup, Table, TableCell, TableRow} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import {BACKEND_URL} from "../utils/constants";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {contractAddress} from "../utils/constants";
import getContract from "../utils/contractHelper";
import {ethers} from "ethers";
import {useLocation} from "react-router-dom";

import {useNavigate} from "react-router-dom";
//UnEnroll option for phase 3

function CourseProposalDetailsComponent(props) {

    const userType = sessionStorage.getItem("userType");
    const navigate = useNavigate();
    const {state} = useLocation()
    const {courseId} = state;
    // let {courseId} = props.courseId || 5;
    const votes = ["Against","Neutral","For"]
    // courseId = 5;
    console.log(useLocation());
    console.log(userType);
    const [course, setCourse] = React.useState({});
    const [vote, setVote] = React.useState(null);
    const [proposalActive, setProposalActive] = React.useState(true);
    const [disableButtonGroup, setDisableButtonGroup] = React.useState(false);
    const [contract, setContract] = React.useState();

    const userId = sessionStorage.getItem("userId");
    console.log("CourseProposalDetailsComponent " + courseId);
    console.log("CourseProposalDetailsComponent " + userId);
    console.log("CourseProposalDetailsComponent " + vote);
    if(userId==null){
        sessionStorage.setItem("userId",2)
    }
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                let response = await axios.get(BACKEND_URL + "/courseAlt/proposal/"+(courseId).toString(),{headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*",
                    }, withCredentials: true });
                console.log(response);
                if (response.data.msg === "Success") {
                    setCourse(response.data.courseDetails);
                    setProposalActive(response.data.courseDetails.proposalActive)
                    if(response.data.courseDetails.proposalActive){
                        if(response.data.courseDetails.vote !== undefined && response.data.courseDetails.vote !== null) {
                            setVote(response.data.courseDetails.vote);
                            setDisableButtonGroup(true);
                        }
                    }
                    else{
                        if(response.data.courseDetails.vote !== undefined && response.data.courseDetails.vote !== null) {
                            setVote(response.data.courseDetails.vote);
                            setDisableButtonGroup(true);
                        }
                        else{
                            setVote(null);
                        }
                    }
                }
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchCourses().catch(err=>{
            console.log(err);
        });

        const fetchContract = async () => {
            await setContract(getContract(contractAddress));
            console.log(contract)
        }
         fetchContract().catch(err=>{
            console.log(err);
        });
    }, []);

    const handleVote = async (e)=>{
        e.preventDefault();
        console.log("~~~~~~~~~~~~");
        console.log(sessionStorage);
        if(e.target.value !== null || e.target.value !== undefined) {
            let response = await axios.post(BACKEND_URL + '/courseAlt/proposal/vote', {
                "vote": e.target.value,
                "courseProposalId": courseId
            }, {withCredentials: true});
            console.log(response.data.msg);
            contract.then(async (res) => {
                let contractResponse = await res.voteProposal(courseId);
                console.log(contractResponse);
            })
            setVote(e.target.value);
            setDisableButtonGroup(true);
            //Go to the course to add logic
        }
    }
    const handleEvaluate = async(e) =>{
        e.preventDefault();
        let response = await axios.get(BACKEND_URL + '/courseAlt/proposal/evaluate/'+(courseId).toString(), {withCredentials: true});
        console.log(response.data.msg);
        contract.then(async (res) => {
            let contractResponse = await res.evaluateProposal(courseId);
            console.log(contractResponse);
        })
        setVote(e.target.value);
        setDisableButtonGroup(true);
    }

    return (
        <div>
            <div style={{
                height: 450,
                backgroundColor: "lightgreen",
                display: "flex"
            }}>
                <Table sx={{marginLeft: "15px"}}>
                    <TableRow align={"left"}>
                        <Avatar sx ={{width: 104, height: 104,marginTop: "20px" }}alt={course.courseInstructor} src={course.imageSource} />
                        <br />

                        <Typography
                            sx={{ display: 'inline', marginTop: "20px" }}
                            component="span"
                            variant="h6"
                            color="text.primary"
                        >
                            {course.courseInstructor}
                        </Typography>
                    </TableRow>
                    <TableRow align={"left"}>

                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="h6"
                            color="text.primary"
                        >
                            Course Cost - {course.cost} Wei
                        </Typography>
                        <br />
                        <br />
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="h4"
                            color="text.primary"
                        >
                            {course.courseName}
                        </Typography>
                        <br />

                        <Typography
                            sx={{ display: 'inline', marginTop: "20px" }}
                            component="span"
                            variant="body"
                            color="text.primary"
                        >
                            {course.courseDesc}
                        </Typography>
                    </TableRow>
                    {userType === "1" && (proposalActive && <div><TableRow align={"left"}>
                        <ButtonGroup disabled={disableButtonGroup} variant="outlined" aria-label="outlined button group"
                                     value={vote} onClick={handleVote}>
                            <Button value={-1}>Against</Button>
                            <Button value={0}>Neutral</Button>
                            <Button value={1}>For</Button>
                        </ButtonGroup>
                    </TableRow>
                        <TableRow align={"left"}>

                    {disableButtonGroup && (
                        <Typography
                        sx={{display: 'inline', marginTop: "20px"}}
                        component="span"
                        variant="body"
                        color="text.primary"
                        >
                        You have already voted as - {votes[vote+1]}.
                        </Typography>
                        )}
                        </TableRow>
                    </div> )}

                    {userType === "1" && (!proposalActive && <div><TableRow align={"left"}>
                        <ButtonGroup disabled={true} variant="outlined" aria-label="outlined button group"
                                     value={vote} onClick={handleVote}>
                            <Button value={-1}>Against</Button>
                            <Button value={0}>Neutral</Button>
                            <Button value={1}>For</Button>
                        </ButtonGroup>
                    </TableRow>
                        <TableRow align={"left"}>
                                <Typography
                                    sx={{display: 'inline', marginTop: "20px"}}
                                    component="span"
                                    variant="body"
                                    color="text.primary"
                                >
                                    {vote!=null? ("You have already voted as - "+votes[vote+1]):("You didn't vote for this proposal")}.

                                </Typography>
                            <br/>
                            <br/>
                            <Typography
                                sx={{display: 'inline', marginTop: "20px"}}
                                component="span"
                                variant="body"
                                color="text.primary"
                            >
                                Course {course.valid?"became":"didn't become"} valid by having final score : {(course.finalScore).toString()}

                            </Typography>
                        </TableRow>
                    </div> )}
                    {userType === "2" &&
                        <Button disabled={!proposalActive} variant={"outlined"} onClick={handleEvaluate}> Evaluate
                            Course Proposal </Button>}
                    <br/>
                    <br/>
                    {(userType === "2" && !proposalActive) &&  (<Typography
                        sx={{display: 'inline', marginTop: "20px"}}
                        component="span"
                        variant="body"
                        color="text.primary"
                        >
                        Course {course.valid?"became":"didn't become"} valid by having final score : {(course.finalScore).toString()}

                        </Typography>)
                    }

                </Table>
            </div>
            <Divider> </Divider>
        </div>
    );
}
// sx={{
//     marginLeft: "auto",
//         marginRight: "15px",
//         marginTop: "15px"
// }}>
export default CourseProposalDetailsComponent;