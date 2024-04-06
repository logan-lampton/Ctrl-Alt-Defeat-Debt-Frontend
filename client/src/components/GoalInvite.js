import React, {useContext, useEffect, useState} from 'react'
import {TextField, Button} from '@mui/material'

import BottomNav from './BottomNav'
import ArrowBack from "../assets/arrow_back.svg"
import { Container } from '@mui/system'
import { UserContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom'
import GoalActivity from './GoalActivity'
import ModalContext from "../context/ModalContext";

export default function GoalInvite() {
    const [submitted, setSubmitted] = useState(false);
    const { selectedGoal } = useContext(UserContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const { handleOpen } = useContext(ModalContext);
    const handleClose=()=> setOpen(false)

    // useEffect(() => {
       
    // }, [selectedGoal, open]);

   
    const submitInvite= () => {
        handleOpen()
        navigate("/goal-activity");
        setSubmitted(true)

    };
    

    return (
        <>
        <Container>
                <div className="goal-invite-container">
                    <div className>
                        <img className="arrow-back" src={ArrowBack} alt="ArrowBack" onClick={()=> navigate(-1)} />
                    </div>
                    <h1 className="goal-form-header">Do you want to add someone to this goal?</h1>
                    <p className="goal-invite-subtext">Add a friend or a family member to a goal and Money Magnet will help you save as a group</p>
                    <div className="emoji-input-container">
                        <input className="emoji-input"
                            type="emoji"
                            defaultValue={selectedGoal?.emoji}
                            readOnly
                        />
                    </div>
                    <div className="goal-form-text-input">
                        <TextField
                            placeholder='Email'
                        
                        >

                        </TextField>
                    </div>
                    <Button onClick={submitInvite} style={{position: "fixed", bottom: "129px",fontSize:"16px", textTransform:"none",width:"89%", marginLeft: '24px', marginRight: '24px'}} className="save-goal-button" type="submit" variant="contained" >Next</Button>

                </div>
        </Container>
       
        <BottomNav />
        </>
    
    )
}
