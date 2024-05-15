import React, {useState, useContext, useEffect} from 'react'
import { useForm, Controller } from 'react-hook-form';
import {  TextField, Button } from "@mui/material";
import { Container } from '@mui/system'
import { UserContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom'
import ArrowBack from "../assets/arrow_back.svg"
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import ArrowDropDown from '../assets/arrow_drop_down.svg'
import BottomNav from './BottomNav'
import './styles/GoalForm.css'
import AICall from './AICall';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import ModalContext from "../context/ModalContext";


export default function GoalEditForm() {
    const { formData, setFormData, user, selectedGoal, setSelectedGoal} = useContext(UserContext);
    const [goalType, setGoalType ] = useState("Personal")
    const { handleOpen } = useContext(ModalContext);
    const [date, setDate] = useState(selectedGoal.end_timeframe); // Set default date from selectedGoal

    const navigate = useNavigate();
    const {
        setValue,
        register,      
        handleSubmit, 
        formState:{errors}
    } = useForm();
  
    useEffect(() => {
        console.log(selectedGoal); // Check the entire object
        // Set form values based on selectedGoalForEdit
     
    },[] );

    const dateFormat=(date)=>{
        const newDate = new Date(date)
        console.log(newDate)   
        return newDate
    }
 

  
    const onSubmit = async (data) => {
        // console.log(`Personal Goal: ${user.personal_goal.id}`)
        console.log("Rendered goal data:", selectedGoal);

        const newDate = new Date(date)
        const newDateString = newDate.toISOString().slice(0, 10)
        var formJSON = {
            user_id: user.id,
            emoji: data.emoji,
            name: data.name,
            end_timeframe: newDateString,
            saving_target: data.savingTarget,
        }
        setSelectedGoal(formJSON)
        if (goalType === "Personal") {
            fetch("/personal_goals", {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(formJSON),
            }).then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            }).then(data => {
                console.log("API Response:", data); // Log the response data here
                if (data && data.id) {
                    const goalID = data.id;
                    console.log(`New goal ID: ${goalID}`);
                    navigate(`/goals-progress/personal/${goalID}`);
                    

                } else {
                    console.error("Response data does not contain the ID field or is invalid:", data);
                }
                setFormData(data);
            }).catch(error => {
                console.error("Error processing POST request:", error);
            });
        } else {
                formJSON = {
                ...formJSON, 
                group_id: user.group_id, 
            };
            fetch("/goals", {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(formJSON),
            }).then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            }).then(data => {
                console.log("API Response:", data); // Log the response data here
                if (data && data.id) {
                    const goalID = data.id;
                    console.log(`New goal ID: ${goalID}`);
                    navigate(`/goals-progress/group/${goalID}`)
                 
                } else {
                    console.error("Response data does not contain the ID field or is invalid:", data);
                }
                setFormData(data);
            }).catch(error => {
                console.error("Error processing POST request:", error);
            })
        }      
            
    }
    
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{overflow:"hidden"}}>
            {/* <AICall /> */}

            <Container>
                <div className="goal-form-container">
                    <div>
                        <img className="arrow-back" src={ArrowBack} alt="ArrowBack" onClick={()=> navigate(-1)} />
                    </div>
                    <h1 className="goal-form-header">Tell us some more about your goal</h1>
                    <p className="goal-form-subtext">Let's go ahead and dive into the details!</p>
                    <Container sx={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <div className="emoji-input-container">
                            <input className="emoji-input"
                                type="emoji"
                                {...register('emoji', { required: "Choose an emoji"})}
                                defaultValue={selectedGoal.emoji}
                                
                            />
                        </div>
                        <FormControl fullWidth variant="filled" sx={{ marginLeft: 8 }}>
                            <InputLabel id="demo-simple-select-label">Select a Goal</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedGoal.group_id ? "Group" : "Personal"}
                                    onChange={(event) => {setGoalType(event.target.value)}}
                                >   
                                <MenuItem value={"Personal"}>Personal</MenuItem>
                                 <MenuItem value={"Group"}>Group</MenuItem> 
                            </Select>
                        </FormControl>
                    </Container>
                    <div className="goal-form-text-input">
                        <TextField 
                            className="goal-form-text-field" 
                            {...register('name', 
                                {required: "Goal Name Required."}
                            )} 
                            defaultValue={selectedGoal.name}
                        />
                        {errors.saving_target && (
                            <p 
                                style={{marginTop:"-2px", marginBottom: "-20px"}} 
                                className={errors.saving_target ? 'errorMessages' : ''}
                            >
                                {errors.saving_target.message}
                            </p>)
                        }
                        <TextField
                            name="saving_target"
                            type="number"
                            placeholder="How much do you need to save?"
                            className="goal-form-text-field"
                            InputProps={{
                                startAdornment: <span>$</span>
                            }}
                            {...register('savingTarget', {
                                required: 'Goal amount is required',
                                // pattern: {
                                // value: /^[0-9]{10}$/,
                                // message: 'Only digits please'
                                // }
                            })}
                            defaultValue={selectedGoal.saving_target}

                                         
                        />
                        
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DesktopDatePicker']}>
                                <DesktopDatePicker
                                    label="Select a Date"
                                    value={dayjs(dateFormat(date))}
                                    onChange={(newValue) => setDate(newValue)}
                                    // {...register('timeframe')}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <Button
                        style={{
                            position: "fixed", 
                            bottom: "129px",
                            fontSize:"16px", 
                            textTransform:"none",
                            width:"89%", 
                            marginLeft: '24px', 
                            marginRight: '24px'
                        }} 
                        className="save-goal-button" 
                        type="submit" variant="contained"
                    >
                        Next
                    </Button>
                </div>  
            </Container>
            <BottomNav />
        </form>
    )
}
