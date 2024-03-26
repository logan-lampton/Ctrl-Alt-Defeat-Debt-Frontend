// import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../context/UserContext";
import {
  Typography,
  Container,
  Divider,
  SvgIcon,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "@mui/material";
import Box from "@mui/material/Box";
// import {ReactComponent as BackBtn} from "../assets/arrow_back.svg";
import plaidIcon from "../assets/plaid_icon.png";

const Accounts = () => {
  const { accessToken } = useContext(UserContext);
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchAccounts = async () => {
      if (!accessToken)
        return;
      
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch('/plaid/get_accounts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ access_token: accessToken }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Accounts: ", data.accounts)
        setAccounts(data.accounts)
      } catch (error) {
        setError('Failed to fetch accounts');
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAccounts();
  }, [accessToken]);

  console.log("State of accounts: ", accounts)

  if (isLoading) return <div>Loading accounts...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <Container>
      <Box component='header' sx={{mt:'24px', mb: '20px', mx: '24px'}}>
      {/* <SvgIcon component={BackBtn} onClick={() => navigate('/home')} /> */}
        <Typography variant='h4' 
          sx={{fontFamily: "TT Commons",
            color: "Black",
            fontWeight: "bold"}}>
              Your connected accounts
        </Typography>
        </Box>
        <List sx={{maxHeight: '650px', overflowY: 'auto', mx: '24px', px: '16px', py:"16px", border: 1, borderRadius: '8px', borderColor: 'grey.500' }} >
          <Typography sx={{color: 'ccc', fontFamily: 'TT Commons Regular'}}>Connected Accounts</Typography>
          {accounts.map((account, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Plaid Icon" src={plaidIcon} />
                </ListItemAvatar>
                <ListItemText primary={
                                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                  <Typography sx={{fontFamily: 'TT Commons Bold'}}>
                                    {account.name} 
                                  </Typography>
                                  <Typography sx={{fontFamily: 'TT Commons Regular', fontSize: '20px'}}>
                                    ${account.balances.available || account.balances.current}
                                  </Typography>
                                </Box>
                                }
                              secondary={account.mask }
                  >
                </ListItemText>
              </ListItem>
              {index < accounts.length -1 &&
                <Divider component="li" sx={{backgroundColor: "var(--gray-3)"}} />}
            </React.Fragment>
          ))}
        </List>
    </Container>
  );
};

export default Accounts;
