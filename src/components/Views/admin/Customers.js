import React, { useState, useEffect, useRef} from 'react';
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
import Swal from 'sweetalert2';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

const supabaseUrl = 'https://hbvzbmargzwrfctmqqtd.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhidnpibWFyZ3p3cmZjdG1xcXRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI0MjYyOTksImV4cCI6MjAyODAwMjI5OX0.6cUMpEa6jksCGMNbgw3vaz-4KkkduiqDWZEgPr0-8Ys"
const supabase = createClient(supabaseUrl, supabaseKey)

const USER_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ'-]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_REGEX = /^(?:\+\d{12}|\d{10})$/;

export default function Customers() { 
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [data, setData] = useState([]);
    const userRef = useRef();
    const errRef = useRef();


    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [validFirstName, setValidFirstName] = useState(false);
    const [userOneFocus, setUserOneFocus] = useState(false);

    const [validLastName, setValidLastName] = useState(false);
    const [userTwoFocus, setUserTwoFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
  
    const [phone, setPhone] = useState(null);
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [errMsg, setErrMsg] = useState(false);

    

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

        if (validFirstName && validLastName && validEmail && validPhone && validPwd ) {
            const { data, error } = await supabase
            .from('customers')
            .insert([
            { 
                email: email, 
                phone: phone, 
                first_name: firstName, 
                last_name: lastName, 
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

                console.log(error)
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
        else {
            setErrMsg('Ensure all fields are filled with appropriate details');
        }


    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'first_name',
          headerName: 'First name',
          width: 150,
          editable: true,
        },
        {
          field: 'last_name',
          headerName: 'Last name',
          width: 150,
          editable: true,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 250,
          editable: true,
        },
        {
          field: 'phone',
          headerName: 'Phone Number',
          sortable: true,
          width: 200,
        },
        {
            field: 'password',
            headerName: 'Password',
            sortable: true,
            width: 200,
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

    // useEffect(() => {
    //     userRef.current.focus()
    // }, [])
    
    useEffect(() => {
        const result = USER_REGEX.test(firstName);
        setValidFirstName(result)
    }, [firstName])

    useEffect(() => {
        const result = USER_REGEX.test(lastName);
        setValidLastName(result)
    }, [lastName])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        const result = PHONE_REGEX.test(phone);
        setValidPhone(result)
    }, [phone])

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPwd(result);
    }, [password])

    useEffect(() => {
        setErrMsg('')
    }, [ password, phone, email, firstName, lastName])

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
                <Box sx={{ height: 700, width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        initialState={{
                        pagination: {
                            paginationModel: {
                            pageSize: 10,
                            },
                        },
                        }}
                        pageSizeOptions={[10]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                    {/* <table class="table">
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
                    </table> */}
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
                
            {/* <TextField id="outlined-basic" value={firstName} onChange={(e)=> setFirstName(e.target.value)} label="First name" variant="outlined" />
            <TextField id="outlined-basic" value={lastName} onChange={(e)=> setLastName(e.target.value)} label="Last name" variant="outlined"  />
            <TextField id="outlined-basic" value={email} onChange={(e)=> setEmail(e.target.value)} label="email" variant="outlined"  />
            <TextField id="outlined-basic" value={phone} onChange={(e)=> setPhone(e.target.value)} label="Phone Number" variant="outlined"  />
            <TextField id="outlined-basic" value={password} onChange={(e)=> setPassword(e.target.value)} label="Password" variant="outlined"  /> */}

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                { errMsg ? 
                        <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
                        {errMsg}
                        </Alert> :
                        ""          
                    }
                </Grid>
              <Grid item xs={12}>
                <div class="form-floating">
                  <input 
                    type="text" 
                    required
                    ref={userRef}
                    class={validFirstName ? "form-control is-valid" : "form-control" && !firstName ? "form-control": "form-control is-invalid"}
                    id="floatingInput" 
                    placeholder="John"
                    autoComplete="off"
                    onChange={(e) => { 
                        setFirstName(e.target.value)
                    }}
                    aria-invalid = {validFirstName ? "false" : "true"}
                    aria-describedby = "uidnote"
                    onFocus = {()=> setUserOneFocus(true)}
                    onBlur = {()=> setUserOneFocus(false)}
                    value={firstName}
                  />
                  <label for="floatingInput">First name</label>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div class="form-floating">
                  <input 
                    type="text" 
                    required
                    ref={userRef}
                    class={validLastName ? "form-control is-valid" : "form-control" && !lastName ? "form-control": "form-control is-invalid"}
                    id="floatingInput" 
                    placeholder="Doe"
                    autoComplete="off"
                    onChange={(e) => { 
                        setLastName(e.target.value)
                    }}
                    aria-invalid = {validLastName ? "false" : "true"}
                    aria-describedby = "uidnote"
                    onFocus = {()=> setUserTwoFocus(true)}
                    onBlur = {()=> setUserTwoFocus(false)}
                    value={lastName}
                  />
                  <label for="floatingInput">Last name</label>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div class="form-floating">
                  <input 
                    class={validEmail ? "form-control is-valid" : "form-control" && !email ? "form-control": "form-control is-invalid"}
                    type="text" 
                    required
                    placeholder = "Email"
                    autoComplete = "off" 
                    onChange={(e) => { 
                        setEmail(e.target.value)
                    }}
                    aria-invalid = {validEmail ? "false" : "true"}
                    aria-describedby = "emailnote"
                    id="floatingInput" 
                    value={email}
                  />
                  <label for="floatingInput">Email address</label>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div class="form-floating">
                  <input 
                    class={validPhone ? "form-control is-valid" : "form-control" && !phone ? "form-control": "form-control is-invalid"}
                    type="phone" 
                    required
                    placeholder = "Phone"
                    autoComplete = "off" 
                    onChange={(e) => { 
                        setPhone(e.target.value)
                    }}
                    aria-invalid = {validPhone ? "false" : "true"}
                    aria-describedby = "emailnote"
                    id="floatingInput" 
                    value={phone}
                    onFocus = {()=> setPhoneFocus(true)}
                    onBlur = {()=> setPhoneFocus(false)}
                  />
                  <label for="floatingInput">Phone</label>
                  <p id="uidnote" className={userOneFocus && phone && !validPhone ? "instructions": "offscreen"}>
                    <i class="ti-info-alt" style={{margin: '5px'}}></i>
                    e.g. +233 23XXXXXXX<br/>
                    <br/>
                    
                  </p>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div class="form-floating">
                  <input 
                    class={validPwd ? "form-control is-valid" : "form-control" && !password ? "form-control": "form-control is-invalid"}
                    type='text'
                    required 
                    placeholder="Password"
                    onChange={(e) => { 
                        setPassword(e.target.value)
                    }}
                    onFocus = {()=> setPwdFocus(true)}
                    onBlur = {()=> setPwdFocus(false)}
                    id="floatingInput" 
                    value={password}
                  />
                  <label for="floatingInput">Password</label>
                  <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions": "offscreen"}>
                    <i class="ti-info-alt" style={{margin: '5px'}}></i>
                      8 to 24 characters.<br/>
                    Must include uppercase and lowercase letters,<br/>
                    a number and a special character.<br/>
                    Allowed special characters: ! @ # $ %
                  </p>
                </div>
              </Grid>
              {/* <Grid item xs={12}>
                <div class="form-check">
                  <input 
                    class="form-check-input" 
                    type="checkbox" value="" 
                    id="flexCheckDefault" 
                    onClick={handleReveal}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <small>show password</small>
                  </label>
                </div>
              </Grid> */}
            </Grid>
            
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
          </Box>
              
              <div className="text-end">
                  <Button 
                      variant="contained"
                      onClick={handleSubmit}
                  >Add Customer</Button>
              </div>
            

        </Stack>
  
          </Box>
          </Fade>
      </Modal> 
    </>
  );
}