import React from 'react'
import {Stack, spacing, Container, Typography, TextField, Button, Grid} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function PhoneForm(props) {

    const theme={
        spacing: 8
    }
    


    return (
        <div>
            <Grid 
            container spacing={3}
            alignItems="center"
            justifyContent="center"
            sx={{width: '425px'}}

            >   
                <Grid item xs={10}>
                    <ArrowBackIcon />   
                </Grid>         
                
                <Grid item xs={12} >
                    <Typography align="left">
                        <h1 style={{marginTop:"5px", fontSize: '32px',marginLeft: 'auto', marginRight:'auto',color: 'black', fontFamily: 'TT Commons Bold'}}>Let's get started</h1>
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <TextField fullWidth id="fullWidth" label="Mobile Phone Number" variant="outlined"/>
                </Grid>
                <Grid item xs={10}>
                    <TextField fullWidth id="fullWidth" label="Email" variant="outlined" />
                </Grid>
                <Grid item xs={10}>
                <TextField fullWidth id="fullWidth" label="Password" variant="outlined" />
                </Grid>
                {/* <Grid item xs={10}>
                    <TextField fullWidth id="fullWidth" label="Password" variant="outlined" />
                </Grid> */}
                <Grid item xs={10}>
                    <Button style={{marginTop: '115%', padding: '20px', marginRight:'auto', marginLeft: 'auto'}} variant="contained" size="small">Next</Button>
                </Grid>
            </Grid>
            
           
        </div>
    )
}
