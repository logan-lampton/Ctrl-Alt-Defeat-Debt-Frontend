import React from 'react'
import {Grid, Typography, TextField, Checkbox} from '@mui/material'
import {Link, useNavigate} from "react-router-dom"
import ArrowBack from "../assets/arrow_back.svg"
import PlaidLinkButton from './PlaidLinkButton'
import './styles/UserConfirm.css'
import { useForm } from "react-hook-form"
import LogInForm from './LogInForm'
import SignUpForm from './SignUpForm'

export default function UserConfirm() {

    const navigate = useNavigate();

    const {
        register, 
        handleSubmit, 
        formState:{errors}
    } = useForm();

    console.log(errors);
    
    const label = { inputProps: { 'aria-label': 'Checkbox' } };

    
  
    return (
        
        <Grid 
            container spacing={-5}
            alignItems="center"
            justifyContent="center"
            sx={{width: '425px'}}
            columnSpacing={{xs:1}}
        > 
            <Grid item xs={11}>             
                    <img style={{marginLeft:"3px"}} src={ArrowBack} alt="ArrowBack" onClick={()=> navigate(-1)} />
            </Grid>

            <Grid item xs={12}>
                    <h1 style={{textAlign:"center", fontSize:"32px",fontFamily: 'TT Commons Bold', color:'black', marginTop:"10px"}}>Confirm your number</h1>
            </Grid>

            <Grid item xs={12}>          
                     <p style={{ textAlign:"center", marginTop:'-5px', marginBottom:"50px",width:'88%',fontFamily:'TT Commons Regular', fontSize:'16px', color:'#718291', lineHeight:'22px'}}>Please submit the 6 digit confirmation code sent to 202-555-5555</p>
            </Grid> 
  
                    <Grid item xs={12} >
                            <TextField 
                                className="confirmationCode" 
                                inputProps={{min: 0, style: {marginRight: '20px',textAlign: 'center', fontFamily: 'TT Commons Medium', fontSize: '24px', marginBottom:"20px"}}} 
                                fullWidth
                                variant="standard"
                                style={{marginBottom:'10px', marginLeft: '5%', width: '90%', color:"#DEE5EB"}} 
                                placeholder="Six Digit Code"
                            />

                    </Grid>

            <Grid item xs={1} >
                    <Checkbox {...label} style={{marginBottom:'15px', marginLeft:"15px"}}/>
            </Grid>
            
            <Grid item xs={11}>
                    <p style={{textAlign:"left",marginRight:"24px",  color:'#718291', fontFamily: 'TT Commons Regular', fontSize:"14.5px", lineHeight:'18px'}}>I agree to Money Magnet's <a className="terms-links" href="#">Terms of Use</a> including the <a className="terms-links" href="#">E-Sign Consent</a>, <a className="terms-links" href="#">ACH Authorization</a> and <a className="terms-links" href="#">Privacy Policy.</a></p>
            </Grid>

            <Grid item xs={12}>
                    <PlaidLinkButton />                  
             </Grid>

        </Grid>

    )
}
