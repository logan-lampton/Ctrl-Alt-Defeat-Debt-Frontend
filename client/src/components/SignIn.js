import React from 'react';
import MainImg from "../assets/MainImg.svg"
import {Stack, Button } from '@mui/material'
import style from './styles/SignIn.css'
import UserForm from './UserForm'
import {Link} from "react-router-dom"
export default function SignIn() {

   

    return (
            <div className={style.headergrid}>
                <div>       
                    <img style={{marginLeft:"10px",marginTop: '-2px', width:'90%', display: 'block',marginBottom:"-10px" }} src={MainImg} alt="MainImg" />
                </div> 
                <hr style={{marginTop:"7px",border:"1px solid #cccccc"}}></hr>
                <div>
                    <h1 class= "hugeHeadline">Your money, your goals</h1>
                </div>
                <div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..
                    </p>
                </div>
                <div>
                    <Stack spacing={1} direction="row">
                        <button class="loginButton" style={{marginTop:"75px", marginLeft:"20px"}}>Login</button> 
                        <a href ="/user-form" style={{textDecoration:"none"}}>
                            <button class="getStartedButton" style={{textDecoration:"none",marginTop:"75px"}}>Get Started</button>
                        </a>
                    </Stack>
                </div>
            </div>
                   
    );
}
