import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import arrow_forward from "../assets/arrow_forward.svg";
import add_circle_outline from "../assets/add_circle_outline.svg";

function Home() {
    const { user, setUser, personalGoals, setPersonalGoals, accessToken } =
        useContext(UserContext);

    const navigate = useNavigate();

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
    const [onTrack, setOnTrack] = useState("");

    // const [aIData, setAIData] = useState({})

    const handleNavigateToGoalsClick = () => {
        navigate("/goal-selection"); // Navigates to /goal-form route when clicked
    };

    // -------------------------------------------

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
        // Checking if user is over budget
        checkOnTrack();
        // fetchAIData();

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

    //   const fetchAIData = async () => {
    //     try {
    //         const response = await axios.post("/openai/response", {
    //             access_token: accessToken,
    //         });
    //         console.log("AI Data", response.data);
    //         setAIData(response.data);
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // };

    // Logic for storing total earned and spent
    let totalEarned = 0;
    let totalSpent = 0;
    let remainingMoney = 0;
    let savingsAvailableBalance = 0;

    transactions.forEach((transaction) => {
        if (
            transaction.category.includes("Debit") ||
            transaction.category.includes("Payment")
        ) {
            totalEarned += transaction.amount;
        } else {
            totalSpent += Math.abs(transaction.amount);
        }
    });
    // savings accounts
    const savingsAccount = accounts.find(
        (account) => account.subtype === "savings"
    );
    if (savingsAccount) {
        savingsAvailableBalance = savingsAccount.balances.available;
        console.log("savings account", savingsAvailableBalance);
    }
    totalEarned = Math.round(totalEarned);
    totalSpent = Math.round(totalSpent);
    remainingMoney = totalEarned - totalSpent + savingsAvailableBalance;

    // onTrack logic
    const checkOnTrack = () => {
        if (remainingMoney < 0) {
            setOnTrack("Over budget");
        } else {
            setOnTrack("On track");
        }
    };

    // Constructing the data array for the SparkLineChart
    const sparkLineData = [];
    let currentAmount = 0;

    transactions.forEach((transaction) => {
        if (transaction.category.includes("Debit")) {
            currentAmount -= Math.abs(transaction.amount);
        } else {
            currentAmount += Math.abs(transaction.amount);
        }
        sparkLineData.push(currentAmount * 30);
    });

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
            console.error(
                "Error converting Unicode to emoji:",
                unicodeStr,
                error
            );
            return "🚫"; // Optionally return a placeholder or empty string
        }
    };

    // -------------------------------------------

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
                        ${remainingMoney}
                    </Typography>
                    <p style={{ display: "inline", margin: "0 5px" }}>
                        left to spend this month
                    </p>
                </div>
            </div>
            <Container
                style={{
                    width: "382px",
                    height: "auto",
                    flexGrow: "0",
                    padding: "0 0 8px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    marginTop: "25px",
                    marginLeft: "0",
                    position: "relative",
                }}
            >
                <div className='home-container home_graph'>
                    <div>
                        <p>Spending</p>
                    </div>
                    <img
                        src={arrow_forward}
                        alt='Arrow forward'
                        style={{
                            position: "absolute",
                            top: 23,
                            right: 8,
                            zIndex: 1,
                        }}
                    />
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
                    <p
                        className={
                            onTrack === "Over budget"
                                ? "red-text"
                                : "green-text"
                        }
                    >
                        {onTrack} this month
                    </p>
                    <Stack direction='row' sx={{ width: "100%" }}>
                        <Box width='100%'>
                            <SparkLineChart
                                data={sparkLineData}
                                height={150}
                                width={350}
                                area={false}
                                strokeWidth={2}
                                minY={Math.min(...sparkLineData) * 0.8}
                                maxY={Math.max(...sparkLineData) * 1.2}
                            />
                        </Box>
                    </Stack>
                </div>
            </Container>
            <Container
                style={{
                    width: "382px",
                    height: "auto",
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
                            onClick={() => handleNavigateToGoalsClick()}
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
                            marginBottom: "5px",
                        }}
                    >
                        <Stack direction='column' spacing={1} alignItems='left'>
                            {user ? (
                                user.personal_goals.slice(0, 5).map((goal) => (
                                    <Link
                                        to={`/goals-progress/personal/${goal.id}`}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            textDecoration: "none",
                                        }}
                                    >
                                        <Stack
                                            direction='row'
                                            spacing={1}
                                            alignItems='left'
                                            key={goal.id}
                                        >
                                            <Avatar
                                                sx={{
                                                    width: "30px",
                                                    height: "30px",
                                                    border: "2px solid #ccc",
                                                    borderRadius: "50%",
                                                    backgroundColor:
                                                        "transparent",
                                                    backgroundClip:
                                                        "padding-box",
                                                }}
                                            >
                                                {unicodeToEmoji(goal.emoji)}
                                            </Avatar>
                                            <Typography
                                                sx={{
                                                    color: "black",
                                                    alignItems: "center",
                                                    fontFamily: "TT Commons",
                                                    fontSize: "14px",
                                                    lineHeight: "30px",
                                                }}
                                            >
                                                {goal.name}
                                            </Typography>
                                        </Stack>
                                        <img
                                            src={arrow_forward}
                                            alt='Arrow forward'
                                            style={{
                                                marginRight: "8px",
                                                cursor: "pointer",
                                            }}
                                        />
                                    </Link>
                                ))
                            ) : (
                                <Stack
                                    onClick={() => handleNavigateToGoalsClick()}
                                    direction='row'
                                    spacing={1}
                                    alignItems='center'
                                >
                                    <img
                                        src={add_circle_outline}
                                        alt='Add goal'
                                        style={{
                                            cursor: "pointer",
                                            width: "24px",
                                            height: "24px",
                                        }}
                                    />
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
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
            <Container
                style={{
                    width: "382px",
                    height: "auto",
                    flexGrow: "0",
                    padding: "0 0 8px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    marginTop: "25px",
                    marginLeft: "0",
                    position: "relative",
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
                        <img
                            src={arrow_forward}
                            alt='Arrow forward'
                            style={{
                                position: "absolute",
                                top: 23,
                                right: 8,
                                zIndex: 1,
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            marginLeft: "15px",
                            marginTop: "0px",
                        }}
                    >
                        <Stack direction='row' spacing={1}>
                            <Typography>
                                <p style={{ margin: "5px" }}>
                                    Insights will begin populating soon.
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
