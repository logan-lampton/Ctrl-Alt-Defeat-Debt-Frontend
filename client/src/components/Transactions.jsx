import React, { useState } from "react";
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
  Button,
} from "@mui/material";


const Transactions = ({ transactions, setShowTransactions }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const uniqueCategories = [
    "All",
    ...new Set(transactions.map((t) => t.category[0])),
  ];
  const filteredTransactions =
    selectedCategory === "All"
      ? transactions
      : transactions.filter((t) => t.category[0] === selectedCategory);

  return (
    <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
      <Button onClick={() => setShowTransactions(false)}>
        Back to Insights
      </Button>
      <div className="home-container home-top">
        <h1>Your transaction history </h1>
        <h1>broken down</h1>
        <div>
          <p style={{ display: "inline", margin: "0 5px 0 0" }}>
            You have spent
          </p>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "TT Commons",
              color: "Black",
              fontWeight: "normal",
              display: "inline",
              margin: "0 5px",
            }}
          >
            ${2105}
          </Typography>
          <p style={{ display: "inline", margin: "0 5px" }}>this month</p>
        </div>
      </div>
      <br />
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          label="Category"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {uniqueCategories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <List style={{ maxHeight: "450px", overflow: "auto" }}>
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
            {index < filteredTransactions.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default Transactions;
