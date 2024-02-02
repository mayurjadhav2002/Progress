import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { APIAwakeQuery } from "./APIAwakeQuery";
import { getProjectCounts } from "../Queries";
import axios from "axios";
import { toast } from "react-toastify";
// Create the context
const UserContext = createContext();

// Create the context provider component
export function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  const [accessToken, setAccessToken] = useState();
  const [loggedin, setLoggedin] = useState(false);
  const [APIAwake, setAPIAwake] = useState(false); // use to check whether the api endpoints working or not
  const [userActivityCount, setUserActivityCount] = useState([]);

  const HandleGetAPIStatus = async () => {
    try {
      if (Cookies.get("APIAwake")) {
        setAPIAwake(true);
      } else {
        APIAwakeQuery(APIAwake, setAPIAwake);
      }
    } catch (error) {
      console.error(
        "Unexpected Error from Application while checking API status",
        APIAwake
      );
    }
  };
  const HandleAccountDelete = () => {
    axios
      .delete(`/delete/${user._id}`)
      .then((response) => {
        toast.success("Account Deleted");
        console.log("Delete User Response:", response.data);
      })
      .then((E) => handleLogout)
      .catch((error) => {
        toast.errorr("Error deleting user, please contact us");
        console.error("Error deleting user:", error.response.data);
      });
  };
  const HandleAccountUpdate = async () => {
    axios
      .put(`/updateAccount/${user._id}`, user)
      .then(async(response) => {
        await setUser(response.data.data);
        Cookies.set('user', JSON.stringify(user));
        toast.success("Profile Updated");
      })
      .catch((error) => {
        toast.error("Error Updating the Profile");
      });
  };

  const navigate = useNavigate();

  useLayoutEffect(() => {
    handleLoggedin();
    HandleGetAPIStatus();
    // Check login status when component mounts
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const cookieTime = parseInt(Cookies.get("APIAwake"));
      const currentTime = new Date().getTime();

      if (currentTime - cookieTime > 3600000) {
        // Delete the cookie after one hour
        Cookies.remove("APIAwake");
        clearInterval(intervalId);
      }
    }, 3600000); // Check every minute (60000 milliseconds) for expiration

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const handleLoggedin = () => {
    try {
      const accessToken = Cookies.get("access_token");
      if (accessToken) {
        setLoggedin(true);
        const userCookie = Cookies.get("user");
        if (userCookie) {
          try {
            const parsedUserCookie = JSON.parse(userCookie);
            setUser(parsedUserCookie);
          } catch (parseError) {
            console.error("Error parsing userCookie:", parseError);
          }
        }
        setAccessToken(accessToken);
      } else {
        setLoggedin(false);
        // Redirect to the home page if not logged in
        navigate("/");
      }
    } catch (error) {
      console.error("Error in handleLoggedin:", error);
      throw new Error("Some Unexpected error occurred");
    }
  };



  const handleAccessToken = (props) => {
    try {
      if (props) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 31); // expires in 31 days

        Cookies.set("access_token", props.access_token, {
          expires: expirationDate,
        });
        setAccessToken(props.access_token);

        Cookies.set("user", JSON.stringify(props.user), {
          expires: expirationDate,
        });
        setUser(props.user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setLoggedin(false);
    setUser(null);
    setAccessToken(null);

    Cookies.remove("access_token");
    Cookies.remove("user");
    navigate("/");
  };

  // The context value should be an object
  const contextValue = {
    user,
    accessToken,
    loggedin,
    handleLoggedin,
    setUser,
    handleLogout,
    setAccessToken,
    handleAccessToken,
    APIAwake,
    userActivityCount,
    setUserActivityCount,
    HandleAccountDelete,
    HandleAccountUpdate,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

// Custom hook to use the context
export function useUserContext() {
  return useContext(UserContext);
}
