import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  CircularProgress,
  Paper,
  Divider
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const Transactions = ({ accessToken }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalSpent, setTotalSpent] = useState(0);

  // Dummy data for pie chart, you'd generate this from your transactions
  const data = [
    { name: 'Entertainment', value: 400 },
    { name: 'Food & Drink', value: 300 },
    { name: 'Utilities', value: 300 },
    { name: 'Rent', value: 650 },
    { name: 'Bills & Subscriptions', value: 200 },
    { name: 'Other', value: 240 }
  ];

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
        setTransactions(data.transactions);
        // Calculate the total spent here and update totalSpent state
      } else {
        setError('No transactions data found');
        setTransactions([]);
      }
    } catch (error) {
      setError('Failed to fetch transactions');
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{overflow: "auto"}}>
      <button onClick={fetchTransactions} disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : 'Load Transactions'}
      </button>
      {error && <Typography color="error">{error}</Typography>}
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h6">Your transaction history broken down</Typography>
        <Typography variant="subtitle1">You have spent ${totalSpent} this month.</Typography>
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
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <List>
          {transactions.map((transaction, index) => (
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
                        Date: {transaction.date} - Amount: ${transaction.amount}
                      </Typography>
                      <br />
                      Category: {transaction.category.join(', ')}
                      {transaction.location && (
                        ` - Location: ${transaction.location.city}, ${transaction.location.region}`
                      )}
                    </>
                  }
                />
              </ListItem>
              {index < transactions.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default Transactions;
