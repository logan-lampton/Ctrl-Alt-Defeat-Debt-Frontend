import React, { useState, useContext, useEffect } from "react";
import {
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
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
import InfoIcon from '@mui/icons-material/Info';
import Sparkles from '../assets/sparkles.svg';
import "./styles/Goals.css";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Insights() {
  const { accessToken } = useContext(UserContext)
  const [showTransactions, setShowTransactions] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [predictions, setPredictions] = useState({})


  const totalEarned = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
  const totalSpent = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);
  // const barChartData = [
  //     { name: 'Earned', value: totalEarned },
  //     { name: 'Spent', value: Math.abs(totalSpent) } // Assuming spent amounts are negative
  // ];

  const spendingCategories = [
    { id: 1, name: 'Groceries', emoji: '🍏', amount: 300 },
    { id: 2, name: 'Transport', emoji: '🚗', amount: 150 },
    { id: 3, name: 'Entertainment', emoji: '🎬', amount: 200 },
    // ...other categories
  ];

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
      return {error: "No access token found"};
    }
    try {
      const response = await fetch("/openai/response", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
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
      // console.log(
      //   `Processing transaction: ${transaction.name}, Amount: ${transaction.amount}, Category: ${transaction.category}`
      // );

      // Assuming 'Transfer' and 'Credit Card Payment' are specific categories that can be used to filter out non-spending transactions
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
        // If the transaction is a 'Credit Card Payment' and the amount is negative,
        // it could mean a payment was made (which should not count as earning or spending)
        // so we ignore it or handle it accordingly.
        console.log("Ignoring credit card payment or similar transaction.");
      }
    });

    return { earned, spent };
  };

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
          <Typography variant="h6" style={{ marginTop: "20px" }}>
            Spending Breakdown
          </Typography>
          <ResponsiveContainer
            width="100%"
            height={300}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              paddingBottom: "20px",
            }}
          >
            <div
              className="goal-arrow-container"
              onClick={() => setShowTransactions(true)}
            >
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
            <Typography variant="h6" style={{ marginTop: "20px" }}>
              March Cash Flow
            </Typography>
            <ResponsiveContainer
              width="100%"
              height={250}
              style={{ border: "1px solid #ccc", borderRadius: "5px" }}
            >
              <BarChart
                data={barChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
          <Typography variant="h6" gutterBottom component="div" style={{ marginTop: "20px"}}>
        <img src={Sparkles} alt="Sparkles" style={{ verticalAlign: 'middle', marginRight: '8px' }}/>
        AI-Generated Spending Forecasts
        <Tooltip title="These numbers are AI-generated forecasts and are indicative. Actual figures may vary.">
          <InfoIcon fontSize="small" style={{ verticalAlign: 'middle', marginLeft: '8px' }} />
        </Tooltip>
      </Typography>
          <SpendingInsights spendingCategories={spendingCategories} predictions={predictions}/>
          <Typography variant="h6" style={{ marginTop: "20px" }}>
            Recent Transactions
          </Typography>
          <List>
            {recentTransactions.map((transaction, index) => (
              <ListItem key={index} divider>
                <ListItemAvatar>
                  {transaction.logo_url ? (
                    <Avatar alt="Merchant Logo" src={transaction.logo_url} />
                  ) : (
                    <Avatar>{transaction.name[0]}</Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={transaction.name}
                  secondary={`Date: ${
                    transaction.date
                  } - Amount: $${transaction.amount.toFixed(2)}`}
                />
              </ListItem>
            ))}
          </List>
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
