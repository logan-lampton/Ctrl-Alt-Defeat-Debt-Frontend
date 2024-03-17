import React from 'react';
import MainImg from "../assets/MainImg.svg"
import {Stack, Button } from '@mui/material'
import './styles/WelcomePage.css'

export default function SignIn() {

       return (
            <div className="header-grid">
                <div>       
                    <img style={{marginLeft:"10px",marginTop: '-2px', width:'90%', display: 'block',marginBottom:"-10px" }} src={MainImg} alt="MainImg" />
                </div> 
                <hr style={{marginTop:"7px",border:"1px solid #cccccc"}}></hr>
                <div>
                    <h1 className="hugeHeadline">Your money, your goals</h1>
                </div>
                <div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..
                    </p>
                </div>
                <div>
                    <Stack spacing={1} direction="row">
                        <a href ="/log-in" style={{textDecoration:"none"}}>
                            <button className="loginButton" style={{marginTop:"75px", marginLeft:"20px"}}>Login</button> 
                        </a>
                        <a href ="/sign-up" style={{textDecoration:"none"}}>
                            <button className="getStartedButton" style={{textDecoration:"none",marginTop:"75px"}}>Get Started</button>
                        </a>
                    </Stack>
                </div>
            </div>
                   
    );
}
