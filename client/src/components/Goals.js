import React from 'react'
import { Container } from "@mui/system";
import { List, ListItem, Divider } from "@mui/material"
import ArrowForward from "../assets/arrow_forward.svg"

import './styles/Goals.css'
import { Picker } from 'emoji-mart'
import data from '@emoji-mart/data'

const goalsData = [
    {emoji: '🛳️', name: "Save up for a cruise"},
    {emoji: '✈️', name: "Save up for a vacation"},
    {emoji: '💰', name: "Have an emergency cushion"},
    {emoji: '🎉', name: "Save for a large purchase"},
    {emoji: '👨🏽‍🦳', name: "Build a nest egg"},
    {emoji: '✏️', name: "Create a unique goal"},

]   
export default function Goals({ onSelectGoal }) {


    return (
        <Container style={{width:"430px", height:"932px", flexGrow: "0", padding:"0 0 8px"}}>
                <h1 className="goals-header">What do you want Money Magnet to help you save for?</h1>
                <p className="goals-sub-header">Save for one of these goals, or set your own.</p>
                
                <div>
                    <List >
                        {goalsData.map((goal, index) => (
                            
                            <><ListItem style={{ paddingBottom: "15px" }} key={goal.name}>
                                <div className="emoji-container">
                                    <span role="img">{goal.emoji}</span>
                                </div>
                                <div className="goal-name-container">
                                    {goal.name}
                                </div>
                                <div className="goal-arrow-container">
                                    <img src={ArrowForward} style={{marginTop:"5px"}} alt="ArrowForward" />
                                </div>
                            </ListItem>
                            {index < goalsData.length - 1 && <Divider variant="middle" component="li" />}</>
                        ))}
                    </List>
                </div>

        </Container>
    )
}
