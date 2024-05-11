import React from 'react';
import { Modal, Button, Typography } from '@mui/material';
import "./styles/DeleteConfirmationModal.css";

const DeleteConfirmationModal = ({ open, onClose, onConfirmDelete }) => {
    return (
        
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="modal-container" 
                style={{
                    borderRadius:"15px",
                    textAlign:"center",
                    backgroundColor: "white", 
                    width:"360px",
                    height:"180px",
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                
                }}>
                
               
                <p className="modal-subtext" 
                style={{
                        margin:"20px 30px 8px 40px",
                        lineHeight:"2",
                        textAlign:"left", 
                        fontSize:"16px"
                    }}>
                        Are you sure you want to delete this item?
                </p>
                <Button 
                    style={{
                        width:"75%", 
                        height:"20%", 
                        marginLeft: '24px', 
                        marginRight: '24px', 
                        textTransform:"none",
                        display:"inline"
                    }} 
                    onClick={onClose}
                    variant="contained">
                        Cancel
                </Button>
                <Button 
                    style={{
                        width:"75%", 
                        height:"20%", 
                        marginLeft: '24px', 
                        marginRight: '24px', 
                        textTransform:"none",
                        display:"inline"
                    }} 
                    onClick={onConfirmDelete}
                    variant="contained">
                        Delete
                </Button>
            </div>             
                    
        </Modal>
    );
};

export default DeleteConfirmationModal;

