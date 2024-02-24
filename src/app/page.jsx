"use client";
import TableH from "@/components/history/TableH";
import { useEffect } from "react";
import { useEmployees } from "@/context/myContext";

function dashboard() {
  const {
    employees,
    loadEmployees,
    equipment,
    loadEquipment,
    loadMaintenance,
    loadAssignment,
    maintenance,
    assignment,
  } = useEmployees();
  useEffect(() => {
    const getEmployees = async () => {
      await loadEmployees();
      await loadEquipment();
      await loadMaintenance();
      await loadAssignment();
    };
    getEmployees();
  }, []);
  return (
    <>
      <section className="grid grid-cols-4 gap-5">
        <article className="col-span-4 bg-black rounded-md text-white p-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold uppercase">
              Bienvenido a tus inventarios
            </h1>
            <p className="w-96 mt-2">
              Aquí puedes gestionar la información de tus equipos, Empleados,
              Mantenimientos y Asignaciones
            </p>
          </div>
          <span className="material-symbols-outlined text-5xl">info</span>
        </article>
        <article className="text-center bg-white rounded-md p-4">
          <span className="material-symbols-outlined text-white bg-black rounded-full p-2">
            groups
          </span>
          <p className="text-lg font-bold">
            Empleados
            <span className="block font-semibold">{employees.length}</span>
          </p>
        </article>
        <article className="text-center bg-white rounded-md p-4">
          <span className="material-symbols-outlined text-white bg-black rounded-full p-2">
            computer
          </span>
          <p className="text-lg font-bold">
            Equipos
            <span className="block font-semibold">{equipment.length}</span>
          </p>
        </article>
        <article className="text-center bg-white rounded-md p-4">
          <span className="material-symbols-outlined text-white bg-black rounded-full p-2">
            engineering
          </span>
          <p className="text-lg font-bold">
            Mantenimientos
            <span className="block font-semibold">{maintenance.length}</span>
          </p>
        </article>
        <article className="text-center bg-white rounded-md p-4">
          <span className="material-symbols-outlined text-white bg-black rounded-full p-2">
            assignment
          </span>
          <p className="text-lg font-bold">
            Asignaciones
            <span className="block font-semibold">{assignment.length}</span>
          </p>
        </article>
      </section>
      <TableH />
    </>
  );
}

export default dashboard;
