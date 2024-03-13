import { React, useState } from "react";
import Container from '@mui/material/Container';
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import home from "../assets/home.svg";
import goals from "../assets/goals.svg";
import insights from "../assets/insights.svg";
import accounts from "../assets/accounts.svg";





const BottomNav = () => {

    const [selected, setSelected] = useState("Home");

    const handleChange = (newValue) => {
        setSelected(newValue);
      };

    return(
        <BottomNavigation onChange={{handleChange}}>
        <BottomNavigationAction label="Home" value="home" icon={<img src={home}/>} />
        <BottomNavigationAction label="Goals" value="goals" icon={<img src={goals}/>} />
        <BottomNavigationAction label="Insights" value="insights" icon={<img src={insights}/>} />
        <BottomNavigationAction label="Accounts" value="accounts" icon={<img src={accounts}/>} />
      </BottomNavigation>
    )
}


export default BottomNav;