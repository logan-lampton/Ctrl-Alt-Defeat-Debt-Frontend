import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
// import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';

// Use Sparkline

// Make a box and add theses inside:
// Button to add goals
// Add navigate to goals page
// If there are no goals, conditionally show, "Create a savings goal"

// CSS

function Home() {
    // Display Morning, Afternoon, Evening depending on the time of day on the system
    const [greeting, setGreeting] = useState("");

    // Display balance for the user from the backend
    const [balance, setBalance] = useState(1386);

    // graph to display recent account balances
    // uses recharts working alongside Materia UI
    // npm install recharts
    const [graphData, setGraphData] = useState([
        { name: "Oct", uv: 1890, pv: 4800, amt: 2181 },
        { name: "Nov", uv: 4000, pv: 2400, amt: 2400 },
        { name: "Dec", uv: 3000, pv: 1398, amt: 2210 },
        { name: "Jan", uv: 2000, pv: 5800, amt: 2290 },
        { name: "Feb", uv: 2780, pv: 3908, amt: 2000 },
    ]);

    // Fetch for goals to display
    const [goals, setGoals] = useState([]);
    // state to show only the top three goals
    const [topGoals, setTopGoals] = useState([]);

    const [insights, setInsights] = useState("Insight 1 and Insight 2");
    // Insights are each in their own boxes
    // Show the first two insights

    useEffect(() => {
        // Function to update the greeting based on the time of day based on the user's current time
        updateGreeting();
        // Fetching the user balance; will uncomment when route is properly set up
        // fetchBalance();
        // Fetching user goals
        fetchGoals();
        // Fetching the user insights; will uncomment when route is properly set up
        // fetchInsights();
    }, []);

    useEffect(() => {
        // Run function to decide on the three largest goals, which will be displayed
        largestGoals(goals);
    }, [goals]);

    const updateGreeting = () => {
        const currentHour = new Date().getHours();
        let timedGreeting = "";
        if (currentHour >= 5 && currentHour < 12) {
            timedGreeting = "Morning";
        } else if (currentHour >= 12 && currentHour < 18) {
            timedGreeting = "Afternoon";
        } else {
            timedGreeting = "Evening";
        }
        setGreeting(timedGreeting);
    };

    // function to fetch balance, need the correct route
    const fetchBalance = async () => {
        try {
            const response = await axios.get("SET THE CORRECT ROUTE");
            // make sure to update to correct property
            setBalance(response.data.balance);
        } catch (error) {
            console.error("Error fetching balance: ", error);
        }
        console.log("Balance: ", balance);
    };

    // function to fetch goals
    const fetchGoals = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/goals");
            setGoals(response.data);
        } catch (error) {
            console.error("Error fetching goals: ", error);
        }
        console.log("Goals: ", goals);
    };

    // Function to display the three biggest goals
    const largestGoals = async (goals) => {
        const sortedGoals = goals
            .slice()
            .sort((a, b) => b.saving_target - a.saving_target);
        const threeLargestGoals = sortedGoals.slice(0, 3);
        setTopGoals(threeLargestGoals);
    };

    // function to fetch insights, need the correct route
    const fetchInsights = async () => {
        try {
            const response = await axios.get("SET THE CORRECT ROUTE");
            // make sure to update to correct property
            setInsights(response.data.insights);
        } catch (error) {
            console.error("Error fetching insights: ", error);
        }
        console.log("Insights ", insights);
    };

    return (
        <div>
            <h1>Good {greeting}!</h1>
            <div style={{ fontSize: "16px" }}>
                <p style={{ display: "inline", margin: "0 5px" }}>You have</p>
                <h2 style={{ display: "inline", margin: "0 5px" }}>
                    ${balance}
                </h2>
                <p style={{ display: "inline", margin: "0 5px" }}>
                    left to spend this month
                </p>
            </div>
            <div className='chart-container'>
                <ResponsiveContainer width='100%' height={400}>
                    <LineChart data={graphData}>
                        <XAxis dataKey='name' />
                        <YAxis />
                        <CartesianGrid stroke='#eee' strokeDasharray='5 5' />
                        <Tooltip />
                        <Legend />
                        <Line type='monotone' dataKey='pv' stroke='#8884d8' />
                        <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className='container'>
                <div className='button-container'>
                    <Button variant='contained' color='primary'>
                        Create a savings goal
                    </Button>
                </div>
                {topGoals.map((goal) => (
                    <div key={goal.id}>
                        <h2 style={{ display: "inline" }}>{goal.name}:</h2>
                        <p style={{ display: "inline" }}>
                            Saving Target: ${goal.saving_target}
                        </p>
                    </div>
                ))}
            </div>
            {Array.isArray(insights) && insights.length > 0 && (
                <div>
                    {insights.map((insight) => (
                        <div key={insight.id}>
                            <h1>{insight.content}</h1>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
