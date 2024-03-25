import React, {useState, useContext, useEffect} from 'react'
import { useForm, Controller } from 'react-hook-form';
import {  TextField, Button, Modal } from "@mui/material";
import { Container } from '@mui/system'
import { UserContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom'
import ArrowBack from "../assets/arrow_back.svg"
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import ArrowDropDown from '../assets/arrow_drop_down.svg'
import BottomNav from './BottomNav'
import GoalCongrats from'../assets/GoalsCongrats.svg'
import './styles/GoalForm.css'
import AICall from './AICall';


export default function GoalForm({ setEditing }) {
    const { selectedGoal, setSelectedGoal } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [value, setValue ] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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


const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setValue('goalAmount', inputValue); // Update form value for 'goalAmount'
  };



console.log("Selected Goal", selectedGoal)

const onSubmit = async (data)=>{
    console.log(data)
    navigate('/view-goal')
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
        setEditing(false);
        setSelectedGoal(null)
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
                                pattern: {
                                value: /^[0-9]{10}$/,
                                message: 'Only digits please'
                                }
                            })}
                                                  
                        />
                        <DesktopDatePicker
                             label="Select deadline"
                             icon={<ArrowDropDown />}
                        />
                    </div>
                        <Button onClick={handleOpen} style={{position: "fixed", bottom: "129px",fontSize:"16px", textTransform:"none",width:"89%", marginLeft: '24px', marginRight: '24px'}} className="save-goal-button" type="submit" variant="contained" >Save Goal</Button>
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
                </div>  
            </Container>
            <BottomNav />
        </form>
    )
}
