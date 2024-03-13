import React from 'react'
import {Container, Typography, TextField, Button} from '@mui/material'


export default function PhoneForm(props) {
    


    return (
        <div>
            <Typography>
                <h1>Let's get started</h1>
            </Typography>
            <TextField id="outlined-basic" label="Mobile Phone Number" variant="outlined" />
            <TextField id="outlined-basic" label="Email" variant="outlined" />
            <TextField id="outlined-basic" label="Password" variant="outlined" />
            <TextField id="outlined-basic" label="Password" variant="outlined" />
            <Button variant="contained" size="small">Get Started</Button>


        </div>
    )
}
