import React, { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';

const PlaidLinkButton = () => {
  const [linkToken, setLinkToken] = useState('');

  useEffect(() => {
    // Fetch the link token from your server
    const getLinkToken = async () => {
      const response = await fetch('http://127.0.0.1:5000/plaid/create_link_token', { method: 'POST' });
      const data = await response.json();
      console.log(data);
      setLinkToken(data.link_token);
    };
    getLinkToken();
  }, []);

  const onSuccess = React.useCallback((public_token, metadata) => {
    // Send the public_token to your app server
    // The app server can exchange the public_token for an access_token
    fetch('http://127.0.0.1:5000/plaid/exchange_public_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_token }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }, []);

  const config = {
    token: linkToken,
    onSuccess,
    // Add other configurations as needed
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );
};

export default PlaidLinkButton;
