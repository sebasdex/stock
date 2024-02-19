import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const EmployeesContext = createContext();
export const EmployeesProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  // Función para cargar los datos de los empleados
  const loadEmployees = async () => {
    try {
      const response = await axios("/api/employees");
      const data = await response.data;
      setEmployees(data);
    } catch (error) {
      console.error(error);
    }
  };
  // Función para cargar los datos de los equipos
  const loadEquipment = async () => {
    try {
      const response = await axios("/api/equipments");
      const data = await response.data;
      setEquipment(data);
    } catch (error) {
      console.error(error);
    }
  };
  // Función para cargar los datos de los mantenimientos
  const loadMaintenance = async () => {
    try {
      const response = await axios("/api/maintenance");
      const data = await response.data.dataMaintenance;
      setMaintenance(data);
    } catch (error) {
      console.error(error);
    }
  };
  // Provider
  return (
    <EmployeesContext.Provider
      value={{
        employees,
        setEmployees,
        loadEmployees,
        loadEquipment,
        loadMaintenance,
        equipment,
        maintenance,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
};

export const useEmployees = () => useContext(EmployeesContext);
