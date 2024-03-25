import React from 'react'
import SettingsGear from "../assets/settings.svg"
import { Modal, Button } from "@mui/material"
import {useNavigate} from "react-router-dom"
import './styles/GoalSettings.css'
import { Divider, MenuList, MenuItem, ListItemText } from '@mui/material'

export default function GoalSettings({ isOpen, handleClose, options }) {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleEditGoal = () => {
        navigate('/goal-form');
    };

    return (
        <>

         <div className={`custom-modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <MenuItem style={{color: "#718291"}}>What do you want to do?</MenuItem>
                <MenuList style={{marginTop: "10px"}}>
                {options.map((option, index) => (
                    
                    <><MenuItem  style={{color:"#3398ff"}} className="menu-item" key={index} onClick={() => handleClose(option)}>
                        {option.label}
                    </MenuItem>

                 </>
                ))}            
                </MenuList>
                <Button style={{fontSize:"16px", textTransform:"none",marginRight:"15px", marginTop: "20px",color:"#3398ff"}} className="menu-item">Cancel</Button>

            </div>
            
        </div>
        </>
    )
}
