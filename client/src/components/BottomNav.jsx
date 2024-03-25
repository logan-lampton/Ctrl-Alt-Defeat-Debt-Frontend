import { React, useState } from "react";
import Container from '@mui/material/Container';
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import home from "../assets/home.svg";
import goals from "../assets/goals.svg";
import insights from "../assets/insights.svg";
import accounts from "../assets/accounts.svg";
import { useNavigate } from 'react-router-dom'

const BottomNav = () => {

    const navigate = useNavigate();
    const [selected, setSelected] = useState("Home");

   
    const handleNavigation = (newValue) => {
      setSelected(newValue);

      switch(newValue){
        case 'home':
            navigate('/home');
            break;
        case 'goals':
            navigate('/goals');
            break;
        case 'insights':
            navigate('/insights')
            break;
        // case 'group':
        //     navigate('/group')
        default:
            break;
      }
    }

    return(
        <BottomNavigation onChange={(event, newValue) => {
            handleNavigation(newValue)
            console.log(newValue)

          }} value={selected}>

          <BottomNavigationAction label="Home" value="home" icon={<img src={home}/>} />
          <BottomNavigationAction label="Goals" value="goals" icon={<img src={goals}/>} />
          <BottomNavigationAction label="Insights" value="insights" icon={<img src={insights}/>} />
          <BottomNavigationAction label="Accounts" value="accounts" icon={<img src={accounts}/>} />
      </BottomNavigation>
    )
}


export default BottomNav;