import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Button,
    Typography,
    Container,
    Grid,
    Divider,
    Avatar,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

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

    // state for spending amount
    const [spending, setSpending] = useState(2564);

    // state for whether spending is on track
    const [onTrack, setOnTrack] = useState("On track");

    // graph to display recent account balances
    const [graphData, setGraphData] = useState([]);

    // Fetch for goals to display
    const [goals, setGoals] = useState([]);
    // state to show only the top three goals
    const [topGoals, setTopGoals] = useState([]);

    const [insights, setInsights] = useState("Insight 1 and Insight 2");
    // Insights are each in their own boxes
    // Show the first two insights

    // state for savings
    const [saved, setSaved] = useState(126);

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
        <div className='home-margin'>
            <div className='home-container home-top'>
                <h1>Good {greeting}!</h1>
                <div>
                    <p style={{ display: "inline", margin: "0 5px 0 0" }}>
                        You have
                    </p>
                    <Typography
                        variant='h5'
                        sx={{
                            fontFamily: "TT Commons",
                            color: "Black",
                            fontWeight: "normal",
                            display: "inline",
                            margin: "0 5px",
                        }}
                    >
                        ${balance}
                    </Typography>
                    <p style={{ display: "inline", margin: "0 5px" }}>
                        left to spend this month
                    </p>
                </div>
            </div>
            <Container
                style={{
                    width: "382px",
                    height: "228px",
                    flexGrow: "0",
                    padding: "0 0 8px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    marginTop: "25px",
                    marginLeft: "0",
                }}
            >
                <div className='home-container home_graph'>
                    <div>
                        <p>Spending</p>
                    </div>
                    <Typography
                        variant='h5'
                        sx={{
                            fontFamily: "TT Commons",
                            color: "Black",
                            fontWeight: "normal",
                            margin: 0,
                        }}
                    >
                        ${spending}
                    </Typography>
                    <p className='green-text'>{onTrack} this month</p>
                    <Stack direction='row' sx={{ width: "100%" }}>
                        <Box width='100%'>
                            <SparkLineChart
                                data={[3, -10, -2, 5, 7, -2, 4, 6]}
                                height={77}
                                width={350}
                                area={false}
                            />
                        </Box>
                    </Stack>
                </div>
            </Container>
            <Container
                style={{
                    width: "382px",
                    height: "200px",
                    flexGrow: "0",
                    padding: "0 0 8px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    marginTop: "25px",
                    marginLeft: "0",
                }}
            >
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Stack direction='column' spacing={1}>
                            <Typography
                                sx={{
                                    padding: "10px 10px 5px 10px",
                                    margin: 0,
                                }}
                            >
                                <p>Goals</p>
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={6} textAlign='right'>
                        <Button
                            variant='contained'
                            sx={{
                                minWidth: "120px",
                                fontFamily: "TT Commons",
                                fontSize: "12px",
                                fontWeight: "normal",
                                lineHeight: "1.83",
                                letterSpacing: "normal",
                                textTransform: "none",
                                marginTop: "15px",
                                marginRight: "15px",
                                backgroundColor: "#3398ff",
                            }}
                        >
                            Create a Savings Goal
                        </Button>
                    </Grid>
                    <Grid item xs={6} sx={{ marginLeft: "15px" }}>
                        <Stack direction='row' spacing={1}>
                            <Typography
                                variant='h5'
                                sx={{
                                    fontFamily: "TT Commons",
                                    color: "Black",
                                    fontWeight: "normal",
                                }}
                            >
                                ${saved}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            marginLeft: "15px",
                            marginTop: "0px",
                            marginBottom: "15px",
                        }}
                    >
                        <Stack direction='row' spacing={1}>
                            <Typography>
                                <p style={{ margin: "0" }}>
                                    Total saved for goals
                                </p>
                            </Typography>
                        </Stack>
                    </Grid>
                    <Divider
                        sx={{
                            width: "346px",
                            height: "1px",
                            flexGrow: 0,
                            transform: "rotate(-360deg)",
                            backgroundColor: "var(--gray-3)",
                            margin: "auto",
                        }}
                    />
                    <Grid
                        item
                        xs={12}
                        sx={{
                            marginLeft: "15px",
                            marginTop: "16px",
                            marginBottom: "0px",
                        }}
                    >
                        <Stack direction='row' spacing={1} alignItems='center'>
                            <Avatar
                                sx={{
                                    width: "10px",
                                    height: "10px",
                                    flexGrow: 0,
                                    margin: "0 8px 0 0",
                                    padding: "12px",
                                    border: "2px solid",
                                    borderColor: "#DEE5EB",
                                    backgroundColor: "transparent",
                                }}
                            >
                                ➕
                            </Avatar>
                            <Typography>
                                <p
                                    style={{
                                        margin: "0",
                                    }}
                                >
                                    Create a savings goal
                                </p>
                            </Typography>
                            {/* Add more content here */}
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
// {topGoals.map((goal) => (
//   <div key={goal.id}>
//       <h2 style={{ display: "inline" }}>{goal.name}:</h2>
//       <p style={{ display: "inline" }}>
//           Saving Target: ${goal.saving_target}
//       </p>
//   </div>
// ))}

// {Array.isArray(insights) && insights.length > 0 && (
//   <div className='home-container'>
//       {insights.map((insight) => (
//           <div key={insight.id}>
//               <h1>{insight.content}</h1>
//           </div>
//       ))}
//   </div>
// )}
export default Home;
