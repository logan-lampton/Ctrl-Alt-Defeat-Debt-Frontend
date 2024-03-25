import { React, useState, useContext } from "react";
import { Container, ThemeProvider, createTheme } from "@mui/system";
import pigbank from "../assets/pigbank.svg";
import { Button, ToggleButtonGroup, ToggleButton } from "@mui/material";
import styled from "@emotion/styled";
import PlaidLinkButton from "./PlaidLinkButton";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Onboarding = () => {
  const [selected, setSelected] = useState([]);

  const [accessToken, setAccessToken] = useState("");

  const { user, setUser } = useContext(UserContext);

  const handleAccessToken = (token) => {
    setAccessToken(token); 
    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _access_token: token,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update user.');
        }
        return response.json(); // Parse the response from the PATCH request
      })
      .then((patchData) => {
        console.log("User updated successfully:", patchData);
        return fetch('/check_session');
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user session.');
        }
        return response.json(); // Parse the response to get the updated user data
      })
      .then((updatedUserData) => {
        setUser(updatedUserData); // Update the user context with the new data
      })
      .catch((error) => console.error("Error updating user:", error));
  };
  
  if (accessToken) {
    return <Navigate to="/home" replace={true} />;
  }

  const goals = [
    "View all of my finances in one place",
    "Track my income and spending",
    "Save for a large purchase",
    "Manage my money with a partner",
    "Create a personalized budget",
    "Save for a new home",
  ];

  const handleChange = (event, newGoals) => {
    setSelected(newGoals);
    console.log(newGoals);
  };

  return (
    <Container>
      <div className="onboarding-header-container">
        <header className="onboard-header">
          <img
            className="headline-icon"
            src={pigbank}
            alt="piggybank-icon"
          ></img>
          <div>
            <h1 className="headline-big">
              How would you like Money Magnet to help you?
            </h1>
            <h3 className="gray-subtext">
              Tell us about your financial goals and Money Magnet will help you
              achieve them.
            </h3>
          </div>
        </header>
      </div>
      <section className="goal-section">
        {goals.map((item) => {
          return (
            <ToggleButtonGroup value={selected} onChange={handleChange}>
              <ToggleButton
                value={item}
                color="primary"
                className="goal-buttons"
              >
                <span className="button-text">{item}</span>
              </ToggleButton>
            </ToggleButtonGroup>
          );
        })}
      </section>
      {selected.length > 0 && (
        <section className="goal-continue">
          <PlaidLinkButton onAccessToken={handleAccessToken} />
        </section>
      )}
    </Container>
  );
};

export default Onboarding;
