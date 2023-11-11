import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Create the context provider component
export function UserContextProvider({ children }) {
    const [user, setUser] = useState();
    const [accessToken, setAccessToken] = useState();
    const [loggedin, setLoggedin] = useState(false);

    const handleLoggedin = () => {
        try {
            setLoggedin(!loggedin);
        } catch (error) {
            throw new Error("Some Unexpected error occurred");
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
