import React from 'react'
import {Grid, Typography, TextField, Checkbox, styled, InputLabel} from '@mui/material'
import {Link} from "react-router-dom"
import ArrowBack from "../assets/arrow_back.svg"

export default function PhoneConfirm(props) {
    
    const label = { inputProps: { 'aria-label': 'Checkbox' } };
    const CenteredLabel = styled(InputLabel)(({ theme }) => ({
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333', // Customize label color
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center',
        marginRight:'10px' // Center vertically
      }));




    return (
        
        <Grid 
            container spacing={1}
            alignItems="center"
            justifyContent="center"
            sx={{width: '425px'}}
            columnSpacing={{xs:1}}
        

        > 
            <Grid item xs={10}>
             
               <Link to='/phone-form'><img style={{}} src={ArrowBack} alt="ArrowBack" /></Link>
            </Grid>
            <Grid item xs={12}>
                <Typography align="center">
                    <h1 style={{fontStyle: 'TT Commons DemiBold', color:'black'}}>Confirm your number</h1>
                </Typography>
            </Grid>
                <Grid item xs={12}>
                    <Typography align="center">
                        <p style={{ marginTop:'-10px',width:'88%',fontFamily:'TT Commons Regular', fontSize:'22px', color:'#718291', lineHeight:'22px'}}>Please submit the 6 digit confirmation code sent to 202-555-5555</p>
                    </Typography>
                </Grid> 
  
                <Grid item xs={12} >
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CenteredLabel htmlFor="confirmationCode" style={{fontFamily:'TT Commons Medium', color:'#DEE5EB', fontSize:'25px', marginTop:'20px'}}>Six Digit Code</CenteredLabel>
                    </div>
                    <TextField fullWidth id="confirmationCode" variant="standard" style={{marginBottom:'20px',marginLeft: '5%',width: '90%'}} />
                </Grid>
            <Grid item xs={1} >
                <Checkbox {...label} style={{marginBottom:'15px'}}/>
            </Grid>
            
            <Grid item xs={11}>
                <Typography align="left">     
                    <p style={{marginRight:"22px", color:'#718291', fontFamily: 'TT Commons Thin', fontSize:"14.5px", lineHeight:'18px'}}>I agree to Money Magnet's <a href="#">Terms of Use</a> including the <a href="#">E-Sign Consent</a>, <a href="#">ACH Authorization</a> and <a href="#">Privacy Policy.</a></p>
                </Typography>
            </Grid>
               
                
        </Grid>
    )
}
