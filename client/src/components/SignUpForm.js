import React, {useRef} from 'react'
import {Link, useNavigate} from "react-router-dom"
import ArrowBack from "../assets/arrow_back.svg"
import './styles/SignUpForm.css'
import { useForm } from "react-hook-form"

export default function SignUpForm() {

    const {register, handleSubmit, formState:{errors}, watch} = useForm();

    const navigate = useNavigate();
       
    const isEmailDomainAllowed=(email)=> {
        const allowedDomains = ['gmail.com', 'yahoo.com', "hotmail.com", "aol.com", "msn.com","live.com"];
        const [, domain] = email.split('@');
        return allowedDomains.includes(domain);
    }

    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = async (data) => {

       console.log(data)
        // try {
        //     const response = await axios.post('/signup', data);
        //     console.log('User sign up!', response.data);
        //     navigate('/user-confirm')
        // }catch(error){
        //     console.log('Error signing up user.', error.message);
        //     console.log(data)
        // }
        navigate('/user-confirm')
    }

         
    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-container"> 
               <div>
                    <Link to='/'><img src={ArrowBack} style={{marginTop:"5px"}} alt="ArrowBack" /></Link>
                </div> 
                <div >
                    <h1 style={{marginBottom: "-1px",textAlign:"left", marginTop:"5px", fontSize: '30px',marginLeft: '10px', marginRight:'auto',color: 'black', fontFamily: 'TT Commons Bold'}}>Let's get started</h1>
                </div>
                <div className="outlined-input-container">
                <p className="errorMessages">{errors.firstName?.message}</p>

                    <input {...register("firstName", {required: "First name required."})} name= "firstName" className="outlined-input" placeholder="First Name" />

                </div>

                <div className="outlined-input-container">
                <p className="errorMessages">{errors.lastName?.message}</p>
                    <input {...register("lastName", {required: "Last name required"})} name= "lastName" className="outlined-input" placeholder="Last Name" />

                </div>

                <div style={{marginTop:"12px"}} className={`outlined-input-container ${errors.phoneNumber ? 'error' : ''}`}>
                {errors.phoneNumber && (<p style={{marginTop:"-1px"}} className={errors.phoneNumber ? 'errorMessages' : ''}>{errors.phoneNumber.message}</p>)}
                    <input
                        name= "phone" 
                        className="outlined-input" 
                        placeholder="Mobile Phone Number" 
                        {...register('phoneNumber', {
                            required: 'Phone number is required',
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message: 'Invalid phone number',
                            },
                          })}
                    />
                </div>

                <div className="outlined-input-container">
                    <p className="errorMessages">{errors.email?.message}</p>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register('email', {
                            required: 'Email is required',
                            validate: (value) =>
                            isEmailDomainAllowed(value) || 'Email domain not allowed',
                    })} 
                        name="email" 
                        className="outlined-input" 
                    />
                </div>

                <div className="outlined-input-container">
                <p className="errorMessages">{errors.password?.message}</p>
                <input
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters'
                            }
                        })}
                        name="password"
                        className="outlined-input"
                        type="password"
                        label="Password"
                        placeholder="Password"
                    />
                </div>


                <div className="outlined-input-container">
                <p className="errorMessages">{errors.confirmPassword?.message}</p>
                    <input 
                        {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: (value) =>
                                value === password.current || 'The passwords do not match'
                        })}
                        name="confirmPassword"
                        className="outlined-input"
                        type="password"
                        label="Confirm Password"
                        placeholder="Confirm Password"
                    />
                </div> 

            </div>
            <button type="submit" className="userFormSubmitButton" style={{marginTop:'-55%', width:"90%", marginLeft: '20px', marginRight: 'auto'}}> Next </button>
        </form>
    )
}
