import React from 'react'
import {Typography, TextField, Button, Grid} from '@mui/material'
import {Link} from "react-router-dom"
import ArrowBack from "../assets/arrow_back.svg"

export default function PhoneForm(props) {

    


    return (
        <div>
            <Grid 
            container spacing={3}
            alignItems="center"
            justifyContent="center"
            sx={{width: '425px'}}

            >   
                <Grid item xs={10}>
               <Link to='/sign-in'><img style={{}}src={ArrowBack} alt="ArrowBack" /></Link>

                </Grid>         
                
                <Grid item xs={11} >
                        <h1 style={{textAlign:"left",marginBottom:'-20px', marginTop:"10px", fontSize: '32px',marginLeft: '20px', marginRight:'auto',color: 'black', fontFamily: 'TT Commons Bold'}}>Let's get started</h1>
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
          
            </Grid>
            <Button component={Link} to="/phone-confirm" variant="contained" style={{marginTop:'200px', width:"85%", marginLeft: '30px', marginRight: 'auto'}}> Next </Button>
            
           
        </div>
    )
}
