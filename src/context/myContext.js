import { createContext, useContext, useState } from "react";

const EmployeesContext = createContext();

export const EmployeesProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  return (
    <EmployeesContext.Provider
      value={{
        employees,
        setEmployees,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
};

export const useEmployes = () => useContext(EmployeesContext);
