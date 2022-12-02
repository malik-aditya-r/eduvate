module.exports ={
    BACKEND_URL: "http://localhost:8080",
    contractAddress:"0xd43f3739731883888aD0b2257F366a7293Ae8e1C",
    abi : [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "systemAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "queryId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "commentId",
                    "type": "uint256"
                }
            ],
            "name": "commentTransaction",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "total",
                    "type": "uint256"
                }
            ],
            "name": "queryTotal",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "systemAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "queryId",
                    "type": "uint256"
                }
            ],
            "name": "queryTransaction",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "studentAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "enum Eduvate.Performance",
                    "name": "performance",
                    "type": "uint8"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "courseValue",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "returnValue",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "isPossible",
                    "type": "bool"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "transferDone",
                    "type": "bool"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "studentId",
                    "type": "uint256"
                }
            ],
            "name": "studentPerformanceEvent",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "addBalance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "queryId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "commentId",
                    "type": "uint256"
                }
            ],
            "name": "addComment",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "proposalId",
                    "type": "uint256"
                }
            ],
            "name": "addProposal",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "queryId",
                    "type": "uint256"
                }
            ],
            "name": "assignReward",
            "outputs": [
                {
                    "internalType": "bool[]",
                    "name": "",
                    "type": "bool[]"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "chairPersonAddress",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "closeContract",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "enrollStudent",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "proposalId",
                    "type": "uint256"
                }
            ],
            "name": "evaluateProposal",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "queryId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "commentId",
                    "type": "uint256"
                }
            ],
            "name": "fetchCommentDetails",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "commentUserAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "commentUpvotes",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct Eduvate.QueryComment",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "proposalId",
                    "type": "uint256"
                }
            ],
            "name": "fetchProposalDetails",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "proposalByUser",
                            "type": "address"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "userId",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "enum Eduvate.UserType",
                                    "name": "userType",
                                    "type": "uint8"
                                }
                            ],
                            "internalType": "struct Eduvate.User",
                            "name": "proposalUser",
                            "type": "tuple"
                        },
                        {
                            "internalType": "uint256",
                            "name": "votes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "active",
                            "type": "bool"
                        },
                        {
                            "internalType": "enum Eduvate.ProposalDecision",
                            "name": "decision",
                            "type": "uint8"
                        }
                    ],
                    "internalType": "struct Eduvate.CourseProposal",
                    "name": "",
                    "type": "tuple"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "queryId",
                    "type": "uint256"
                }
            ],
            "name": "fetchQueryDetails",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "userAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "queryReward",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalUpvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "active",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "commentIds",
                            "type": "uint256[]"
                        }
                    ],
                    "internalType": "struct Eduvate.Query",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "fetchTotalSchools",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "fetchUser",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "userId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "enum Eduvate.UserType",
                            "name": "userType",
                            "type": "uint8"
                        }
                    ],
                    "internalType": "struct Eduvate.User",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getChairPersonAddress",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getUserType",
            "outputs": [
                {
                    "internalType": "enum Eduvate.UserType",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "queryId",
                    "type": "uint256"
                }
            ],
            "name": "registerQuery",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "userAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "queryReward",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalUpvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "active",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "commentIds",
                            "type": "uint256[]"
                        }
                    ],
                    "internalType": "struct Eduvate.Query",
                    "name": "",
                    "type": "tuple"
                },
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "userId",
                    "type": "uint256"
                }
            ],
            "name": "registerUser",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "enum Eduvate.Performance",
                    "name": "stuPerformance",
                    "type": "uint8"
                },
                {
                    "internalType": "uint256",
                    "name": "studentId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "courseValue",
                    "type": "uint256"
                }
            ],
            "name": "studentCourseGrade",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "queryId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "commentId",
                    "type": "uint256"
                }
            ],
            "name": "updateVote",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                }
            ],
            "name": "userTypeUpdate",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "proposalId",
                    "type": "uint256"
                }
            ],
            "name": "voteProposal",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        }
    ],
    chairPersonAddress:"0xc0a68bA45F100d9b79a78fABCb0Fb0B5C5Cc0369"
}