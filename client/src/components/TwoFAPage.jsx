// src/TwoFAPage.js
import React from 'react';
import { Link } from 'react-router-dom';

function TwoFAPage() {
  return (
    <div>
      <h1>2FA Authentication</h1>
      <Link to="/setup-2fa">Setup 2FA</Link> | <Link to="/verify-2fa">Verify 2FA</Link>
    </div>
  );
}

export default TwoFAPage;
