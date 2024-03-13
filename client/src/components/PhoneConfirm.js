import React from 'react'
import {Grid, Typography, TextField, Checkbox, styled, InputLabel} from '@mui/material'

export default function PhoneConfirm(props) {
    
    const label = { inputProps: { 'aria-label': 'Checkbox' } };
    const CenteredLabel = styled(InputLabel)(({ theme }) => ({
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333', // Customize label color
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
      }));




    return (
        
        <Grid 
            container spacing={1}
            alignItems="center"
            justifyContent="center"
            sx={{width: '425px'}}

        > 
            
            <Grid item xs={12}>
                <Typography align="center">
                    <h1 style={{fontStyle: 'TT Commons DemiBold', color:'black'}}>Confirm your number</h1>
                </Typography>
            </Grid>
                <Grid item xs={12}>
                    <Typography align="center">
                        <p style={{ marginTop:'-10px',width:'95%',fontFamily:'TT Commons Regular', fontSize:'24px', color:'#718291', lineHeight:'22px'}}>Please submit the 6 digit confirmation code sent to 202-555-5555</p>
                    </Typography>
                </Grid> 
  
                <Grid item xs={12} >
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CenteredLabel htmlFor="confirmationCode" style={{fontFamily:'TT Commons Medium', color:'#DEE5EB', fontSize:'25px', marginTop:'20px'}}>Six Digit Code</CenteredLabel>
                    </div>
                    <TextField fullWidth id="confirmationCode" variant="standard" style={{marginBottom:'20px',marginLeft: '10%',width: '75%'}} />
                </Grid>

            <Grid item sc={2} >
                <Checkbox {...label} style={{marginBottom:'20px'}}/>
            </Grid>
            
            <Grid item xs={10}>
                <Typography align="left">     
                    <p style={{marginRight:"30px", color:'#718291', fontFamily: 'TT Commons Thin', fontSize:"14.5px", lineHeight:'22px'}}>I agree to Money Magnet's <a href="#">Terms of Use</a> including the <a href="#">E-Sign Consent</a>, <a href="#">ACH Authorization</a> and <a href="#">Privacy Policy.</a></p>
                </Typography>
            </Grid>
               

                
        </Grid>
    )
}
