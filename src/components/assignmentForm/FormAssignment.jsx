"use client";
import { useEffect, useState } from "react";
import Alert from "../Alert";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEmployees } from "@/context/myContext";

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
  const { loadAssignment } = useEmployees();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const dataAssignment = async () => {
        try {
          const response = await axios(`/api/assignment/${params.id}`);
          if (response.data) {
            const item = response.data;
            setEmployeeForm(item.idEmployee);
            setEquip(item.idEq);
            // Conversión de la fecha al formato YYYY-MM-DD
            const formattedDate = new Date(item.assignDate)
              .toISOString()
              .split("T")[0];
            setAssignDate(formattedDate);
            setDetails(item.details);
            setStatus(item.status);
          } else {
            console.log("No se encontraron datos para el id:", params.id);
          }
        } catch (error) {
          console.error("Error fetching assignment data:", error);
          setAlert({
            msg: "Error al recuperar los datos de mantenimiento",
            status: true,
            type: "error",
          });
        }
      };
      dataAssignment();
    }
  }, []);

  useEffect(() => {
    const dataEmployee = async () => {
      try {
        const response = await axios("/api/assignment");
        if (response.data) {
          setEmployees(response.data.employeesResult);
          setEquipment(response.data.equipmentResult);
        } else {
          console.error("No se pudieron obtener los datos");
        }
      } catch (error) {
        console.error("Error al realizar la solicitud a la API:", error);
      }
    };
    dataEmployee();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const setAlertMessage = (msg, status, type, timeout = 4000) => {
      setAlert({ msg, status, type });
      setTimeout(() => setAlert({ msg: "", status: false, type: "" }), timeout);
    };
    if ([idEmployee, idEq, assignDate, details, status].includes("")) {
      setAlert({ msg: "Los campos estan vacios", status: true, type: "error" });
      setTimeout(() => {
        setAlert({ msg: "", status: false, type: "" });
      }, 3000);
      return;
    }

    try {
      if (params.id) {
        await axios.put(`/api/assignment/${params.id}`, {
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
        setAlertMessage(
          "Los datos han sido actualizados",
          true,
          "success",
          2000
        );
        setTimeout(() => {
          router.push("/assignment");
          router.refresh();
        }, 2000);
      } else {
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
        setAlertMessage("Los datos han sido registrados", true, "success");
        await loadAssignment();
      }
    } catch (error) {
      console.error("Error during request:", error);
      setAlertMessage("Error durante la solicitud", true, "error");
    } finally {
      setEmployeeForm("");
      setEquip("");
      setAssignDate("");
      setDetails("");
      setStatus("");
    }
  };
  const handleReset = () => {
    setEmployeeForm("");
    setEquip("");
    setAssignDate("");
    setDetails("");
    setStatus("");
  };

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
            {employees?.map((item) => (
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
            {equipment?.map((item) => (
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
