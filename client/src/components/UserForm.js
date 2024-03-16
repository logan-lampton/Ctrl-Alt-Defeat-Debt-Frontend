import React, {useState} from 'react'
import {Typography, TextField, Button, Grid} from '@mui/material'
import {Link, useNavigate} from "react-router-dom"
import ArrowBack from "../assets/arrow_back.svg"
import axios from 'axios';
import styles from './styles/UserForm.css'
export default function UserForm(props) {
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
        
        

      

       navigate('/user-confirm')
    }


    return (
        <form onSubmit={handleSubmit}>
         
            <div class="form-container"
            // container spacing={2}
            // alignItems="center"
            // justifyContent="center"
            // sx={{width: '425px'}}

            >   
               <div>
                    <Link to='/sign-in'><img src={ArrowBack} style={{marginTop:"5px"}} alt="ArrowBack" /></Link>

                </div>         
                <div >
                    <h1 style={{textAlign:"left", marginTop:"10px", fontSize: '30px',marginLeft: '10px', marginRight:'auto',color: 'black', fontFamily: 'TT Commons Bold'}}>Let's get started</h1>
                </div>
                <div class="outlined-input">
                    <input id="outlined-input" onChange={handleInputChange} name= "firstName" placeholder="First Name" />

                </div>
                <div class="outlined-input">
                    <input id="outlined-input" onChange={handleInputChange} name= "lastName" placeholder="Last Name" />

                </div>
                <div class="outlined-input">
                    <input id="outlined-input" onChange={handleInputChange} name= "phone" placeholder="Mobile Phone Number" />

                </div>
                    <div class="outlined-input">
                        <input id="outlined-input" onChange={handleInputChange}  name="email" placeholder="Email" />

                    </div>
                    <div class="outlined-input">
                        <input id="outlined-input" type="password"  onChange={handleInputChange}  name="password" label="Password" placeholder="Password" />

                    </div>
                    <div class="outlined-input">
                        <input id="outlined-input" type="password" onChange={handleConfirmPasswordChange} label="Confirm Password" name="confirmPassword" placeholder="Confirm Password" />

                    </div>
                
            </div>
            <button type="submit" class="userFormSubmitButton" style={{marginTop:'-55%', width:"90%", marginLeft: '20px', marginRight: 'auto'}}> Next </button>
           
        </form>
    )
}
