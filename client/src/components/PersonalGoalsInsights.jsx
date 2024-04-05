import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Box, Typography, LinearProgress, Paper, Divider } from "@mui/material";
import { UserContext } from "../context/UserContext";
import ArrowForward from "../assets/arrow_forward.svg";
import "./styles/Goals.css";

export default function PersonalGoalsInsights() {
    const { id } = useParams()
    const { personalGoals, setPersonalGoals } = useContext(UserContext)

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
            <h1 style={{ padding: "8px" }}>Your personal goal</h1>
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
                {personalGoals.filter(goal => goal.id == id).map((goal) => (
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
                            {goal.insights.length > 0 ? goal.insights.filter((insight) => insight.personal_goal_id === goal.id).map((insight) => (
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
      </div>
    )
}
