import React, { useState } from 'react';
import PlaidLinkButton from "./PlaidLinkButton";
import Transactions from "./Transactions";
import Accounts from './Accounts'; 


function PlaidButtonsContainer(params) {
  const [accessToken, setAccessToken] = useState('');

  const handleAccessToken = (token) => {
    setAccessToken(token);
  };
  return (
      <div>
        <PlaidLinkButton onAccessToken={handleAccessToken} />
        {accessToken && 
        <>
        <Transactions accessToken={accessToken} />
        <Accounts accessToken={accessToken} />
        </>
        }
      </div>
  )
}

export default PlaidButtonsContainer