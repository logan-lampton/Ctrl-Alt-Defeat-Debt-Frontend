import React, { useState } from 'react';

const Transactions = ({ accessToken }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
    <div>
      <button onClick={fetchTransactions} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Load Transactions'}
      </button>
      {error && <p>Error: {error}</p>}
      <div>
        {transactions.map((transaction, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            {transaction.logo_url && (
              <img
                src={transaction.logo_url}
                alt="Merchant Logo"
                style={{ marginRight: '10px', width: '50px', height: '50px' }}
              />
            )}
            <div>
              <div><strong>{transaction.name}</strong></div>
              <div>Date: {transaction.date}</div>
              <div>Amount: ${transaction.amount}</div>
              <div>Category: {transaction.category.join(', ')}</div>
              {transaction.location && (
                <div>Location: {transaction.location.city}, {transaction.location.region}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
