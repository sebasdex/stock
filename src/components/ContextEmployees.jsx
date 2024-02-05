"use client";
import { EmployeesProvider } from "@/context/myContext";
import Section from "./Section";
import Sidebar from "./Sidebar";

function ContextEmployees({ children }) {
  return (
    <EmployeesProvider>
      <Sidebar />
      <Section children={children} />
    </EmployeesProvider>
  );
}

export default ContextEmployees;