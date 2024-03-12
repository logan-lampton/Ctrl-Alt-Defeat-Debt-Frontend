import { React } from "react";
import Container from '@mui/material/Container';
import logo from "../assets/logo.svg"
import account from "../assets/account.svg"

const AppHeader = () => {


return (
   <Container>
      <header className="app-header">
      <img className="icons" src={account}alt="icon"></img> 
      <img className="center-logo icons" src={logo} alt="logo"></img>
    </header>
      </Container>
      



)
}



export default AppHeader;