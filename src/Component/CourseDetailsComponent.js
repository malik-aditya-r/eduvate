import React, {useEffect} from 'react';
import {Button, Table, TableCell, TableRow} from "@mui/material";
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

function CourseDetailsComponent(props) {
    const navigate = useNavigate();
    const {state} = useLocation()
    const {courseId} = state;
    console.log(useLocation());
    const [course, setCourse] = React.useState({});
    const [courseEnrolled, setCourseEnrolled] = React.useState(false);
    const [contract, setContract] = React.useState();

    const userId = sessionStorage.getItem("userId");
    console.log("CourseDetailsComponent " + userId);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                let response = await axios.get(BACKEND_URL + "/courseAlt/getCourse/"+courseId,{headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*",
                    }, withCredentials: true });
                console.log(response);
                if (response.data.msg === "Success") {
                    setCourse(response.data.courseDetails);
                    setCourseEnrolled(response.data.userEnrolled);
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
            setContract(getContract(contractAddress));
            console.log(contract)
        }
        fetchContract().catch(err=>{
            console.log(err);
        });
    }, []);

    const handleEnroll = async (e)=>{
        console.log(contract)
        e.preventDefault();
        if(e.target.innerText.toLocaleLowerCase() === "enroll"){
            let response = await axios.put(BACKEND_URL+'/courseAlt/'+courseId,{},{ withCredentials: true });
            console.log(response.data.enrollmentId);
            contract.then( async (res) =>{
                let contractResponse = await res.enrollStudent(
                    {value: ethers.BigNumber.from(course.cost)});

                console.log(contractResponse);
                let updateRequest ={"courseId": courseId, "updates": [
                        {
                            "fieldName": "paidByUserWalletAddress",
                            "fieldValue": contractResponse.from,
                            "type":"string"
                        }
                    ]}
                let updateResponse = await axios.post(BACKEND_URL+'/courseAlt/updateProgress',updateRequest,{ withCredentials: true });
                if(updateResponse.data.msg=== "Success")
                    setCourseEnrolled(true);
            })
        }
        //Go to the course to add logic
        else{
            console.log("Go to course");
            navigate('/courseComponent',{state:{courseId:courseId}});
        }
        console.log(e);
    }

    return (
        <div>
        <div style={{
            height: 400,
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
                <TableRow align={"left"}>
                    <TableCell>
                    <Button variant="contained" onClick={handleEnroll}>{courseEnrolled?'Go to course':'Enroll'}</Button>
                    </TableCell>
                </TableRow>
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
export default CourseDetailsComponent;