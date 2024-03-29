import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import feedbackImage from "../../../assets/feedback4.jpg";
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { createClient } from '@supabase/supabase-js';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Swal from 'sweetalert2'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const supabaseUrl = 'https://snvtwjqwiombpwqzizoe.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNudnR3anF3aW9tYnB3cXppem9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5NzUwNDcsImV4cCI6MjAyNjU1MTA0N30.frr4AozItNRzCyJTyHLkoGzg-CcN0uukd8-JMvw97bo"
const supabase = createClient(supabaseUrl, supabaseKey)


export default function Feedback() { 
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [content, setContent] = useState('');
    const [expanded, setExpanded] = React.useState(false);
    const [data, setData] = useState([]);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    }

    const getFeedback = async ()=> { 
        let { data: feedback, error } = await supabase
        .from('feedback')
        .select('*')
        
        if (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to retrieve customer",
                showConfirmButton: false,
                timer: 1500
            });
        }
        else {
            setData(feedback);
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        var isMounted = true
    
        getFeedback()
    
        return () => {
            isMounted = false
            controller.abort();
        }
    }, [])


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
        <div>
        {data.map((feedback)=> 
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography variant='h6' sx={{ width: '30%', flexShrink: 0 }}>
                    <strong>{feedback.name}</strong>
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{feedback.email} - {feedback.phone}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography variant='body2'>
                    {feedback.content}
                </Typography>   
                </AccordionDetails>
                <AccordionActions>
                <Button>Reply</Button>
                <Button color="error">Delete</Button>
                </AccordionActions>
            </Accordion>
        )}
    </div>
        </Container>
    </>


  );
}