// PlaidLinkButton.js or your preferred file name
import React, { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import {Button} from '@mui/material'
import {Link} from 'react-router-dom'
import style from './styles/PlaidButton.css'

const PlaidLinkButton = ({ onAccessToken }) => {
  const [linkToken, setLinkToken] = useState('');

  useEffect(() => {
    // Fetch the link token from your server
    const getLinkToken = async () => {
      const response = await fetch('http://127.0.0.1:5000/plaid/create_link_token', { method: 'POST' });
      const data = await response.json();
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
        'Access-Control-Allow-Origin': '*',


        
      },
      body: JSON.stringify({ public_token }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if(data.access_token) {
        onAccessToken(data.access_token);
      }
    })
    .catch(error => console.error('Error:', error));
  }, [onAccessToken]);

  const config = {
    token: linkToken,
    onSuccess,
    // Add other configurations as needed
  };

  const { open, ready } = usePlaidLink(config);

  return (
    
    <button 
      class="plaidButton"
      onClick={open} disabled={!ready}>
        Next 
    </button>
  
  );
};

export default PlaidLinkButton;
