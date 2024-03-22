import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  LinearProgress,
  Paper,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Plus from "../assets/add_circle_outline.svg";
import "./styles/Goals.css";

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
    navigate('/goals'); // Navigates to /goals route when clicked
};

  return (
    <Container
      style={{
        width: "430px",
        height: "932px",
        flexGrow: "0",
        padding: "0 0 8px",
      }}
    >
      <Typography variant="h5" gutterBottom>
        View current goals or create a goal
      </Typography>
      <div style={{ fontSize: "16px" }}>
                <p style={{ display: "inline", margin: "0 5px" }}>You have</p>
                <h2 style={{ display: "inline", margin: "0 5px" }}>
                    ${300}
                </h2>
                <p style={{ display: "inline", margin: "0 5px" }}>
                    saved towards your goals.
                </p>
            </div>
      <Box sx={{ border: "2px solid grey" }}>
        <Typography variant="subtitle1">Personal Goals </Typography>
        {goals.map((goal) => (
          <Paper key={goal.id} elevation={2} sx={{ mb: 2, p: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <div className="emoji-container">
                <span role="img" aria-label={goal.title}>
                  {unicodeToEmoji(goal.emoji)}
                </span>
              </div>
              {goal.title}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={calculateProgress(goal.saved, goal.total)}
              sx={{ height: "10px", borderRadius: "5px", mt: 1 }}
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
            >
              <Typography variant="body2">{`${Math.round(
                calculateProgress(goal.saved, goal.total)
              )}% of Total Goal`}</Typography>
              <Typography variant="body2">${goal.saved}</Typography>
            </Box>
          </Paper>
        ))}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }} onClick={handleCreateGoalClick}>
        <Box className="goal-arrow-container">
          <img src={Plus} alt="Create new goal" />
        </Box>
        <Typography variant="subtitle1" sx={{ ml: 1 }}>
          Create a savings goal
        </Typography>
      </Box>
    </Container>
  );
}
