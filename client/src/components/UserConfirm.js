import React from 'react'
import {Grid, Typography, TextField, Checkbox} from '@mui/material'
import {Link} from "react-router-dom"
import ArrowBack from "../assets/arrow_back.svg"
import PlaidLinkButton from './PlaidLinkButton'
import styles from './styles/UserConfirm.css'

export default function UserConfirm(props) {
    
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
                    <Link to='/user-form'><img style={{marginLeft:"3px"}} src={ArrowBack} alt="ArrowBack" /></Link>
            </Grid>

            <Grid item xs={12}>
                    <Typography align="center">
                        <h1 style={{fontSize:"32px",fontFamily: 'TT Commons Bold', color:'black', marginTop:"10px"}}>Confirm your number</h1>
                    </Typography>
            </Grid>

            <Grid item xs={12}>
                
                    <Typography align="center">
                        <p style={{ marginTop:'-5px', marginBottom:"50px",width:'88%',fontFamily:'TT Commons Regular', fontSize:'16px', color:'#718291', lineHeight:'22px'}}>Please submit the 6 digit confirmation code sent to 202-555-5555</p>
                    </Typography>
                </Grid> 
  
                <Grid item xs={12} >
                    <TextField 
                        class="confirmationCode" 
                        inputProps={{min: 0, style: {marginRight: '20px',textAlign: 'center', fontFamily: 'TT Commons Medium', fontSize: '24px', marginBottom:"20px"}}} 
                        fullWidth
                        variant="standard"
                        style={{marginBottom:'10px', marginLeft: '5%', width: '90%', color:"#DEE5EB"}} 
                        placeholder="Six Digit Code"
                        inputLabelProps={{ style: { color: 'black' } }} // Set label color
                    // Set input text color
                    />
                </Grid>

            <Grid item xs={1} >
                    <Checkbox {...label} style={{marginBottom:'15px', marginLeft:"15px"}}/>
            </Grid>
            
            <Grid item xs={11}>
                    <Typography align="left">     
                        <p style={{marginRight:"24px",  color:'#718291', fontFamily: 'TT Commons Regular', fontSize:"14.5px", lineHeight:'18px'}}>I agree to Money Magnet's <a class="terms-links" href="#">Terms of Use</a> including the <a class="terms-links" href="#">E-Sign Consent</a>, <a class="terms-links" href="#">ACH Authorization</a> and <a class="terms-links" href="#">Privacy Policy.</a></p>
                    </Typography>
            </Grid>

            <Grid item xs={12}>
                    <PlaidLinkButton />                  
             </Grid>

        </Grid>

    )
}
