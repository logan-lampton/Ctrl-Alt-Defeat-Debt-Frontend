import React, { useState, useEffect } from 'react';
import { Container, Button, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/system';
import styled from '@emotion/styled';

const OTPConfirm = () => {
  const [otp, setOtp] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  

  const sendOtp = () => {
    fetch('http://localhost:5555/2fa/enable-2fa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('OTP send response:', data);
      if (data.message) {
        setOtpSent(true); // Enable the OTP input field
      }
    })
    .catch(error => {
      console.error('Error sending OTP:', error);
    });
  };

  const handleOTPChange = (event) => {
    setOtp(event.target.value);
  };

  const handleAgreeChange = (event) => {
    setAgreed(event.target.checked);
  };

  const handleSubmit = () => {
    if (!agreed) {
      alert('Please agree to the Terms of Use.');
      return;
    }

    fetch('http://localhost:5555/2fa/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ otp })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Verification response:', data);
      if (data.message === 'OTP verified successfully for +12124959732') {
        setIsVerified(true);
        alert('OTP verified successfully!');
      } else {
        alert('Invalid OTP or verification failed.');
      }
    })
    .catch(error => {
      alert('Invalid OTP or verification failed.');
      console.error('Error verifying OTP:', error);
    });
  };

  return (
      <Container>
        <StyledOTPContainer>
       
          <h2>Confirm your number</h2>
          <StyledButton
            variant="contained"
            onClick={sendOtp}
            disabled={otpSent === true}
          >       Send Code
          </StyledButton>
          <p>Please submit the 6 digit confirmation code sent to 202-555-5555</p>
          <TextField
            fullWidth
            label="Six Digit Code"
            value={otp}
            onChange={handleOTPChange}
            inputProps={{ maxLength: 6 }}
            margin="normal"
            disabled={!otpSent}
          />
          <FormControlLabel
            control={
              <Checkbox checked={agreed} onChange={handleAgreeChange} name="agree" />
            }
            label="I agree to Money Magnet’s Terms of Use including the E-Sign Consent, ACH Authorization and Privacy Policy."
          />
          <StyledButton
            variant="contained"
            onClick={handleSubmit}
            disabled={otp.length !== 6 || !agreed || isVerified}
          >
            Next
          </StyledButton>
        </StyledOTPContainer>
      </Container>
  );
};

// Styled components
const StyledOTPContainer = styled.div`
  text-align: center;
  margin-top: 20px;

  & h2 {
    color: #000;
    font-size: 1.5rem;
    margin-bottom: 8px;
  }

  & p {
    color: #666;
    margin-bottom: 16px;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
  background-color: #007bff;

  &:disabled {
    background-color: #aaa;
  }
`;

export default OTPConfirm;
