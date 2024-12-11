import Cookies from "js-cookie";
import { createContext, useContext } from "react";
import { Toaster } from "@/components/ui/toaster";

const GlobalContext = createContext();

// eslint-disable-next-line react/prop-types
export const GlobalProvider = ({ children }) => {
  const user = Cookies.get("user");
  return (
    <GlobalContext.Provider value={{ user }}>
      {children} <Toaster />
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobal = () => {
  return useContext(GlobalContext);
};
