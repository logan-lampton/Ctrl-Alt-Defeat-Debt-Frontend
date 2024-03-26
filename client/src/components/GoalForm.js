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


export default function GoalForm() {
    const { selectedGoal, setSelectedGoal, editing, setEditing, formData, setFormData, user} = useContext(UserContext);
    const [date, setDate] = useState(null)
    const [value, setValue ] = useState(false);
    const [firstGoal, setFirstGoal] =useState(true)
    const [goalType, setGoalType ] = useState("Personal")

    const navigate = useNavigate();
    const { register, handleSubmit, control, formState:{errors} } = useForm({
        defaultValues: {
            editedEmoji: selectedGoal?.emoji,
            editedName: selectedGoal?.name,
        }
    })

    const onSubmit = async (data) => {
        const newDate = new Date(date)
        const newDateString = newDate.toISOString().slice(0, 10)
        const formJSON = {
            user_id: user.id,
            emoji: data.editedEmoji,
            name: data.editedName,
            end_timeframe: newDateString,
            saving_target: data.saving_target,
        }
        console.log(formJSON)
        if (goalType === "Personal") {
            fetch("/personal_goals", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(formJSON),
            }).then(r => r.json().then(data => {
                setFormData(data)
            }))
        } else {
            fetch("/goals", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(formJSON),
            }).then(r => r.json().then(data => {
                setFormData(data)
            }))
        }

        setEditing(false)
        navigate('/goal-invite')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                                {...register('emoji', { required: true })}
                                defaultValue={selectedGoal?.emoji}
                            />
                        </div>
                        <FormControl fullWidth variant="filled" sx={{ marginLeft: 8 }}>
                            <InputLabel id="demo-simple-select-label">Select a Goal</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={goalType}
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
                            {...register('editedName', 
                                {required: "Goal Name Required."}
                            )} 
                            defaultValue={selectedGoal?.name}
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
                            {...register('saving_target', {
                                required: 'Goal amount is required',
                                // pattern: {
                                // value: /^[0-9]{10}$/,
                                // message: 'Only digits please'
                                // }
                            })}                 
                        />
                        {/* <Controller
                            name="selectedDate" 
                            control={control}
                            defaultValue={null} 
                            render={({ field }) => (
                                <DesktopDatePicker
                                    label="Select Date"
                                    inputFormat="MM/dd/yyyy"
                                    value={field.value}
                                    onChange={(newValue) => field.onChange(newValue)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            )}
                        /> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DesktopDatePicker']}>
                                <DesktopDatePicker
                                    label="Select a Date"
                                    value={date}
                                    onChange={(newValue) => setDate(newValue)}
                                    // {...register('timeframe')}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <Button 
                        onClick={onSubmit} 
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
