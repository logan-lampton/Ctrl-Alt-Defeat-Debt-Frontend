import React, {useState, useContext, useEffect} from 'react'
import { useForm } from 'react-hook-form';
import {  TextField, Button, Modal } from "@mui/material";
import { Container } from '@mui/system'
import { UserContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom'
import ArrowBack from "../assets/arrow_back.svg"
import BottomNav from './BottomNav'
import GoalCongrats from'../assets/GoalsCongrats.svg'
import './styles/GoalForm.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function GoalForm({ setEditing }) {
    const { user, selectedGoal, setSelectedGoal, setPersonalGoals, personalGoals} = useContext(UserContext);
    const navigate = useNavigate();

    const [goalType, setGoalType] = useState("Personal");
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(null)
    const [date, setDate ] = useState(null)
    // const [firstGoal, setFirstGoal] = useState(true);

    function handleClose() {
        setOpen(false)
        setPersonalGoals([...personalGoals, formData])
        navigate(`/goals-progress/${goalType.toLowerCase()}/${formData.id}`)
    };

    const { register, handleSubmit, formState:{errors} } = useForm({
        defaultValues: {
            editedEmoji: selectedGoal?.emoji,
            editedName: selectedGoal?.name,
        }
    })

// useEffect(()=>{
//     const fetchUserGoals = async()=>{
//         try{
//             // const response = await axios.get('/user/goals');
//             if(response.data.length > 0){
//                 setSelectedGoal(response.data[0]);
//                 setFirstGoal(true)
//             }
//         } catch (error){
//             console.error('Error fetching user goals', error.message)
//         }
//     }
//     fetchUserGoals();
// }, [setSelectedGoal, setFirstGoal])


// const handleInputChange = (e) => {
//     const inputValue = e.target.value;
//     setValue('goalAmount', inputValue); // Update form value for 'goalAmount'
// };



console.log("Selected Goal", selectedGoal)

const onSubmit = async (data)=>{
    console.log(data)
    // navigate('/view-goal')
    // try{  
    //     if(!firstGoal){
    //         const response = await axios.post('/user/personal_goals', data);
    //         console.log('New goal created:, response.data');
    //         onSelected
    //     }else {
    //         const response = await axios.patch('/user/personal_goals/${selectedGoal.id}', data)
    //         console.log('Goal updated:', response.data);
    //         onSelectGoal(response.data)
    //     }
        // setEditing(false);
        setSelectedGoal(null)
    // } catch(error){
    //     console.error('Error saving goal:', error.message)
    // }
    const newDate = new Date(date)
    const newDateString = newDate.toISOString().slice(0, 10)
    const formJSON = {
        user_id: user.id,
        emoji: data.emoji,
        name: data.editedName,
        end_timeframe: newDateString,
        saving_target: data.saving_target,
    }
    console.log(formData)
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
    }
}

    useEffect(() => {
        console.log(selectedGoal);
    }, [selectedGoal]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container>
                <div className="goal-form-container">
                    <div>
                        <img className="arrow-back" src={ArrowBack} alt="ArrowBack" onClick={()=> navigate(-1)} />
                    </div>
                    <h1 className="goal-form-header">Tell us some more about your goal</h1>
                    <p className="goal-form-subtext">Let's go ahead and dive into the details!</p>
                    <div className="emoji-input-container">
                        <input className="emoji-input"
                            type="emoji"
                            {...register('emoji', { required: true })}
                            defaultValue={selectedGoal?.emoji}
                        />
                    </div>
                    <div className="goal-form-text-input">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Goal</InputLabel>
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
                        <TextField className="goal-form-text-field" {...register('editedName')} defaultValue={selectedGoal?.name}/>
                        {errors.saving_target && (<p style={{marginTop:"-2px", marginBottom: "-20px"}} className={errors.saving_target ? 'errorMessages' : ''}>{errors.saving_target.message}</p>)}
                        <TextField
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
                        {/* <DesktopDatePicker
                            label="Select deadline"
                            icon={<ArrowDropDown />}
                        /> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    label="Select a Date"
                                    value={date}
                                    onChange={(newValue) => setDate(newValue)}
                                    // {...register('timeframe')}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <Button 
                        onClick={() => setOpen(true)} 
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
                        type="submit" 
                        variant="contained"
                    >
                        Save Goal
                    </Button>
                    <Modal
                        open={open}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div 
                            className="modal-container" 
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
                            }}
                        >
                            <img 
                                className="modal-img" src={GoalCongrats} 
                                style={{
                                    width: "100px" ,
                                    display: "inline-block",
                                    height: "78.46",
                                    margin:"24px 0px 8px 0px"
                                }}
                            />            
                            <h1 
                                className="modal-header" 
                                style={{
                                    fontSize:"24px", 
                                    fontFamily:"TT Commons Bold",
                                    margin:"-10px 0px 0px 0px"
                                }}
                            >
                                Congratulations!
                            </h1>
                            <p 
                                className="modal-subtext" 
                                style={{
                                    margin:"0px 24px 8px 24px",
                                    lineHeight:"2",
                                    textAlign:"left", 
                                    fontSize:"16px"
                                }}
                            >
                                You have successfully created your goal!
                            </p>
                            <Button 
                                style={{
                                    width:"89%", 
                                    height:"15%", 
                                    marginLeft: '24px', 
                                    marginRight: '24px', 
                                    textTransform:"none"
                                }} 
                                onClick={() => handleClose()}
                                variant="contained"
                            >
                                    Close
                            </Button>
                        </div>                  
                    </Modal>
                </div>  
            </Container>
            <BottomNav />
        </form>
    )
}
