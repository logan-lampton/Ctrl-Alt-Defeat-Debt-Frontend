import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Paper,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button
} from '@mui/material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Re-use COLORS for consistency

const Transactions = ({ transactions, setShowTransactions }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const uniqueCategories = ['All', ...new Set(transactions.map(t => t.category[0]))];
    const filteredTransactions = selectedCategory === 'All' ? transactions : transactions.filter(t => t.category[0] === selectedCategory);

    return (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Button onClick={() => setShowTransactions(false)}>Back to Insights</Button>
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                    value={selectedCategory}
                    label="Category"
                    onChange={e => setSelectedCategory(e.target.value)}
                >
                    {uniqueCategories.map((category, index) => (
                        <MenuItem key={index} value={category}>{category}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <List style={{ maxHeight: '600px', overflow: 'auto' }}>
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
                                      Category: {transaction.category[0]}
                                  </>
                              }
                          />
                      </ListItem>
                      {index < filteredTransactions.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
              ))}
          </List>
      </Paper>
  );
};

export default Transactions;
