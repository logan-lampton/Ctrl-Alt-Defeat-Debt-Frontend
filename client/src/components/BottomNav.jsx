import { React } from "react";
import Container from '@mui/material/Container';
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import home from "../assets/home.svg";
const BottomNav = () => {



    return(
        <BottomNavigation>
        <BottomNavigationAction label="Home" icon={<img src={home}/>} />
        <BottomNavigationAction label="Goals" icon={<img src={home}/>} />
        <BottomNavigationAction label="Insights" icon={<img src={home}/>} />
        <BottomNavigationAction label="Accounts" icon={<img src={home}/>} />
      </BottomNavigation>
    )
}


export default BottomNav;