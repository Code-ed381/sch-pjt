import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../Hook/useAuth";
import LinearProgress from '@mui/material/LinearProgress';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://hbvzbmargzwrfctmqqtd.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhidnpibWFyZ3p3cmZjdG1xcXRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI0MjYyOTksImV4cCI6MjAyODAwMjI5OX0.6cUMpEa6jksCGMNbgw3vaz-4KkkduiqDWZEgPr0-8Ys"

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