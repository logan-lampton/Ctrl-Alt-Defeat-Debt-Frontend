import React from 'react';
import MainImg from "../assets/MainImg.svg"
import {Stack, Button } from '@mui/material'
import style from './styles/SignIn.css'
import PhoneForm from './PhoneForm'
import {Link} from "react-router-dom"
export default function SignIn() {



    return (
            <div className={style.headergrid}>
                <div>       
                    <img style={{marginTop: '-5px', width:'100%', display: 'block' }} src={MainImg} alt="MainImg" />
                </div> 
                <div>
                    <h1 className="hugeHeadline">Your money, your goals</h1>
                </div>
                <div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..
                    </p>
                </div>
                <div>
                    <Stack spacing={-3} direction="row">
                        <Button style={{marginTop:'10px',width:"35%", display: "inline-flex", padding: '15px', marginLeft:"5%", backgroundColor: '#F2F5F8', marginRight:"40px"}}variant="outlined">Login</Button> 
                        <Button component={Link} to="/phone-form" style={{marginTop:'10px',width:"45%"}} variant="contained" size="small">Get Started</Button>
                                            
                    </Stack>
                </div>
            </div>
                   
    );
}
