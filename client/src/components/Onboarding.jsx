import React from "react";
import { Container, ThemeProvider, createTheme } from "@mui/system";
import pigbank from "../assets/pigbank.svg";
import { Button } from "@mui/material";



const Onboarding = () => {

    const goals = [
        "View all of my finances in one place",
        "Track my income and spending",
        "Save for a large purchase",
        "Manage my money with a partner",
        "Create a personalized budget",
        "Save for a new home"
    ];







    return (

<Container>
<div className="onboarding-header-container">
    <header className="onboard-header">
        <img className="headline-icon" src={pigbank} alt="piggybank-icon"></img>
            <div>
                <h1 className="headline-big">
                How would you like Money Magnet to help you?
                </h1>
                <h3 className="gray-subtext">
                Tell us about your financial goals and Money Magnet will help you achieve them.
                </h3>
            </div>
    </header>
</div>
<section>
    {goals.map((item) => {
        return(
<Button color="primary" className="goal-buttons" variant="contained">
            {item}
            </Button>
            
        )
     
    })}
</section>


    </Container>


    )
}



export default Onboarding;