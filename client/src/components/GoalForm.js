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


export default function GoalForm() {
    const { selectedGoal,
            setSelectedGoal,
            editing, 
            setEditing
            

    } = useContext(UserContext);

    const [value, setValue ] = useState(false);
    const[firstGoal, setFirstGoal] =useState(true)
    const navigate = useNavigate();
    const { register, handleSubmit, control, formState:{errors} } = useForm({
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



const onSubmit = async (data)=>{

  

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
        setEditing(false)
        navigate('/goal-invite')

    // } catch(error){
    //     console.error('Error saving goal:', error.message)
    // }
}

useEffect(() => {
    console.log(selectedGoal);
}, [selectedGoal]);

  
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <AICall />
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
                        <TextField className="goal-form-text-field" {...register('editedName', {required: "Goal Name Required."})} defaultValue={selectedGoal?.name}/>
                        {errors.saving_target && (<p style={{marginTop:"-2px", marginBottom: "-20px"}} className={errors.saving_target ? 'errorMessages' : ''}>{errors.saving_target.message}</p>)}
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
                                pattern: {
                                value: /^[0-9]{10}$/,
                                message: 'Only digits please'
                                }
                            })}
                                                  
                        />
                           <Controller
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
                                />
                    </div>
                        <Button onClick={onSubmit} style={{position: "fixed", bottom: "129px",fontSize:"16px", textTransform:"none",width:"89%", marginLeft: '24px', marginRight: '24px'}} className="save-goal-button" type="submit" variant="contained" >Next</Button>
                      
                </div>  
            </Container>
            <BottomNav />
        </form>
    )
}
