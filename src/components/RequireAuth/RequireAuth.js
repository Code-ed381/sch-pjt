import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../Hook/useAuth";
import LinearProgress from '@mui/material/LinearProgress';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://snvtwjqwiombpwqzizoe.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNudnR3anF3aW9tYnB3cXppem9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5NzUwNDcsImV4cCI6MjAyNjU1MTA0N30.frr4AozItNRzCyJTyHLkoGzg-CcN0uukd8-JMvw97bo"

const supabase = createClient(supabaseUrl, supabaseKey, {
    db: {
        schema: 'public',
    },
    auth: {
        autoRefreshToken: true,
        persistSession: true,
    }
})

const RequireAuth = () => {
    const { auth, setAuth, loading, setLoading } = useAuth();
    const location = useLocation();

    let navigate = useNavigate();

    useEffect(()=> {
        let isMounted = true;
        const controller = new AbortController();

        async function getUser() {
            const {
                data: { session },
            } = await supabase.auth.getSession()
              
            
            if (session) {
                const { user } = session
                
                setLoading(false)

                isMounted && setAuth(user)
            }
            else{
                navigate('/login')
            }

        }

        getUser()

        return ()=> {
            controller.abort();
            isMounted = false
        };
    }, [])

    return (
        loading ? <LinearProgress sx={{m: 20}}/> : <Outlet /> 
    );
}

export default RequireAuth;