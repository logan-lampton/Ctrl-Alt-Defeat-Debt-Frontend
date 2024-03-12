import React from 'react'
import {Container, Typography, TextField, Checkbox} from '@mui/material'

export default function PhoneConfirm(props) {
    
    const label = { inputProps: { 'aria-label': 'Checkbox' } };

    return (
        
        <Container>
            <Typography>
                <h1>Confirm your number</h1>
                <p>Please submite the 6 digit confirmation code set to 202-555-5555</p>
            </Typography>
            <TextField id="standard-basic" label="Six Digit Code" variant="standard" />

            <Typography>
                <Checkbox {...label} />
                I agree to Money Magnet's <a href="#">Terms of Use</a> including the <a href="#">E-Sign Consent</a>, <a href="#">ACH Authorization</a> and <a href="#">Privacy Policy.</a>
            </Typography>
        </Container>
    )
}
