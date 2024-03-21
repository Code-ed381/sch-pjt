import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import feedbackImage from "../../assets/feedback3.jpg";
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

export default function Feedback() { 
  return (
    <>
        {/* <Card sx={{ maxWidth: '100vw' }}>
        <CardMedia
            component="img"
            alt="green iguana"
            height="500"
            image={feedbackImage}
        />
        </Card> */}
        <Container sx={{ mt: 9}}>
            <Paper elevation={3} sx={{ p: 9}}>
                <Typography variant="h3"><strong>Feedback</strong></Typography>
                    <TextField sx={{ minWidth: '50vw', my: 3}} my={2} id="outlined-basic" label="Email" variant="outlined" />
                    
                    <TextField
                        id="outlined-multiline-static"
                        label="Message"
                        multiline
                        rows={4}
                        sx={{ minWidth: '50vw'}}
                    />
            </Paper>
        </Container>
    </>


  );
}