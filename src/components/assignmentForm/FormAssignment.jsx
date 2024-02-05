"use client";
import { useEffect, useState } from "react";
import Alert from "../Alert";
import axios from "axios";
import { useRouter } from "next/navigation";

function FormAssignment() {
  const [employees, setEmployees] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [idEmployee, setEmployeeForm] = useState("");
  const [idEq, setEquip] = useState("");
  const [assignDate, setAssignDate] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("");
  const [alert, setAlert] = useState({
    msg: "",
    status: false,
    type: "",
  });

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([idEmployee, idEq, assignDate, details, status].includes("")) {
      setAlert({ msg: "Los campos estan vacios", status: true, type: "error" });
      setTimeout(() => {
        setAlert({ msg: "", status: false, type: "" });
      }, 3000);
      return;
    }
    try {
      await axios.post("/api/assignment", {
        idEmployee,
        idEq,
        assignDate,
        details,
        status,
      });
      await axios.post("/api/history", {
        idEmployee,
        idEq,
        dateEvent: assignDate,
        typeEvent: status,
        details,
      });
      setAlert({
        msg: "¡Éxito! Los datos han sido registrados",
        status: true,
        type: "success",
      });
      setTimeout(() => {
        setAlert({ msg: "", status: false, type: "" });
      }, 3000);
      setEmployeeForm("");
      setEquip("");
      setAssignDate("");
      setDetails("");
      setStatus("");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  const handleReset = () => {
    setEmployeeForm("");
    setEquip("");
    setAssignDate("");
    setDetails("");
    setStatus("");
  };
  useEffect(() => {
    const dataEmployee = async () => {
      try {
        const data = await axios("/api/assignment");
        setEmployees(data.data.employeesResult);
        setEquipment(data.data.equipmentResult);
      } catch (error) {
        console.log(error);
      }
    };
    dataEmployee();
  }, []);
  return (
    <form className="m-8 flex flex-col gap-5 uppercase" onSubmit={handleSubmit}>
      {alert.status && (
        <Alert
          message={alert.msg}
          type={alert.type === "error" ? "bg-red-500" : "bg-green-500"}
        />
      )}
      <div className="flex justify-between gap-5">
        <div className="w-full space-y-2">
          <label htmlFor="name" className="block w-full ">
            Empleado a asignar
          </label>
          <select
            name="employee"
            id="employee"
            className={`block w-full p-2 rounded-md bg-white`}
            style={{ fontFamily: "Roboto, sans-serif" }}
            value={idEmployee}
            onChange={(e) => setEmployeeForm(e.target.value)}
          >
            <option value="">-- Selecciona una opción --</option>
            {employees.map((item) => (
              <option value={item.id} key={item.id}>
                {`${item.name} ${item.firstName} ${item.lastName}`}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full space-y-2">
          <label htmlFor="equip" className="block w-full ">
            Equipo
          </label>
          <select
            name="equip"
            id="equip"
            className={`block w-full p-2 rounded-md bg-white`}
            style={{ fontFamily: "Roboto, sans-serif" }}
            value={idEq}
            onChange={(e) => setEquip(e.target.value)}
          >
            <option value="">-- Selecciona una opción --</option>
            {equipment.map((item) => (
              <option value={item.id} key={item.id}>
                {`${item.serialNumber} ${item.brand} ${item.model}`}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-between gap-5">
        <div className="w-full space-y-2">
          <label htmlFor="state" className="block w-full ">
            Estado del equipo
          </label>
          <select
            name="status"
            id="status"
            className={`block w-full p-2 rounded-md bg-white`}
            style={{ fontFamily: "Roboto, sans-serif" }}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">-- Selecciona una opción --</option>
            <option value="Reparación">En reparación</option>
            <option value="Devolución">Devolución</option>
            <option value="Asignado">Asignado</option>
          </select>
        </div>
        <div className="w-full space-y-2">
          <label htmlFor="dateAssign" className="block w-full">
            Fecha de asignación
          </label>
          <input
            type="date"
            name="dateAssign"
            id="dateAssign"
            className="block w-full p-2 rounded-md"
            value={assignDate}
            onChange={(e) => setAssignDate(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between gap-5">
        <div className="w-full space-y-2">
          <label htmlFor="lastname" className="block w-full">
            Detalles
          </label>
          <textarea
            className="block w-full p-2 h-24 resize-none"
            name="details"
            id="details"
            cols="30"
            rows="10"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end gap-5  p-4 bg-slate-100">
        <button
          className="w-40 p-2 hover:text-slate-700"
          type="button"
          onClick={handleReset}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="w-40 p-2 bg-black rounded-lg text-white hover:bg-slate-900"
        >
          Añadir
        </button>
      </div>
    </form>
  );
}

export default FormAssignment;
