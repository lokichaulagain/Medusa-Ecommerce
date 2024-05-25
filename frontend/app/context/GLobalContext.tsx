"use client"
import { useEffect, createContext, useState } from "react";
import { AxiosInstance } from "../(repositories)/config";

export const GlobalContext = createContext(
  { currentUser: {} } as { currentUser: any }
);

export const GlobalContextProvider = ({ children }:any) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const tokenExist = localStorage.getItem("accessToken");
        console.log(tokenExist)





        if (tokenExist) {
          
          const res = await AxiosInstance.get("/users/get-user-from-token/pass-token-in-header");
          console.log(res,"currentUSer availabel")
          res && setCurrentUser(res.data.data);
        }

 
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrentUser();
  }, []);

  console.log(currentUser);

  return <GlobalContext.Provider value={{ currentUser }}>{children}</GlobalContext.Provider>;
};