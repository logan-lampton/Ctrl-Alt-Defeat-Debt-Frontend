import React, { useState, useEffect, useContext } from "react";
import {
    Container,
    Box,
    Typography,
    LinearProgress,
    Paper,
    Divider,
    Card,
    Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Plus from "../assets/add_circle_outline.svg";
import "./styles/Goals.css";
import ArrowForward from "../assets/arrow_forward.svg";
import { Link } from "react-router-dom";
import { UserContext} from "../context/UserContext";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CircularProgress from "@mui/material/CircularProgress";
import './styles/GoalActivity.css'


export default function SavingsGoals() {
    const { user, personalGoals, setPersonalGoals, groupGoals, setGroupGoals } =
        useContext(UserContext);


       

    const navigate = useNavigate();

    useEffect(() => {
        fetch("/goals")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                // Assuming the data is an array of goal objects
                setGroupGoals(data);
            })
            .catch((error) => {
                console.error(
                    "There has been a problem with your fetch operation:",
                    error
                );
            });

        fetch("/personal_goals")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                // Assuming the data is an array of goal objects
                setPersonalGoals(data);
            })
            .catch((error) => {
                console.error(
                    "There has been a problem with your fetch operation:",
                    error
                );
            });
    }, [setGroupGoals, setPersonalGoals]);

    const calculateProgress = (saved, total) => (saved / total) * 100;

    return (
        <div className='page-container'>
            <Container
                sx={{
                    height: "932px",
                    flexGrow: "0",
                    padding: "16px",
                    overflow: "auto",
                    paddingBottom: 2,
                }}
            >
                <h1 style={{ padding: "8px" }}>
                    {" "}
                    View current goals or create a goal
                </h1>
                <div style={{ fontSize: "16px" }}>
                    <p style={{ display: "inline", margin: "0 5px" }}>
                        You have saved
                    </p>
                    <h2 style={{ display: "inline", margin: "0 5px" }}>$0</h2>
                    <p style={{ display: "inline", margin: "0 5px" }}>
                        towards your goals.
                    </p>
                </div>
                <Box
                    my={3}
                    sx={{
                        border: 1,
                        padding: 2,
                        borderRadius: 2,
                        borderColor: "#DEE5EB",
                    }}
                >
                    <Container
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: 3,
                        }}
                    >
                        <Container>
                            <Typography
                                variant='body'
                                color={"#718291"}
                                fontSize={20}
                            >
                                Personal Goals
                            </Typography>
                            <h2>$0</h2>
                            <Typography variant='body' color={"#718291"}>
                                Total Saved Across All Goals
                            </Typography>
                        </Container>
                        <Container
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Button>
                                <Link to='/goal-selection'>
                                    <AddCircleOutlineIcon
                                        sx={{ width: 32, height: 32 }}
                                    />
                                </Link>
                            </Button>
                        </Container>
                    </Container>
                    {personalGoals && user
                        ? personalGoals
                              .filter((goal) => goal.user_id === user.id)
                              .map((goal) => (
                                  <Box
                                      key={goal.id}
                                      elevation={0}
                                      className='border-2'
                                      style={{
                                          marginBottom: "20px",
                                          outline: 2,
                                      }}
                                  >
                                      <Link
                                          to={`/goals-progress/personal/${goal.id}`}
                                          style={{
                                              textDecoration: "none",
                                              color: "black",
                                          }}
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
                                                  paddingY: 2,
                                              }}
                                          >
                                              <Container
                                                  sx={{
                                                      display: "flex",
                                                      width: "full",
                                                      marginBottom: 2,
                                                      alignItems: "center",
                                                      paddingX: 0,
                                                  }}
                                              >
                                                  <div className='emoji-container no-underline'>
                                                      {goal.emoji}
                                                  </div>
                                                  <div>{goal.name}</div>
                                                  <h2 className='goal-arrow-container'>
                                                      ${goal.amount_saved}
                                                  </h2>
                                              </Container>
                                              <Container>
                                                  <Container
                                                      sx={{
                                                          display: "flex",
                                                          width: "full",
                                                          alignItems: "center",
                                                          paddingX: 0,
                                                      }}
                                                  >
                                                      <Typography
                                                          variant='body2'
                                                          color='#388e3c'
                                                      >
                                                          {`${Math.round(
                                                              calculateProgress(
                                                                  goal.amount_saved,
                                                                  goal.saving_target
                                                              )
                                                          )}% of Total Goal`}
                                                      </Typography>
                                                      <div className='goal-arrow-container'>
                                                          <img
                                                              src={ArrowForward}
                                                              style={{
                                                                  marginTop:
                                                                      "5px",
                                                              }}
                                                              alt='ArrowForward'
                                                          />
                                                      </div>
                                                  </Container>
                                                  <LinearProgress
                                                      variant='determinate'
                                                      value={calculateProgress(
                                                          goal.amount_saved,
                                                          goal.saving_target
                                                      )}
                                                      color={"success"}
                                                      style={{
                                                          height: "10px",
                                                          borderRadius: "5px",
                                                          marginTop: "10px",
                                                          backgroundColor:
                                                              "#D9D9D9",
                                                      }}
                                                  />
                                              </Container>
                                          </Container>
                                      </Link>
                                  </Box>
                              ))
                        : null}
                </Box>
                <Box
                    my={3}
                    sx={{
                        border: 1,
                        padding: 2,
                        borderRadius: 2,
                        borderColor: "#DEE5EB",
                    }}
                >
                    <Container
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: 3,
                        }}
                    >
                        <Container>
                            <Typography
                                variant='body'
                                color={"#718291"}
                                fontSize={20}
                            >
                                Group Goals
                            </Typography>
                            <h2>$0</h2>
                            <Typography variant='body' color={"#718291"}>
                                Total Saved Across All Goals
                            </Typography>
                        </Container>
                        <Container
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography align='right'>Add new Goal</Typography>
                            <Link to='/goal-selection'>
                                <AddCircleOutlineIcon
                                    sx={{ width: 32, height: 32 }}
                                />
                            </Link>
                        </Container>
                    </Container>
                    {groupGoals ? groupGoals.map((goal) => (
                              <Box
                                  key={goal.id}
                                  elevation={0}
                                  className='border-2'
                                  style={{
                                      marginBottom: "20px",
                                      outline: 2,
                                  }}
                              >
                                  <Link
                                      to={`/goals-progress/group/${goal.id}`}
                                      style={{
                                          textDecoration: "none",
                                          color: "black",
                                      }}
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
                                              paddingY: 2,
                                          }}
                                      >
                                          <Container
                                              sx={{
                                                  display: "flex",
                                                  width: "full",
                                                  marginBottom: 2,
                                                  alignItems: "center",
                                                  paddingX: 0,
                                              }}
                                          >
                                              <div className='emoji-container no-underline'>
                                                  {goal.emoji}
                                              </div>
                                              <div>{goal.name}</div>
                                              <h2 className='goal-arrow-container'>
                                                  ${goal.amount_saved}
                                              </h2>
                                          </Container>
                                          <Container>
                                              <Container
                                                  sx={{
                                                      display: "flex",
                                                      width: "full",
                                                      alignItems: "center",
                                                      paddingX: 0,
                                                  }}
                                              >
                                                  <Typography
                                                      variant='body2'
                                                      color='#388e3c'
                                                  >
                                                      {`${Math.round(
                                                          calculateProgress(
                                                              goal.amount_saved,
                                                              goal.saving_target
                                                          )
                                                      )}% of Total Goal`}
                                                  </Typography>
                                                  <div className='goal-arrow-container'>
                                                      <img
                                                          src={ArrowForward}
                                                          style={{
                                                              marginTop: "5px",
                                                          }}
                                                          alt='ArrowForward'
                                                      />
                                                  </div>
                                              </Container>
                                              <LinearProgress
                                                  variant='determinate'
                                                  value={calculateProgress(
                                                      goal.amount_saved,
                                                      goal.saving_target
                                                  )}
                                                  color={"success"}
                                                  style={{
                                                      height: "10px",
                                                      borderRadius: "5px",
                                                      marginTop: "10px",
                                                      backgroundColor:
                                                          "#D9D9D9",
                                                  }}
                                              />
                                          </Container>
                                      </Container>
                                  </Link>
                              </Box>
                          ))
                        : null}
                </Box>
            </Container>
       

        </div>
    );
}
