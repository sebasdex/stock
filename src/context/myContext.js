import { createContext, useContext, useState } from "react";

const EmployeesContext = createContext();

export const EmployeesProvider = ({ children }) => {
  return (
    <EmployeesContext.Provider value={{}}>{children}</EmployeesContext.Provider>
  );
};

export const useEmployes = () => useContext(EmployeesContext);
