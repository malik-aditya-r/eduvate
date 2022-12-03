import React, {useEffect} from 'react';
import ListComponent from "./ListComponent";
import {Pagination, TextField, Button, Container, Typography, List} from "@mui/material";
import {useNavigate} from "react-router-dom";

import axios from "axios";
import {BACKEND_URL} from "../utils/constants";

//No results addition required.
//https://codesandbox.io/s/23qvt6?file=/demo.tsx
function CourseListComponent(props) {
    const navigate = useNavigate();
    const [page,setPage] = React.useState(1);
    const [courseData,setCourseData] = React.useState([]);
    const [size,setSize] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState();
    const fetchAll = sessionStorage.getItem("userType") ==="0"?false:true
    console.log("CourseListComponent")
    console.log(fetchAll)
    console.log(sessionStorage.userType);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                let response = await axios.get(BACKEND_URL + "/courseAlt/list?fetchAll="+fetchAll.toString(),{ withCredentials: true });
                console.log(response);
                if (response.data.msg === "Success") {
                    setPage(1);
                    setCourseData(response.data.courseList);
                    setSize(response.data.size);
                }
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchCourses().catch(err=>{
            console.log(err);
        });
    }, []);
    const handleChange = async (e) =>{
        e.preventDefault();
        console.log(e.target.innerText)
        try {
            let endpoint =  "/courseAlt/list?fetchAll="+fetchAll.toString()+"&page="+parseInt(e.target.innerText);
            if(searchTerm !== null || searchTerm !== undefined){
                endpoint = endpoint+"&searchTerm="+searchTerm;
            }
            let response = await axios.get(BACKEND_URL +endpoint,{ withCredentials: true });
            console.log(response);
            if (response.data.msg === "Success") {
                setPage(e.target.innerText);
                setCourseData(response.data.courseList);
                // setSize(response.data.size);
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    const handleSearch = async (e) =>{
        e.preventDefault();
        console.log(e.target.innerText)
        try {
            let response = await axios.get(BACKEND_URL + "/courseAlt/list?searchTerm="+searchTerm,{ withCredentials: true });
            console.log(response);
            if (response.data.msg === "Success") {
                setPage(1);
                setCourseData(response.data.courseList);
                setSize(response.data.size);
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    const handleSearchInput = (e) =>{
        e.preventDefault();
        console.log(e.target.value);
        setSearchTerm(e.target.value);
    }

    const handleCourseSelect = (e) =>{
        e.preventDefault();
        console.log(sessionStorage.getItem("userType") === '0')
        if(sessionStorage.getItem("userType") === '0')
            navigate('/courseDetails',{state:{courseId:e.currentTarget.id}});
        else
            navigate('/proposalCourseDetails',{state:{courseId:e.currentTarget.id}});
        console.log(e.currentTarget.id);
    }

    return (
        <Container>
            <form onSubmit={handleSearch}>
                <TextField id="standard-basic" value={searchTerm} onChange={handleSearchInput} label="Search Courses"  sx={{ width: '100%', maxWidth:600, bgcolor: 'background.paper' }} variant="standard" />
                <Button variant="outlined"  sx={{ marginTop: '10px', marginLeft:'15px'  }} onClick={handleSearch}>Search</Button>
            </form>
                { size>0 &&
                <div>
                <Typography>Page: {page}</Typography>
                    <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                {courseData.map((currentData, i) =>{console.log(currentData); return ( <div id={currentData.courseId} onClick={handleCourseSelect}><ListComponent data={currentData} key={currentData.courseId} /> </div>)})}
                    </List>
                <Pagination count={size} sx={{
                display: "flex",
                justifyContent: "center"}}  onChange={handleChange} />
                </div>
            }
        </Container>
        );
}

export default CourseListComponent;