import {Button} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";


export default function AICall({selectedGoal}) {
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
            <button variant="contained" size="small" onClick={callAI} 
            style={{
                borderStyle:"none", 
                marginLeft:"12px",
                display: "inline", 
                border: "solid 1px var(--gray-3)",
                backgroundColor: "#3398ff",
                borderRadius:"3px",
                color:"white"
            }}>
                AI Call
            </button>
        </>
    )
}