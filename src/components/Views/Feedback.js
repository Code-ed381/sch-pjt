import React, {useState} from 'react';
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
import { createClient } from '@supabase/supabase-js';
import Swal from 'sweetalert2'


const supabaseUrl = 'https://snvtwjqwiombpwqzizoe.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNudnR3anF3aW9tYnB3cXppem9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5NzUwNDcsImV4cCI6MjAyNjU1MTA0N30.frr4AozItNRzCyJTyHLkoGzg-CcN0uukd8-JMvw97bo"
const supabase = createClient(supabaseUrl, supabaseKey)


export default function Feedback() { 
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [content, setContent] = useState('');


    const handleSubmit = async (e)=> {
        e.preventDefault();

        const { data, error } = await supabase
        .from('feedback')
        .insert([
        { 
            email: email, 
            phone: phone, 
            content: content, 
        },
        ])
        .select()

        if (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to send feedback",
                showConfirmButton: false,
                timer: 1500
            });
        }
        else{
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your feedbank was sent",
                showConfirmButton: false,
                timer: 1500
            });

            setContent('')
            setEmail('')
            setPhone('')
        }

    }



  return (
    <>
        <Paper>
            <Typography variant="h3" m={9}><strong>Feedback</strong></Typography>
        </Paper>
        <Container>
        <div class="row">
            <div class="col-sm">
                <Stack
                    component="form"
                    mb={2}
                    spacing={2}
                    noValidate
                    autoComplete="off"
                >
                        
                    <TextField id="outlined-basic" value={email} onChange={(e)=> setEmail(e.target.value)} label="Email" variant="outlined" />

                    <TextField id="outlined-basic" value={phone} onChange={(e)=> setPhone(e.target.value)} label="Phone Number" variant="outlined" />
                    
                    <TextField
                        id="outlined-multiline-static"
                        label="Message"
                        multiline
                        rows={8}
                        onChange={(e)=> setContent(e.target.value)}
                        value={content}
                    />
                </Stack>
                <Button variant="contained" size="large" endIcon={<SendIcon />} onClick={handleSubmit}>
                    Send 
                </Button>
            </div>
            <div class="col-sm">
                <div class='m-4'>
                    <Typography variant="h5" mb={2}><strong>Contact us</strong></Typography>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Email: </strong></li>
                        <li class="list-group-item"><strong>Phone: </strong></li>
                        <li class="list-group-item"><strong>Address: </strong></li>
                        {/* <li class="list-group-item"><strong></strong></li>
                        <li class="list-group-item"><strong></strong></li> */}
                    </ul>
                </div>
            </div>
        </div>
        </Container>
    </>


  );
}