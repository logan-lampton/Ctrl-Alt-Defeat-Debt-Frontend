import React from 'react';
import MainImg from "../assets/MainImg.svg"
import {Stack, Button } from '@mui/material'
import styles from './styles/SignIn.css'

export default function SignIn() {



    return (
            <div className={styles.headergrid}>
                <div item xs={10}>       
                    <img style={{marginTop: '-5px', width:'100%', display: 'block' }} src={MainImg} alt="MainImg" />
                </div> 
                <div>
                    <h1 className="hugeHeadline">Your money, your goals</h1>
                </div>
                <div>
                    <p className={styles.mainParagraph}>
                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..
                    </p>
                </div>
                <div>
                    <Stack spacing={-3} direction="row">
                        <Button style={{marginTop:'20px',width:"35%", display: "inlineflex", padding: '15px', marginLeft:"5%", backgroundColor: '#F2F5F8', marginRight:"40px"}}variant="outlined">Login</Button> 
                        <Button style={{marginTop:'20px',width:"45%"}} variant="contained" size="small">Get Started</Button>
                    </Stack>
                </div>
            </div>
                   
    );
}
