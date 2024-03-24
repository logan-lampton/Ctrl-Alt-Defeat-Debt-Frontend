import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
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
import arrow_forward from "../assets/account.svg";

function Home() {
    const { user, setUser, personalGoals, setPersonalGoals, accessToken } =
        useContext(UserContext);

    // Display Morning, Afternoon, Evening depending on the time of day on the system
    const [greeting, setGreeting] = useState("");

    // Accounts, fetched from Plaid, used to find savings account and set as remaining left to spend for the month
    const [accounts, setAccounts] = useState([]);
    const savingsAccounts = accounts.filter(
        (account) => account.subtype === "savings"
    );

    // Transactions from Plaid, used to calculate how much was spent during the past month
    const [transactions, setTransactions] = useState([]);

    // state for whether spending is on track
    const [onTrack, setOnTrack] = useState("On track");

    // graph to display recent account balances
    const [graphData, setGraphData] = useState([]);

    // state to show only the top three goals
    const [topGoals, setTopGoals] = useState([]);

    const [insights, setInsights] = useState("Insight 1 and Insight 2");
    // Insights are each in their own boxes
    // Show the first two insights

    useEffect(() => {
        // Greeting based on the time of day based on the user's current time
        updateGreeting();
        // Fetching the Plaid account data
        fetchAccounts();
        // Fetching Plaid transaction data
        fetchTransactions();

        // Fetching the user insights; will uncomment when route is properly set up
        // fetchInsights();
    }, [accessToken]);

    const fetchAccounts = async () => {
        if (!accessToken) {
            return;
        }
        try {
            const response = await axios.post("/plaid/get_accounts", {
                access_token: accessToken,
            });
            console.log("Data", response.data);
            setAccounts(response.data.accounts);
        } catch (error) {
            console.error("Error:", error);
        }
    };

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

    const fetchTransactions = async () => {
        try {
            const response = await fetch("/plaid/get_transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ access_token: accessToken }),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            if (data.transactions) {
                setTransactions(data.transactions);
            } else {
                setTransactions([]);
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    console.log(transactions);

    // Logic for storing total earned and spent
    let totalEarned = 0;
    let totalSpent = 0;
    let remainingMoney = 0;

    transactions.forEach((transaction) => {
      if (transaction.category.includes('Debit')) {
        totalEarned += transaction.amount;
      }
      else {
        totalSpent += Math.abs(transaction.amount);
      }
    })
    totalEarned = Math.round(totalEarned);
    totalSpent = Math.round(totalSpent);
    remainingMoney = totalEarned - totalSpent;




    // function to fetch goals
    // const fetchGoals = async () => {
    //     try {
    //         const response = await axios.get("http://127.0.0.1:5000/goals");
    //         setGoals(response.data);
    //     } catch (error) {
    //         console.error("Error fetching goals: ", error);
    //     }
    //     console.log("Goals: ", goals);
    // };

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
        <div className='home-margin' style={{ overflowY: "auto" }}>
            <div className='home-container home-top'>
                <h1>Good {greeting}!</h1>
                <div>
                    <p style={{ display: "inline", margin: "0 5px 0 0" }}>
                        You have
                    </p>
                    {/* {savingsAccounts.map((account) => ( */}
                        <Typography
                            // key={account.account_id}
                            variant='h5'
                            sx={{
                                fontFamily: "TT Commons",
                                color: "Black",
                                fontWeight: "normal",
                                display: "inline",
                                margin: "0 5px",
                            }}
                        >
                          ${remainingMoney}
                            {/* ${account.balances.available} */}
                        </Typography>
                    {/* ))} */}
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
                        ${totalSpent}
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
                                ${remainingMoney}
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
                                    width: "5px",
                                    height: "5px",
                                    flexGrow: 0,
                                    margin: "0 8px 0 0",
                                    padding: "8px",
                                    border: "2px solid",
                                    borderColor: "#DEE5EB",
                                    backgroundColor: "transparent",
                                }}
                            >
                                <p
                                    style={{
                                        color: "#DEE5EB",
                                        fontSize: "30px",
                                        margin: "0",
                                        marginTop: "-3px",
                                    }}
                                >
                                    +
                                </p>
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
                        </Stack>
                    </Grid>
                </Grid>
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
                                <p>Financial Insights</p>
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={6} textAlign='right'>
                        {/* Insert arrow */}
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
                                ${remainingMoney}
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
