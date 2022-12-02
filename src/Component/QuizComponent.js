import React from 'react';
import {FormControlLabel, FormLabel, Radio, RadioGroup, Typography} from "@mui/material";
import ListComponent from "./ListComponent";

//Add not able to repeat the quiz
//https://mui.com/material-ui/react-radio-button/
function QuizComponent(props) {
    // const [value, setValue] = React.useState();

    return (
        <div >
            <Typography variant="h6" > Q{props.data.quizNumber}. {props.data.quizTitle}</Typography>
            <br/>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="none"
                name={"question-"+props.data.quizNumber}
                id={props.data.quizNumber}
                onChange={props.handleSelected}
                value={props.selectedAnswers[props.data.quizNumber]}
                style={{alignContent:"left"}}
            >
                {props.data.options.map((currentData, i) =>{
                    console.log(currentData);
                    return ( <FormControlLabel style={{alignSelf:"left"}} value={currentData.value} control={<Radio/>} label={currentData.label}/>)})}
            </RadioGroup>
        </div>
    );
}

export default QuizComponent;