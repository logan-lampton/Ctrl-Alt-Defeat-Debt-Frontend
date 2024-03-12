import React from 'react';
import MainImg from "../assets/MainImg.svg"
import {Box, Container, Typography, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import './SignIn.css'

export default function SignIn() {
    return (
        <div >
            <div>       
                <img style={{ width: '100%', height: 'auto', display: 'block' }} src={MainImg} alt="MainImg" />
              </div> 
              <div>
                    <Typography component="div">
                        <p sx={{ fontSize: 30 }}>Your money, your goals</p>
                    </Typography>
                </div>
                <div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..
                    </p>
                </div>
                <div>
                    <Button variant="outlined">Login</Button>
                    <Button variant="contained" sx={{ ml: 1 }}>Get Started</Button>
                </div>  
             
          
    </div>
    );
}
