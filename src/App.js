import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import LoginComponent from "./Component/LoginComponent";
import HeaderComponent from "./Component/HeaderComponent";
import RegisterComponent from "./Component/RegisterComponent";
import TestComponent from "./Component/TestComponent";
import CourseListComponent from "./Component/CourseListComponent";
import CourseDetailsComponent from "./Component/CourseDetailsComponent";
import CourseComponent from "./Component/CourseComponent";
import PDFViewerComponent from "./Component/PDFViewerComponent";
import QuizComponent from "./Component/QuizComponent";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProfileComponent from "./Component/ProfileComponent";
import NavBar from "./Component/NavBar";
import CourseProposalDetailsComponent from "./Component/CourseProposalDetailsComponent";
import RegisterCourseProposal from "./Component/RegisterCourseProposal";

function App() {


    return (


        <BrowserRouter>
             <HeaderComponent />
            <Routes>
                <Route exact path ='/proposalCourseDetails' element={<CourseProposalDetailsComponent />} />
                <Route exact path ='/proposalCourseRegister' element={<RegisterCourseProposal />} />
                 <Route exact path ="/" element={<LoginComponent />} />
                 <Route exact path ="/register" element={<RegisterComponent />} />
                 <Route exact path ="/courseList" element={<CourseListComponent />} />
                 <Route exact path ="/courseDetails" element={<CourseDetailsComponent />} />
                 <Route exact path ="/courseComponent" element={<CourseComponent />} />
                 <Route exact path ='/navbar' element={<NavBar />} />
               <Route exact path ="/profile" element={<ProfileComponent />} />
             </Routes>
        </BrowserRouter>

  );
}

export default App;
// export default function App() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={<LoginComponent />}>
//                     <Route path="register" element={<RegisterComponent />} />
//                     {/*<Route path="contact" element={<Contact />} />*/}
//                     {/*<Route path="*" element={<NoPage />} />*/}
//                 </Route>
//             </Routes>
//         </BrowserRouter>
//     );
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
