import React, { useState, useEffect } from 'react';

const Accounts = ({ accessToken }) => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      if (!accessToken) return;
      
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch('http://127.0.0.1:5000/plaid/get_accounts', {
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
        setAccounts(data.accounts);
      } catch (error) {
        setError('Failed to fetch accounts');
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, [accessToken]);

  if (isLoading) return <div>Loading accounts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Accounts</h2>
      <ul>
        {accounts.map((account, index) => (
          <li key={index}>
            <strong>{account.name}</strong> - Balance: ${account.balances.available || account.balances.current}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Accounts;
