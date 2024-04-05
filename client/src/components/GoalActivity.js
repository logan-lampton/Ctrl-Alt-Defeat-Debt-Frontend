import React, {useContext, useEffect,useState} from 'react'
import {TextField, Button, Modal } from '@mui/material'
import BottomNav from './BottomNav'
import ArrowBack from "../assets/arrow_back.svg"
import SettingsGear from "../assets/settings.svg"

import { Container } from '@mui/system'
import { UserContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom'
import GoalCongrats from'../assets/GoalsCongrats.svg'
import './styles/GoalActivity.css'
import ModalContext from "../context/ModalContext";
import GoalSettings from './GoalSettings'

export default function GoalActivity() {
    const [isOpen, setIsOpen] = useState(false);
    const options = [
      { label: 'Edit Goal', value: 'edit' },
      { label: 'Delete Goal', value: 'delete' },
    
    ];
    const navigate = useNavigate()
    const { handleClose, open } = useContext(ModalContext);

    const { selectedGoal} = useContext(UserContext);
    useEffect(() => {
    }, [selectedGoal]);

    
    const onSubmit=()=>{
    }

    const handleOpenModal = () => {
        setIsOpen(true);
      };
    
      const handleCloseModal = (selectedOption) => {
        setIsOpen(false);
        console.log('Selected option:', selectedOption);
      };

    return (
      <div className="page-container">
        <Container>
        <div className="goal-activty-container">
            <div >
                <img className="arrow-back" src={ArrowBack} alt="ArrowBack" onClick={()=> navigate(-1)} />
            </div>
            
            <div className="settings-gear-container">
                <img onClick={handleOpenModal} className="settings-gear" src={SettingsGear} alt="SettingsGear" />
            </div>
            <GoalSettings isOpen={isOpen} handleCloseModal={handleCloseModal} options={options}/>
            <div className="activity-emoji-container">
                <input className="emoji-input"
                    type="emoji"
                    defaultValue={selectedGoal?.emoji}
                    readOnly
                />
            </div>
                    <p className="goal-activity-subtext">Current Balance</p>
                    <p className="balance-amount"> $0.00</p>
                    <div style={{ position: "relative" }}>
                        <button className="goal-activity-button" style={{position: "absolute", fontSize:"16px", textTransform:"none",width:"89%", marginLeft: '24px', marginRight: '24px'}}  type="submit" variant="contained">Add Money</button> 

                    </div>

                    <div className="goal-activity-description">
                        <p className="goal-activity-title-text">Goal Activity</p>
                        <p className="goal-activity-desc-text">Money Magnet will begin to analyze your spending habits and will start providing you with tips and advice on how to save $2,000 by September 24, 2025</p>
                    </div>

            </div>
            

        </Container>
        <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                    <div className="modal-container" 
                        style={{
                            borderRadius:"15px",
                            textAlign:"center",
                            backgroundColor: "white", 
                            width:"360px",
                            height:"325px",
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                        
                        }}>
                        <img className="modal-img" src={GoalCongrats} 
                            style={{
                                width: "100px" ,
                                display: "inline-block",
                                height: "78.46",
                                margin:"24px 0px 8px 0px"
                        }}/>            
                        <h1 className="modal-header" 
                            style={{
                                fontSize:"24px", 
                                fontFamily:"TT Commons Bold",
                                margin:"-10px 0px 0px 0px"
                            }}>
                                Congratulations!
                        </h1>
                        <p className="modal-subtext" 
                        style={{
                                margin:"0px 24px 8px 24px",
                                lineHeight:"2",
                                textAlign:"left", 
                                fontSize:"16px"
                            }}>
                                Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna..
                        </p>
                        <Button 
                            style={{
                                width:"89%", 
                                height:"15%", 
                                marginLeft: '24px', 
                                marginRight: '24px', 
                                textTransform:"none"
                            }} 
                            onClick={handleClose}
                            variant="contained">
                                Close
                        </Button>
                    </div>             
                            
                </Modal>

        <BottomNav />
        </div>  
    )
}
