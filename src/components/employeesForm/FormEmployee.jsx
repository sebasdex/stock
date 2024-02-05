"use client";
import { useEffect, useState } from "react";
import Alert from "../Alert";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
function FormEmployee() {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [charge, setCharge] = useState("");
  const [department, setDepartment] = useState("");
  const [alert, setAlert] = useState({
    msg: "",
    status: false,
    type: "",
  });

  const router = useRouter();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      [name, firstName, lastName, charge, department].some(
        (item) => item === ""
      )
    ) {
      setAlert({ msg: "Los campos estan vacios", status: true, type: "error" });
      setTimeout(() => {
        setAlert({ msg: "", status: false, type: "" });
      }, 3000);
      return;
    }
    if (params.id) {
      await axios.put(`/api/employees/${params.id}`, {
        name,
        firstName,
        lastName,
        charge,
        department,
      });
      setAlert({
        msg: "¡Éxito! Los datos han sido modificados",
        status: true,
        type: "success",
      });
      setTimeout(() => {
        setAlert({ msg: "", status: false, type: "" });
        router.push("/employees");
        setName("");
        setFirstName("");
        setLastName("");
        setCharge("");
        setDepartment("");
        router.refresh();
      }, 2000);
      return;
    }
    await axios.post("/api/employees", {
      name,
      firstName,
      lastName,
      charge,
      department,
    });
    setAlert({
      msg: "¡Éxito! Los datos han sido registrados",
      status: true,
      type: "success",
    });
    setTimeout(() => {
      setAlert({ msg: "", status: false, type: "" });
    }, 3000);
    setName("");
    setFirstName("");
    setLastName("");
    setCharge("");
    setDepartment("");
    router.refresh();
  };
  const handleCancel = () => {
    setName("");
    setFirstName("");
    setLastName("");
    setCharge("");
    setDepartment("");
  };

  useEffect(() => {
    const dataForm = async () => {
      try {
        if (params.id) {
          const response = await axios(`/api/employees/${params.id}`);
          const result = response.data.map((item) => {
            setName(item.name),
              setFirstName(item.firstName),
              setLastName(item.lastName),
              setCharge(item.charge),
              setDepartment(item.department);
          });
          return result;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    dataForm();
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
            Nombre
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full p-2 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full space-y-2">
          <label htmlFor="firstname" className="block w-full">
            Primer Apellido
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            className="block w-full p-2 rounded-md"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="w-full space-y-2">
          <label htmlFor="lastname" className="block w-full">
            Segundo Apellido
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            className="block w-full p-2 rounded-md"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between gap-5">
        <div className="w-full space-y-2">
          <label htmlFor="charge" className="w-full">
            Cargo
          </label>
          <input
            type="text"
            name="charge"
            id="charge"
            className="block w-full p-2 rounded-md"
            value={charge}
            onChange={(e) => setCharge(e.target.value)}
          />
        </div>
        <div className="w-full space-y-2">
          <label htmlFor="department">Departamento</label>
          <select
            name="department"
            id="department"
            className={`block w-full p-2 rounded-md bg-white`}
            style={{ fontFamily: "Roboto, sans-serif" }}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">-- Selecciona una opción --</option>
            <option value="contabilidad">Contabilidad</option>
            <option value="recursos humanos">Recursos Humanos</option>
            <option value="mercadotecnia">Mercadotecnia</option>
            <option value="diseño">Diseño</option>
            <option value="tecnologías">Tecnologías de la información</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-5  p-4 bg-slate-100">
        <button
          type="button"
          className="w-40 p-2 hover:text-slate-700"
          onClick={handleCancel}
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

export default FormEmployee;
