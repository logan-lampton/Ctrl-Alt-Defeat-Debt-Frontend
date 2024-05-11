import React from 'react'
import { Modal, Button, Typography } from '@mui/material';
import GoalCongrats from'../assets/GoalsCongrats.svg';


export default function CongratsModal({ open, onClose }) {
    

    return (
        <Modal
        isopen={open}
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
                    onClick={onClose}
                    variant="contained">
                        Close
                </Button>
            </div>             
                    
        </Modal>
    )
}
