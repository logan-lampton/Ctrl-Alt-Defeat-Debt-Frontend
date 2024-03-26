import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import "./styles/Goals.css";


export default function SpendingInsights({ predictions }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This will check if predictions is not null and projections has keys
    if (predictions && Object.keys(predictions.projections || {}).length > 0) {
      setIsLoading(false);
    }
  }, [predictions]);

  const getEmojiForCategory = (category) => {
    const categoryEmojis = {
      "Food and Drink": "🍽️",
      "Payment": "💳",
      "Shops": "🛍️",
      "Transfer": "💱",
      "Travel": "✈️",
    };
    return categoryEmojis[category] || "📊"; // Default emoji for unspecified categories
  };

  const totalForecast = predictions?.projections
    ? Object.values(predictions.projections).reduce((sum, amount) => sum + amount, 0)
    : 0;

  // Show loading spinner if isLoading is true
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>

      <TableContainer component={Paper}>
        <Table aria-label="spending insights table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell align="right"><strong>Forecasted Amount</strong></TableCell>
              <TableCell align="right"><strong>Percentage</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {predictions.projections && Object.entries(predictions.projections).map(([category, amount]) => (
              <TableRow key={category}>
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                <div className="emoji-container no-underline">
                  {getEmojiForCategory(category)}
                </div>
                 {category}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: '1rem' }}>
                  ${amount.toFixed(2)}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: '1rem' }}>
                  {((amount / totalForecast) * 100).toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell><strong>Total Forecasted Spending</strong></TableCell>
              <TableCell align="right" sx={{ fontSize: '1rem' }}><strong>${totalForecast.toFixed(2)}</strong></TableCell>
              <TableCell align="right" sx={{ fontSize: '1rem' }}><strong>100%</strong></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
