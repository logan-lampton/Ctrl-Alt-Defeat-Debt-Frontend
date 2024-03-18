import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import ArrowBack from "../assets/arrow_back.svg"
import './styles/LogInForm.css'
import { useForm } from "react-hook-form"


export default function LogInForm() {

    const {
        register, 
        handleSubmit, 
        formState:{errors}
    } = useForm();
    // console.log(errors);

    const navigate = useNavigate();
       
    const isEmailDomainAllowed=(email)=> {
        const allowedDomains = ['gmail.com', 'yahoo.com', "hotmail.com", "aol.com", "msn.com","live.com"];
        const [, domain] = email.split('@');
        return allowedDomains.includes(domain);
    }
       
    return (

        <form onSubmit={handleSubmit((data)=>{
            console.log(data)
            navigate('/user-confirm')
        })}>
         
            <div className="log-in-form-container"> 

               <div>
                    <Link to='/'><img src={ArrowBack} style={{marginTop:"5px"}} alt="ArrowBack" /></Link>
                </div> 
                <div >
                    <h1 style={{marginBottom: "-1px",textAlign:"left", marginTop:"5px", fontSize: '30px',marginLeft: '10px', marginRight:'auto',color: 'black', fontFamily: 'TT Commons Bold'}}>Welcome Back</h1>
                </div>
               


               <div className="log-in-outlined-input-container">
                    <p className="log-in-errorMessages">{errors.email?.message}</p>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register('email', {
                            required: 'Email is required',
                            validate: (value) =>
                            isEmailDomainAllowed(value) || 'Email domain not allowed',
                    })} 
                        name="email" 
                        className="log-in-outlined-input" 
                    />
                </div>

                <div className="log-in-outlined-input-container">
                <p className="errorMessages">{errors.password?.message}</p>
                    <input {...register("password", {required: "Password required."})} name="password" className="log-in-outlined-input" type="password" label="Password" placeholder="Password" />
                </div>

              

            </div>
            <button type="submit" className="log-in-form-submit-button" style={{marginTop:'80%', width:"90%", marginLeft: '20px', marginRight: 'auto'}}> Next </button>
        </form>
    )
}
