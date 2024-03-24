import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import { createClient } from '@supabase/supabase-js';
import Swal from 'sweetalert2'

const supabaseUrl = 'https://snvtwjqwiombpwqzizoe.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNudnR3anF3aW9tYnB3cXppem9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5NzUwNDcsImV4cCI6MjAyNjU1MTA0N30.frr4AozItNRzCyJTyHLkoGzg-CcN0uukd8-JMvw97bo"
const supabase = createClient(supabaseUrl, supabaseKey)


export default function Customers() { 
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [data, setData] = useState([]);

  const getCustomers = async ()=> {
    let { data: customers, error } = await supabase
    .from('customers')
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
        setData(customers)
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    var isMounted = true

    getCustomers()

    return () => {
        isMounted = false
        controller.abort();
    }
}, [])

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const handleSubmit = async (e)=> {
        e.preventDefault();

        const { data, error } = await supabase
        .from('customers')
        .insert([
        { 
            email: email, 
            phone: phone, 
            firstName: firstName, 
            lastName: lastName, 
            password: password, 
        },
        ])
        .select()

        if (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to add customer",
                showConfirmButton: false,
                timer: 1500
            });
        }
        else{
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Customer added successfully",
                showConfirmButton: false,
                timer: 1500
            });

            getCustomers();
            setFirstName('')
            setLastName('')
            setEmail('')
            setPhone('')
            setPassword('')
            handleClose();
        }

    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'firstName',
          headerName: 'First name',
          width: 150,
          editable: true,
        },
        {
          field: 'lastName',
          headerName: 'Last name',
          width: 150,
          editable: true,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 200,
          editable: true,
        },
        {
          field: 'phone',
          headerName: 'Phone Number',
          description: 'This column has a value getter and is not sortable.',
          sortable: true,
          width: 160,
        },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

  return (
    <>
        <Paper>
            <Typography variant="h3" m={9}><strong>Customers</strong></Typography>
        </Paper>
        <Container>
            <div class="container my-4">
                <Button startIcon={<AddIcon/>} variant='contained' onClick={handleOpen}> Add Customers</Button>
            </div>
            <div class="row">
                <Box sx={{ height: 400, width: '100%' }}>
                    {/* <DataGrid
                        rows={data}
                        columns={columns}
                        initialState={{
                        pagination: {
                            paginationModel: {
                            pageSize: 5,
                            },
                        },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    /> */}
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">Id</th>
                            <th scope="col">First name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Password</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user)=>
                                <tr>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.password}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Box>
            </div>
        </Container>


        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
          backdrop: {
              timeout: 500,
          },
          }}
      >
          <Fade in={open}>
          <Box sx={style}>
          <Stack
            component="form"
            mb={4}
            spacing={2}
            noValidate
            autoComplete="off"
        >
                
            <TextField id="outlined-basic" value={firstName} onChange={(e)=> setFirstName(e.target.value)} label="First name" variant="outlined" />
            <TextField id="outlined-basic" value={lastName} onChange={(e)=> setLastName(e.target.value)} label="Last name" variant="outlined"  />
            <TextField id="outlined-basic" value={email} onChange={(e)=> setEmail(e.target.value)} label="email" variant="outlined"  />
            <TextField id="outlined-basic" value={phone} onChange={(e)=> setPhone(e.target.value)} label="Phone Number" variant="outlined"  />
            <TextField id="outlined-basic" value={password} onChange={(e)=> setPassword(e.target.value)} label="Password" variant="outlined"  />
            

        </Stack>
  
              
              <div className="text-end">
                  <Button 
                      variant="contained"
                      onClick={handleSubmit}
                  >Add Customer</Button>
              </div>
          </Box>
          </Fade>
      </Modal> 
    </>
  );
}