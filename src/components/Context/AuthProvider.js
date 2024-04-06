import { createContext, useState, useEffect } from "react";
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