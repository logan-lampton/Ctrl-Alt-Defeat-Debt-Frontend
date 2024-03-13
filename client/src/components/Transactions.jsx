import React, { useState } from 'react';

const Transactions = ({ accessToken }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:5000/plaid/get_transactions', {
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
      } else {
        // Assuming the response structure might be different or transactions are not available
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
    <div>
      <button onClick={fetchTransactions} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Load Transactions'}
      </button>
      {error && <p>Error: {error}</p>}
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>{transaction.name}: ${transaction.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;