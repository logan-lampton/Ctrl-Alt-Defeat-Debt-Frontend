import {Button} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";


export default function AICall() {
    // pull up that access token from context
    const { accessToken } = useContext(UserContext)

    const [insights, setInsights] = useState({})
    const [predictions, setPredictions] = useState({})

    //api call to openai
    const callAI = async () => {
        if (!accessToken) {
            return {error: "No access token found"};
        }
        try {
            const response = await axios.post("/openai/response", {
                access_token: accessToken,
            });
            console.log("AI Stuff", response.data);
            setInsights(response.data.goals);
            setPredictions(response.data.predictions);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    console.log(predictions)
    console.log(insights)

    return(
        <>
            <Button variant="contained" size="large" onClick={callAI}>
                AI Call
            </Button>
        </>
    )
}