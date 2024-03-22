import React, { useState } from "react";
import { Grid, Typography, TextField, Checkbox, Button } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ArrowBack from "../assets/arrow_back.svg";
import PlaidLinkButton from "./PlaidLinkButton";
import "./styles/UserConfirm.css";
import { useForm } from "react-hook-form";

export default function UserConfirm() {
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm();

  const label = { inputProps: { "aria-label": "Checkbox" } };

//   const handleAccessToken = (token) => {
//     setAccessToken(token);
//   };

  const handleOTPChange = (event) => {
    setOtp(event.target.value);
  };

  const handleAgreeChange = (event) => {
    setAgreed(event.target.checked);
  };

  const sendOtp = () => {
    fetch("/2fa/enable-2fa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("OTP send response:", data);
        if (data.message) {
          setOtpSent(true); // Enable the OTP input field
        }
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
      });
  };

  const handleSubmit = () => {
    if (!agreed) {
      alert("Please agree to the Terms of Use.");
      return;
    }

    fetch("/2fa/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Verification response:", data);
        if (data.response === "OTP verified successfully") {
          setIsVerified(true);
          alert("OTP verified successfully!");
        } else {
          alert("Invalid OTP or verification failed.");
        }
      })
      .catch((error) => {
        alert("Invalid OTP or verification failed.");
        console.error("Error verifying OTP:", error);
      });
  };

  if (isVerified) {
    return <Navigate to="/plaid" replace={true} />;
  }

  return (
    <Grid
      container
      spacing={-5}
      alignItems="center"
      justifyContent="center"
      sx={{ width: "425px" }}
      columnSpacing={{ xs: 1 }}
    >
      <Grid item xs={11}>
        <img
          style={{ marginLeft: "3px" }}
          src={ArrowBack}
          alt="ArrowBack"
          onClick={() => navigate(-1)}
        />
      </Grid>

      <Grid item xs={12}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "32px",
            fontFamily: "TT Commons Bold",
            color: "black",
            marginTop: "10px",
          }}
        >
          Confirm your number
        </h1>
      </Grid>

      <Grid item xs={12}>
      <section className="goal-continue">
        <Button
          variant="contained"
          onClick={sendOtp}
          disabled={otpSent === true}
        >
          <span>Send Code</span>
        </Button>
        </section>
        <p
          style={{
            textAlign: "center",
            marginTop: "-5px",
            marginBottom: "50px",
            width: "88%",
            fontFamily: "TT Commons Regular",
            fontSize: "16px",
            color: "#718291",
            lineHeight: "22px",
          }}
        >
          Please submit the 6 digit confirmation code sent to 202-555-5555
        </p>
      </Grid>

      <Grid item xs={12}>
        <TextField
          className="confirmationCode"
          onChange={handleOTPChange}
          inputProps={{
            min: 0,
            maxLength: 6,
            style: {
              marginRight: "20px",
              textAlign: "center",
              fontFamily: "TT Commons Medium",
              fontSize: "24px",
              marginBottom: "20px",
            },
          }}
          fullWidth
          variant="standard"
          style={{
            marginBottom: "10px",
            marginLeft: "5%",
            width: "90%",
            color: "#DEE5EB",
          }}
          placeholder="Six Digit Code"
        />
      </Grid>

      <Grid item xs={1}>
        <Checkbox
          {...label}
          checked={agreed} onChange={handleAgreeChange} name="agree"
          style={{ marginBottom: "15px", marginLeft: "15px" }}

        />
      </Grid>

      <Grid item xs={11}>
        <p
          style={{
            textAlign: "left",
            marginRight: "24px",
            color: "#718291",
            fontFamily: "TT Commons Regular",
            fontSize: "14.5px",
            lineHeight: "18px",
          }}
        >
          I agree to Money Magnet's{" "}
          <a className="terms-links" href="#">
            Terms of Use
          </a>{" "}
          including the{" "}
          <a className="terms-links" href="#">
            E-Sign Consent
          </a>
          ,{" "}
          <a className="terms-links" href="#">
            ACH Authorization
          </a>{" "}
          and{" "}
          <a className="terms-links" href="#">
            Privacy Policy.
          </a>
        </p>
      </Grid>

      <Grid item xs={12}>
        <section className="goal-continue">
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={otp.length !== 6 || isVerified}
          >
            <span>Continue</span>
          </Button>
        </section>
      </Grid>
    </Grid>
  );
}
