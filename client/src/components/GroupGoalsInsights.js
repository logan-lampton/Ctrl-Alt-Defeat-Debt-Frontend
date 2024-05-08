import React, { useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { Container, Box, Typography, LinearProgress, Paper, Divider, Button, Modal } from "@mui/material";
import { UserContext } from "../context/UserContext";
import ModalContext from "../context/ModalContext";
import GoalCongrats from'../assets/GoalsCongrats.svg'
import ArrowForward from "../assets/arrow_forward.svg";

import "./styles/Goals.css";

export default function GroupGoalsInsights() {
    const { id } = useParams()
    const { groupGoals, setGroupGoals } = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false);

    const { handleClose, open} = useContext(ModalContext);

  


      const handleCloseModal = (selectedOption) => {
        setIsOpen(false);
        console.log('Selected option:', selectedOption);
      };
    return (
      <div className="page-container">
        <Container 
            sx={{         
                flexGrow: "0",
                padding: "16px",
                overflow: "auto",
                paddingBottom: 2
            }}
        >
            <h1 style={{ padding: "8px" }}>Your group goal</h1>
            <div style={{ fontSize: "16px", marginBottom: 3}}>
                <p style={{ display: "inline", margin: "0 5px" }}>You have saved</p>
                <h2 style={{ display: "inline", margin: "0 5px" }}>
                    $0
                </h2>
                <p style={{ display: "inline", margin: "0 5px" }}>
                    towards this goal.
                </p>
            </div>
            <Container sx={{ }}>
                {groupGoals && groupGoals.filter(goal => goal.id == id).map((goal) => (
                    <Box
                        key={goal.id}
                        elevation={0}
                        className="border-2"
                        style={{ paddingTop: "10px", marginBottom: "20px", border: 1,  }}
                    >
                        <Container 
                            sx={{ 
                                border: 1, 
                                borderRadius: 2, 
                                borderColor: "#DEE5EB", 
                                display: "flex", 
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "full",
                                paddingY: 2
                            }}
                        >
                            <Container sx={{ display: "flex", width: "full", marginBottom: 2, alignItems: "center"}} >
                                <div className="emoji-container no-underline">{goal.emoji}</div>
                                <div>{goal.name}</div>
                                <div className="goal-arrow-container">${goal.amount_saved}</div>
                            </Container>
                            <Container sx={{ width: "full" }}>
                                <Typography variant="body2" color="#388e3c" >
                                    {`${(goal.amount_saved / goal.saving_target)* 100}% of Total Goal`}
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={(goal.amount_saved / goal.saving_target)* 100}
                                    color='success'
                                    style={{ height: "10px", borderRadius: "5px", marginTop: "10px", backgroundColor: '#D9D9D9', }}
                                />
                            </Container>
                        </Container>
                        <Container sx={{border: 1, borderRadius: 2, borderColor: "#DEE5EB", marginTop: 2,  marginBottom: 1}}>
                            {goal.insights.length > 0 ? goal.insights.filter((insight) => insight.goal_id === goal.id).map((insight) => (
                                <Container key={insight.id}>
                                    <h2>Personalized Strategy</h2>
                                    <p>{insight.strategy}</p>
                                    <h2 style={{ marginBottom: 4}}>Your Insights</h2>
                                    <Box>
                                        {insight.actions.map((action) => (
                                            <Container 
                                                key={action.id} 
                                                sx={{ 
                                                    border: 1, 
                                                    borderRadius: 2, 
                                                    borderColor: "#DEE5EB",
                                                    background: "#F2F5F8",
                                                    marginBottom: 1,
                                                    paddingLeft: 2,
                                                }}
                                            >
                                                <Typography sx={{ marginTop: 2 }}>Financial Insights</Typography>
                                                <p style={{ marginLeft: 0, fontSize: 16, color: "black" }}>{action.text}</p>
                                            </Container>
                                        ))}
                                    </Box>
                                </Container>
                            )) : null}
                        </Container>
                    </Box>
                ))}
            </Container>
        </Container>
        <Modal
                isopen={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                    <div className="modal-container" 
                        style={{
                            borderRadius:"15px",
                            textAlign:"center",
                            backgroundColor: "white", 
                            width:"360px",
                            height:"325px",
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                        
                        }}>
                        <img className="modal-img" src={GoalCongrats} 
                            style={{
                                width: "100px" ,
                                display: "inline-block",
                                height: "78.46",
                                margin:"24px 0px 8px 0px"
                        }}/>            
                        <h1 className="modal-header" 
                            style={{
                                fontSize:"24px", 
                                fontFamily:"TT Commons Bold",
                                margin:"-10px 0px 0px 0px"
                            }}>
                                Congratulations!
                        </h1>
                        <p className="modal-subtext" 
                        style={{
                                margin:"0px 24px 8px 24px",
                                lineHeight:"2",
                                textAlign:"left", 
                                fontSize:"16px"
                            }}>
                                Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna..
                        </p>
                        <Button 
                            style={{
                                width:"89%", 
                                height:"15%", 
                                marginLeft: '24px', 
                                marginRight: '24px', 
                                textTransform:"none"
                            }} 
                            onClick={handleClose}
                            variant="contained">
                                Close
                        </Button>
                    </div>             
                            
                </Modal>
      </div>
    )
}
