// src/Verify2FA.js
import React, { useState } from 'react';
import axios from 'axios';

function Verify2FA() {
  const [userId, setUserId] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationResult, setVerificationResult] = useState('');

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/2fa/verify-otp', {
        user_id: userId,
        otp: otp,
      });
      setVerificationResult(response.data.success);
    } catch (error) {
      setVerificationResult(error.response.data.error || 'Error verifying OTP');
    }
  };

  return (
    <div>
      <h1>Verify 2FA</h1>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
      {verificationResult && <p>{verificationResult}</p>}
    </div>
  );
}

export default Verify2FA;
