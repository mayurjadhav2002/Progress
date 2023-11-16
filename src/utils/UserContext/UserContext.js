import React, { createContext, useContext, useEffect, useState } from 'react';

import Cookies from 'js-cookie'
// Create the context
const UserContext = createContext();

// Create the context provider component
export function UserContextProvider({ children }) {
    const [user, setUser] = useState();
    const [accessToken, setAccessToken] = useState();
    const [loggedin, setLoggedin] = useState(false);

    useEffect(() => {
        handleLoggedin();
        
        // Check login status when component mounts
    }, []);

    const handleLoggedin = () => {
        try {
            if (Cookies.get('access_token')) {
                setLoggedin(true);
                const userCookie = JSON.parse(Cookies.get("user"));
                setUser(userCookie)
                setAccessToken(Cookies.get('access_token'))
            } else {
                setLoggedin(false);
            }
        } catch (error) {
            throw new Error("Some Unexpected error occurred");
        }
    };

    const handleAccessToken = (props) => {
        try {
          if (props) {
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 31); // expires in 31 days
      
            Cookies.set('access_token', props.access_token, { expires: expirationDate });
            setAccessToken(props.access_token);
      
            Cookies.set('user', JSON.stringify(props.user), { expires: expirationDate });
            setUser(props.user);
          }
        } catch (error) {
          console.error(error);
        }
      };
      
    // The context value should be an object
    const contextValue = {
        user,
        accessToken,
        loggedin,
        handleLoggedin,
        setUser,
        setAccessToken,
        handleAccessToken
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}

// Custom hook to use the context
export function useUserContext() {
    return useContext(UserContext);
}
