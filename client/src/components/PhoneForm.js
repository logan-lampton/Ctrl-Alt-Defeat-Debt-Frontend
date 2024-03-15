import React, {useState} from 'react'
import {Typography, TextField, Button, Grid} from '@mui/material'
import {Link, useNavigate} from "react-router-dom"
import ArrowBack from "../assets/arrow_back.svg"
import axios from 'axios';

export default function PhoneForm(props) {
    const [formData, setFormData] = useState({
        username:'',
        email: '',
        phone: '',
        password: ''
    });

    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate();
            
    const handleInputChange=(e)=>{
        const {name, value}= e.target
        console.log('username:',formData.username)
        setFormData({...formData, [name]: value })
       
    }

    const handleConfirmPasswordChange = (e)=>{
        const value = e.target.value;
        console.log('Confirm Password:', value )
        setConfirmPassword(value);
    }
    
  
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(e.target)
        const data = {
            'username': formData.username,
            'email': formData.email,
            'phone': formData.phone,
            'password': formData.password
        }
        //Validation to be used later
        // if(formData.password !== confirmPassword){
        //     alert('Passwords do not match')
        //     return;
        // }else if(!formData.username){
        //     alert('Please enter a username')
        //     return;
        // }
        
        

      

       navigate('/phone-confirm')
    }


    return (
        <form onSubmit={handleSubmit}>
         
            <Grid 
            container spacing={3}
            alignItems="center"
            justifyContent="center"
            sx={{width: '425px'}}

            >   
               <Grid item xs={10}>
               <Link to='/sign-in'><img src={ArrowBack} alt="ArrowBack" /></Link>

                </Grid>         
                <Grid item xs={11} >
                        <h1 style={{textAlign:"left",marginBottom:'-10px', marginTop:"10px", fontSize: '32px',marginLeft: '20px', marginRight:'auto',color: 'black', fontFamily: 'TT Commons Bold'}}>Let's get started</h1>
                </Grid>

                    <Grid item xs={10}>
                        <TextField onChange={handleInputChange}fullWidth id="fullWidth" name="username" label="Username" variant="outlined"/>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField  
                            onChange={handleInputChange} 
                            fullWidth id="fullWidth" 
                            name= "phone"
                            label="Mobile Phone Number" 
                            variant="outlined"
                          
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField  onChange={handleInputChange} fullWidth id="fullWidth" name="email" label="Email" variant="outlined" />
                    </Grid>
                    <Grid item xs={10}>
                    <TextField type="password"  onChange={handleInputChange} fullWidth id="fullWidth" name="password" label="Password" variant="outlined" />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField type="password" onChange={handleConfirmPasswordChange}fullWidth id="fullWidth" label="Confirm Password" name="confirmPassword" variant="outlined" />
                    </Grid>
                
            </Grid>
            <Button type="submit" variant="contained" style={{marginTop:'100px', width:"85%", marginLeft: '30px', marginRight: 'auto'}}> Next </Button>
           
        </form>
    )
}
