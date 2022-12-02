import axios from "axios";
import {BACKEND_URL} from "./constants";

const getRequest =async (url) =>{
    console.log("Get Request");
    console.log(url);
    try {
        const response = await axios.get(BACKEND_URL.concat(url),{withCredentials: true});
        return response;
    }
    catch(exe){
        console.log("Axios Error");
        console.error(exe);
    }
}

const postRequest =async (url, body) =>{
    console.log("POST Request");
    console.log(BACKEND_URL.concat(url));
    console.log(body);
    try {
        const response = await axios.post(BACKEND_URL.concat(url), body, {withCredentials: true});
        return response;
    }
    catch(exe){
        console.log("Axios Error");
        console.error(exe);
        return {"msg" :"Error"};

    }
}


export {getRequest,postRequest}