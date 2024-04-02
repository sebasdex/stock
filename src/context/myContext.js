import { createContext, useContext, useState } from "react";
import axios from "axios";
const EmployeesContext = createContext();
export const EmployeesProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [assignment, setAssignment] = useState([]);
  const [history, setHistory] = useState([]);
  // Función para cargar los datos de los empleados
  const loadEmployees = async () => {
    try {
      const response = await axios("/api/employees");
      const data = await response.data[0];
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
  // Función para cargar los datos de las asignaciones
  const loadAssignment = async () => {
    try {
      const response = await axios("/api/assignment");
      const data = await response.data.assignmentData;
      setAssignment(data);
    } catch (error) {
      console.error(error);
    }
  };
  // Función para cargar los datos de la historial
  const loadHistory = async () => {
    try {
      const response = await axios("/api/history");
      const data = await response.data;
      setHistory(data.historyD);
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
        loadAssignment,
        loadHistory,
        equipment,
        maintenance,
        assignment,
        history,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
};

export const useEmployees = () => useContext(EmployeesContext);
