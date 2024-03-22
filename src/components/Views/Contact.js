import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import feedbackImage from "../../assets/feedback4.jpg";
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';



export default function Contact() { 
  return (
    <>

        <Paper>
            <Typography variant="h3" m={9}><strong>Contact</strong></Typography>
        </Paper>
        <Container>
            <div class="container">
                <Button startIcon={<AddIcon/>} variant='contained'></Button>
            </div>
            <div class="row">
                <div class="col-sm">
                
                </div>
                <div class="col-sm">
                One of three columns
                </div>
            </div>
        </Container>
    </>


  );
}