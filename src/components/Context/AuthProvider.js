import { createContext, useState, useEffect } from "react";
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

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        let isMounted = true;
        const controller = new AbortController();

        const getUser = async ()=> {
            const {
                data: { session },
            } = await supabase.auth.getSession()
              
            if (session) {
                const { user } = session
                isMounted && setAuth(user)
            }
            setLoading(false)
        }

        getUser()

        return ()=> {
            controller.abort();
            isMounted = false
        };
    }, [])

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;