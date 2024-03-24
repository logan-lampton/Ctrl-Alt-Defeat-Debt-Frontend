import {React, useContext} from 'react'
import { Container } from "@mui/system";
import { List, ListItem, Divider } from "@mui/material"
import ArrowForward from "../assets/arrow_forward.svg"
import './styles/Goals.css'
import Transactions from './Transactions';
import { UserContext } from "../context/UserContext";

export default function Insights() {

  const { user, setUser} = useContext(UserContext)
  
  const accessToken = user._access_token

    return (
        <Container style={{width:"430px", height:"932px", flexGrow: "0", padding:"0 0 8px"}}>

                <Transactions accessToken={accessToken} />
        </Container>
    )
}
