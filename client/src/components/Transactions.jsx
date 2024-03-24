import React, { useState, useContext, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  CircularProgress,
  Paper,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { UserContext } from "../context/UserContext";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const Transactions = ({ accessToken }) => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalSpent, setTotalSpent] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/plaid/get_transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: accessToken }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      if (data.transactions) {
        const transactionsWithCategories = data.transactions.map(t => ({
          ...t,
          category: t.category[0] // Assuming first category is the most relevant
        }));
        const uniqueCategories = ['All', ...new Set(transactionsWithCategories.map(t => t.category))];
        setCategories(uniqueCategories);
        setTransactions(transactionsWithCategories);
        setFilteredTransactions(transactionsWithCategories);
        calculateTotalAndChartData(transactionsWithCategories);
      } else {
        setError('No transactions data found');
        setTransactions([]);
        setFilteredTransactions([]);
      }
    } catch (error) {
      setError('Failed to fetch transactions');
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalAndChartData = (transactions) => {
    let total = 0;
    const categoryTotals = transactions.reduce((acc, transaction) => {
      const value = acc[transaction.category] || 0;
      acc[transaction.category] = value + transaction.amount;
      total += transaction.amount;
      return acc;
    }, {});
    
    const chartData = Object.keys(categoryTotals).map(category => ({
      name: category,
      value: categoryTotals[category]
    }));
    
    setTotalSpent(total);
    setData(chartData);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(transactions.filter(t => t.category === selectedCategory));
    }
  }, [selectedCategory, transactions]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Dummy data for pie chart, replace with dynamic data
  const [data, setData] = useState([]);

  return (
    <div style={{overflow: "auto"}}>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h6">Your transaction history broken down</Typography>
        <Typography variant="subtitle1">You have spent ${totalSpent.toFixed(2)} this month.</Typography>
        
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Category</InputLabel>
          <Select value={selectedCategory} label="Category" onChange={handleCategoryChange}>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <List style={{ maxHeight: '400px', overflow: 'auto' }}>
  {filteredTransactions.map((transaction, index) => (
    <React.Fragment key={index}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          {transaction.logo_url ? (
            <Avatar alt="Merchant Logo" src={transaction.logo_url} />
          ) : (
            <Avatar>{transaction.name[0]}</Avatar>
          )}
        </ListItemAvatar>
        <ListItemText
          primary={transaction.name}
          secondary={
            <>
              <Typography component="span" variant="body2" color="text.primary">
                Date: {transaction.date} - Amount: ${transaction.amount.toFixed(2)}
              </Typography>
              <br />
              Category: {transaction.category}
            </>
          }
        />
      </ListItem>
      {index < filteredTransactions.length - 1 && <Divider variant="inset" component="li" />}
    </React.Fragment>
  ))}
</List>
      </Paper>
    </div>
  );
};

export default Transactions;

       
