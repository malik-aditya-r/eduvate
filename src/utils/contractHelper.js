import {Contract, ethers} from "ethers";
import contractAbi from './solidityAbi'
import {abi} from "./constants";

//https://dev.to/xamhans/how-to-create-a-dapp-with-react-solidity-on-ethereum-blockchain-1gg0
export default async function getContract(contractAddress){
    const provider = new ethers.providers.Web3Provider(window.ethereum,"any");
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    console.log(await provider.getNetwork())
    console.log("Account:", await signer.getAddress());

    const contract = new Contract(
        contractAddress,
        abi,
        signer
    );
    return contract;
}