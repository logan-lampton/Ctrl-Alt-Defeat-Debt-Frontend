import React, { useContext } from "react";
import Container from "@mui/material/Container";
import logo from "../assets/logo.svg";
import account from "../assets/account.svg";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const AppHeader = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(UserContext);

    const handleLogoClick = () => {
        if (isAuthenticated) {
            navigate("/home");
        }
    };

    console.log(isAuthenticated);

    return (
        <Container>
            <header className='app-header'>
                <img className='icons' src={account} alt='icon'></img>
                <img
                    className='center-logo icons'
                    src={logo}
                    alt='logo'
                    onClick={handleLogoClick}
                ></img>
            </header>
        </Container>
    );
};

export default AppHeader;
