import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  LinearProgress,
  Paper,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Plus from "../assets/add_circle_outline.svg";
import "./styles/Goals.css";
import ArrowForward from "../assets/arrow_forward.svg";

export default function SavingsGoals() {
  const [goals, setGoals] = useState([]);

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
        setGoals(
          data.map((goal) => ({
            id: goal.id,
            title: goal.name,
            saved: 33, // This should be a state that tracks the saved amount
            total: goal.saving_target,
            emoji: goal.emoji,
          }))
        );
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, []);

  const calculateProgress = (saved, total) => (saved / total) * 100;

  const unicodeToEmoji = (unicodeStr) => {
    try {
      // Remove the "U+" prefix if present, and trim any whitespace
      const cleanedUnicodeStr = unicodeStr.replace(/^U\+/i, "").trim();
      const codePoint = parseInt(cleanedUnicodeStr, 16);

      // Check if the conversion resulted in a valid number
      if (isNaN(codePoint)) {
        console.error("Invalid Unicode value:", unicodeStr);
        return "🚫"; // Optionally return a placeholder or empty string
      }

      return String.fromCodePoint(codePoint);
    } catch (error) {
      console.error("Error converting Unicode to emoji:", unicodeStr, error);
      return "🚫"; // Optionally return a placeholder or empty string
    }
  };

  const handleCreateGoalClick = () => {
    navigate("/goals"); // Navigates to /goals route when clicked
  };

  return (
    <Container
      style={{
        width: "380px",
        height: "932px",
        flexGrow: "0",
        padding: "0 0 8px",
        overflow: "auto",
      }}
    >
      <h1 style={{ padding: "8px" }}> View current goals or create a goal</h1>
      <div style={{ fontSize: "16px" }}>
        <p style={{ display: "inline", margin: "0 5px" }}>You have</p>
        <h2 style={{ display: "inline", margin: "0 5px" }}>
          ${goals.reduce((acc, goal) => acc + goal.saved, 0)}
        </h2>
        <p style={{ display: "inline", margin: "0 5px" }}>
          saved towards your goals.
        </p>
      </div>
      <Box my={3}>
        <Typography variant="h6">Personal Goals</Typography>
        {goals.map((goal) => (
          <Paper
            key={goal.id}
            elevation={3}
            style={{ padding: "20px", marginBottom: "20px" }}
          >
            <Typography
              variant="subtitle2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="emoji-container">
                {unicodeToEmoji(goal.emoji)}
              </div>
              {goal.title}
              <div className="goal-arrow-container">
                <img
                  src={ArrowForward}
                  style={{ marginTop: "5px" }}
                  alt="ArrowForward"
                />
              </div>
            </Typography>
            <LinearProgress
              variant="determinate"
              value={calculateProgress(goal.saved, goal.total)}
              style={{ height: "10px", borderRadius: "5px", marginTop: "10px" }}
            />
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Typography variant="body2">{`${Math.round(
                calculateProgress(goal.saved, goal.total)
              )}% of Total Goal`}</Typography>
              <Typography variant="body2">${goal.saved}</Typography>
            </Box>
          </Paper>
        ))}
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
          cursor: "pointer",
        }}
        onClick={handleCreateGoalClick}
      >
        <img src={Plus} alt="Create new goal" style={{ marginRight: "10px" }} />
        <Typography variant="subtitle1">Create a new savings goal</Typography>
      </Box>
      <Divider variant="middle" component="li" />
      <Box my={3}>
        <Typography variant="h6">Group Goals</Typography>
        {goals.map((goal) => (
          <Paper
            key={goal.id}
            elevation={3}
            style={{ padding: "20px", marginBottom: "20px" }}
          >
            <Typography
              variant="subtitle2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="emoji-container">
                {unicodeToEmoji(goal.emoji)}
              </div>
              {goal.title}
              <div className="goal-arrow-container">
              ${goal.saved}
              </div>
              <div className="goal-arrow-container">
                <img
                  src={ArrowForward}
                  style={{ marginTop: "5px" }}
                  alt="ArrowForward"
                />
              </div>
            </Typography>
            <LinearProgress
              variant="determinate"
              value={calculateProgress(goal.saved, goal.total)}
              style={{ height: "10px", borderRadius: "5px", marginTop: "10px" }}
            />
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Typography variant="body2">{`${Math.round(
                calculateProgress(goal.saved, goal.total)
              )}% of Total Goal`}</Typography>
              <Typography variant="body2">${goal.saved}</Typography>
            </Box>
          </Paper>
        ))}
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
          cursor: "pointer",
        }}
        onClick={handleCreateGoalClick}
      >
        <img src={Plus} alt="Create new goal" style={{ marginRight: "10px" }} />
        <Typography variant="subtitle1">Create a new group goal</Typography>
      </Box>
    </Container>
  );
}
