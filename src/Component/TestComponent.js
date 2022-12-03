import React, {useEffect} from 'react';
import {Card, CardContent, CardActions} from  "@mui/material";
import styled from 'styled-components';
import getContract from "../utils/contractHelper";

function TestComponent(props) {
    const [contract, setContract] = React.useState();
    const StyledButton = styled.button `background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
   background: palevioletred;
    color: white;`;
    const contractAddress = "0x99D0a276E5a70d0FcCb78D3D3eD78101C64C78aF";
    // console.log(contractAddress);
    useEffect( () => {
        const fetchContract = async () => {
            setContract(getContract(contractAddress));
            console.log(contract)
        }
        fetchContract().catch(err=>{
            console.log(err);
        });
    }, []);

    const submitRequest = async (e) =>{
        e.preventDefault();
        console.log("~~~~~~~~~~~~~~~");
        contract.then( async (res) =>{
            let response = await res.getSystemAddress();
            console.log(response.from);
        })
        let response = contract.methods;
        console.log(response);
    }
    return (

        <div>
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
                    <CardActions>
                        <StyledButton size="small" onClick={submitRequest}>Log In</StyledButton>
                    </CardActions>
                </CardContent>
            </Card>
        </div>
    );
}

export default TestComponent;