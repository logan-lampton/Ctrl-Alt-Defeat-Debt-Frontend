import React from 'react';
import MainImg from "../assets/MainImg.svg"
import {Stack, Button } from '@mui/material'
import styles from './SignIn.css'

export default function SignIn() {
    return (
        <div className={styles.headergrid}>
                <div item xs={10}>       
                    <img style={{ marginRight: "%", marginTop: "70px", width:'120%', height: 'auto', display: 'block' }} src={MainImg} alt="MainImg" />
                </div> 
                <div>
                    <h1>Your money, your goals</h1>
                </div>
                <div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..
                    </p>
                </div>
                <Stack spacing={2} direction="row">
                    <Button style={{width:"100%", display: "inlineflex", padding: '15px', marginLeft:"5%", backgroundColor: '#F2F5F8' }}variant="outlined">Login</Button> 
                    <Button style={{padding: '10px', marginRight:"15%", marginLeft:"5%"}} variant="contained" size="small">Get Started</Button>
                </Stack>  
             
          
    </div>
    );
}
