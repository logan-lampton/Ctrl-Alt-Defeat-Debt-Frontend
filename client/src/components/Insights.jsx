import React, { useState, useContext, useEffect } from "react";
import {
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  LabelList,
} from "recharts";
import Transactions from "./Transactions";
import SpendingInsights from "./SpendingInsights";
import { UserContext } from "../context/UserContext";
import ArrowForward from "../assets/arrow_forward.svg";
import InfoIcon from "@mui/icons-material/Info"
import Sparkles from "../assets/sparkles.svg";
import "./styles/Goals.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Insights() {
  const { accessToken } = useContext(UserContext);
  const [showTransactions, setShowTransactions] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [predictions, setPredictions] = useState({});

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/plaid/get_transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ access_token: accessToken }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setTransactions(data.transactions || []);
      prepareChartData(data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const callAI = async () => {
    if (!accessToken) {
      return { error: "No access token found" };
    }
    try {
      const response = await fetch("/openai/response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: accessToken,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      // Add a delay before setting the state
      setTimeout(() => {
        setPredictions(data.predictions);
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const prepareChartData = (transactions) => {
    const categoryTotals = transactions.reduce((acc, transaction) => {
      const category = transaction.category[0];
      acc[category] = (acc[category] || 0) + transaction.amount;
      return acc;
    }, {});
    const data = Object.keys(categoryTotals).map((category) => ({
      name: category,
      value: categoryTotals[category],
    }));
    setChartData(data);
  };

  const calculateCashFlow = (transactions) => {
    let earned = 0;
    let spent = 0;
  
    transactions.forEach((transaction) => {
      if (
        !transaction.category.includes("Transfer") &&
        !transaction.category.includes("Credit Card Payment")
      ) {
        if (transaction.amount > 0) {
          earned += transaction.amount;
        } else {
          spent += Math.abs(transaction.amount); // Assuming spent amounts are negative, convert them to positive
        }
      } else if (
        transaction.category.includes("Credit Card Payment") &&
        transaction.amount < 0
      ) {
        // It seems like you're not doing anything in this condition. If you intend to handle credit card payments differently, you might need to add logic here.
      }
    });
  
    // Use toFixed to convert the numbers to strings with 2 decimal points, then convert back to numbers
    earned = +earned.toFixed(2);
    spent = +spent.toFixed(2);
  
    return { earned, spent };
  };
  
  // Assuming you have a transactions array to pass into this function
  const { earned, spent } = calculateCashFlow(transactions);
  
  const barChartData = [
    { name: "Earned", value: earned },
    { name: "Spent", value: spent },
  ];
  

  useEffect(() => {
    fetchTransactions();
    callAI();
  }, [accessToken]);

  if (isLoading) return <CircularProgress />;

  // Sort transactions by date descending to get the most recent ones
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <Container
      sx={{
        height: "932px",
        flexGrow: "0",
        padding: "16px",
        overflow: "auto",
        paddingBottom: 2,
      }}
    >
      {!showTransactions ? (
        <>
                <div className='home-container home-top'>
                <h1>Here's a snapshot of your </h1>
                <h1>finances this month</h1>
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
                        ${199}
                    </Typography>
                    <p style={{ display: "inline", margin: "0 5px" }}>
                        left to spend this month
                    </p>
                </div>
            </div>
          <ResponsiveContainer
            width="100%"
            height={300}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              paddingBottom: "70px",
            }}
          >
            <div
              onClick={() => setShowTransactions(true)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p style={{ marginRight: "10px" }}>Spending</p>
              <img
                src={ArrowForward}
                style={{ marginTop: "5px" }}
                alt="ArrowForward"
              />
            </div>

            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                onClick={() => setShowTransactions(true)}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <>
            <br />
            <ResponsiveContainer
              width="100%"
              height={200}
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                paddingBottom: "40px",
              }}
            >
              <p>March Cash Flow</p>
              <BarChart
                data={barChartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide={true} />
                <RechartsTooltip />
                <Bar dataKey="value" fill="#8884d8" barSize={130}>
                  <LabelList
                    dataKey="value"
                    position="top"
                    style={{ fill: "#555" }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </>
          <br />
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              paddingBottom: "70px",
            }}
          >
       
              <img
                src={Sparkles}
                alt="Sparkles"
                style={{
                  height: "15px",
                  marginLeft: "15px",
                  marginTop: "12px",
                }}
              />
              <p style={{ display: "inline" }}>
                AI-Generated Spending Forecasts
              </p>


            <SpendingInsights
              predictions={predictions}
            />
            </div>
            <br />
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <p>Recent Transactions</p>
              <List>
                {recentTransactions.map((transaction, index) => (
                  <ListItem key={index} divider>
                    <ListItemAvatar>
                      {transaction.logo_url ? (
                        <Avatar
                          alt="Merchant Logo"
                          src={transaction.logo_url}
                        />
                      ) : (
                        <Avatar>{transaction.name[0]}</Avatar>
                      )}
                    </ListItemAvatar>
                    <ListItemText
                primary={transaction.name}
                secondary={
                  <>
                    <Typography
                      style={{ fontWeight: "bold" }}
                      variant="body2"
                      color="text.primary"
                    >
                      ${transaction.amount.toFixed(2)}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {new Date(transaction.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                    <br />
                    Category: {transaction.category[0]}
                  </>
                }
              />
                  </ListItem>
                ))}
              </List>
            </div>
        </>
      ) : (
        <Transactions
          transactions={transactions}
          setShowTransactions={setShowTransactions}
        />
      )}
    </Container>
  );
}
