"use client";

import { createContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  

  //* Lo mande con use effect pq en la consola me tiraba
  //* error si lo inicializaba con el localStorage (pero funcionaba)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = JSON.parse(localStorage.getItem("token"));
      setUser(token);


      const admin = JSON.parse(localStorage.getItem("admin"));
      setIsAdmin(admin);
    }
  }, []);

  const loginUser = (token, admin) => {

    localStorage.setItem("token",JSON.stringify(token));
    setUser(token);
    getUser();
    console.log("User",user)


    localStorage.setItem("admin",JSON.stringify(admin));
    setIsAdmin(admin)
  };
  
  const getUser = () => {
    try {
      const decodedUser = jwt.decode(user);
      return decodedUser;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const signoutUser = () => {
    setUser('');
    setIsAdmin('');
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    document.cookie =
      "sessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; HttpOnly";
  };

  const userContextValue = {
    user,
    isAdmin,    
    loginUser,
    signoutUser,
    getUser,
  }

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
