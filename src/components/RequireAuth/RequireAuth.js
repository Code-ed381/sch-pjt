import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../Hook/useAuth";
import LinearProgress from '@mui/material/LinearProgress';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://gyxpanwekhoqwqqzilhb.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5eHBhbndla2hvcXdxcXppbGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0MzM2MDksImV4cCI6MjA1NzAwOTYwOX0.M3agjTfQ0cIc5BgAYWmbV7IyMq7VhIX9ua5dz1PW40I"

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