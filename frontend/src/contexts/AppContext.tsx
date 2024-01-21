import React, { ReactNode, createContext, useContext } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
type ToastMessage = {
    message: string;
    type: "SUCCESS"  | "ERROR"
}

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean
};
const AppContext = React.createContext<AppContext | undefined>(undefined)

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  }); // A function to manually refetch the query.
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          console.log(toastMessage);
        },
        isLoggedIn: !isError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
    
    const context = useContext(AppContext);
    return context as AppContext;
    // const showToast = useContext(AppContext)
    // if (showToast === undefined) {
    //     return "Toast cannot bu undefined"
    // }
    // return showToast;
}