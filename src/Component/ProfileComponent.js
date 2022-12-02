import React, {useEffect} from 'react';
import axios from "axios";
import {BACKEND_URL, contractAddress} from "../utils/constants";
import {
    Avatar,
    Button,
    CardContent,
    Container,
    Divider,
    FormLabel,
    Table,
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import ListComponent from "./ListComponent";
import List from "@mui/material/List";
import {Link, useNavigate} from "react-router-dom";
import getContract from "../utils/contractHelper";

// https://stackoverflow.com/questions/51642532/how-to-make-a-material-ui-react-button-act-as-a-react-router-dom-link
function ProfileComponent(props) {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] =React.useState({"profileDetails":""});
    const [userType, setUserType] = React.useState(0);
    const [contract, setContract] = React.useState();

    const [elevateAddress, setElevateAddress] = React.useState("");
    const [delevateAddress, setDelevateAddress] = React.useState("");
    const userTypes=["General","School","Owner"];
    console.log("ProfileComponent ", userType);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                let response = await axios.get(BACKEND_URL + "/user/profile",{ withCredentials: true });
                console.log(response);
                if (response.data.msg === "Success") {
                    setUserProfile(response.data.response);
                    setUserType(response.data.response.profileDetails.userType);
                    console.log("Success", userType);
                }
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchProfile().catch(err=>{
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
    const handleCourseSelect =(e)=>{
        e.preventDefault();
        if(userType == 0)
            navigate('/courseDetails',{state:{courseId:e.currentTarget.id}});
        else
            navigate('/proposalCourseDetails',{state:{courseId:e.currentTarget.id}})
        console.log(e.currentTarget.id);

    }

    const handleFormChange = (e) =>{
        e.preventDefault() ;
        if(e.target.name=="elevateAddress"){
            setElevateAddress(e.target.value);
        }
        else{
            setDelevateAddress(e.target.value);
        }
        console.log("elevate", elevateAddress)
        console.log("delevate", delevateAddress)
    }
    const handleFormSubmit = async(e) =>{

        console.log("elevate", elevateAddress)
        console.log("delevate", delevateAddress)
        console.log(e);
        let targetValue = "";
        let endpoint = "";
        let userType = 1;
        if(e.target.name === "elevateButton"){
            console.log(elevateAddress);
            targetValue = elevateAddress;
            endpoint= "elevate";
        }
        else{
            targetValue=delevateAddress;
            endpoint = "delevate";
            userType=0;
        }
        let value = endpoint === "elevate"?1:0;
        console.log(targetValue, endpoint, value)
        contract.then(async (res) => {
            let contractResponse = await res.userTypeUpdate(targetValue);
            console.log(contractResponse);
            axios.put(BACKEND_URL+"/user/update/privileges/"+endpoint,{"userAddress":targetValue}
                ,{ withCredentials: true }).then(response =>{
                console.log(response.data);

                if(response.data.msg ==="Success"){
                    sessionStorage.setItem('userId', response.data.userId);
                    sessionStorage.setItem('userType', userType);
                }
                else{
                    console.log("Failed");
                }
                console.log(response);

            }).catch(err =>{
                console.log(err);
            })
        }).catch(err =>{
            console.log(err);
        })
    }

    return (
        <div style={{
            height: "100%",
            backgroundColor: "lightblue",
            display: 'flex'
        }}>
            <div style={{
                margin: "auto",justifyContent:"center"
            }}>
                {/*Display picture from backend*/}
                <Avatar  style ={{width: 304, height: 304 }}   src={userProfile.profileDetails.profilePicture} >AM</Avatar>
                <br />
                <Typography variant="h2" component ="h2" marginLeft="50px">{userProfile.profileDetails.fname} {userProfile.profileDetails.lname}</Typography>
                <br />
                <Typography variant="h4" component ="h4" marginLeft="50px">{userTypes[userType]}</Typography>
                <br />
                <Divider style ={{width: "100%",justifyContent:"left" }}/>
                <Typography variant="h3" component ="h3" marginLeft="75px">{userType==0?`Courses Enrolled`:`Course Proposals`}</Typography>
                {userProfile.userCourses &&  <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                    {userProfile.userCourses.map((currentData, i) =>{console.log(currentData); return ( <div id={currentData.courseId} onClick={handleCourseSelect}><ListComponent data={currentData} key={currentData.courseId} /> </div>)})}
                </List>}
                <br/>
                {userType ==1 &&  <Button component={Link} to="/proposalCourseRegister" variant={"contained"}>Propose new Course</Button>}
                {userType ==2 &&   (<div>
                    <Table>
                        <TableRow>
                            <TableCell>
                    <form onSubmit={handleFormSubmit}>
                        <input onChange={handleFormChange} size={50} value={elevateAddress} name="elevateAddress" placeholder="Enter Address to be Elevated"/>
                        <Button style={{marginLeft:10  }} onClick={handleFormSubmit} variant ="contained" name={"elevateButton"}>Elevate</Button>
                    </form>
                            </TableCell>
                        <TableCell>
                    <form onSubmit={handleFormSubmit}>
                        <input onChange={handleFormChange}size={50} value={delevateAddress} name="delevateAddress" placeholder="Enter Address to be Delevated"/>
                        <Button style={{marginLeft:10  }} onClick={handleFormSubmit} variant ="contained" name={"delevateButton"}>Delevate</Button>
                    </form>
                        </TableCell>
                        </TableRow>
                    </Table>
                </div>)}
                <br/>

            </div>
    </div>
    );
}

export default ProfileComponent;