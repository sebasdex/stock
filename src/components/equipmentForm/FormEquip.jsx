"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useEmployees } from "@/context/myContext";
import Alert from "../Alert";
import axios from "axios";
function FormEquip() {
  const [eqType, setTypeEq] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialN] = useState("");
  const [alert, setAlert] = useState({
    msg: "",
    status: false,
    type: "",
  });
  const router = useRouter();
  const params = useParams();
  const { loadEquipment } = useEmployees();

  useEffect(() => {
    const dataEquip = async () => {
      try {
        if (params.id) {
          const result = await axios(`/api/equipments/${params.id}`);
          return result.data.map((item) => {
            setTypeEq(item.eqType),
              setBrand(item.brand),
              setModel(item.model),
              setSerialN(item.serialNumber);
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    dataEquip();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([eqType, brand, model, serialNumber].includes("")) {
      setAlert({
        msg: "Los campos estan vacios",
        status: true,
        type: "error",
      });
      setTimeout(() => {
        setAlert({
          msg: "",
          status: false,
          type: "",
        });
      }, 3000);
      return;
    }
    if (params.id) {
      await axios.put(`/api/equipments/${params.id}`, {
        eqType,
        brand,
        model,
        serialNumber,
      });
      setAlert({
        msg: "Los datos han sido modificados",
        status: true,
        type: "success",
      });
      setTimeout(() => {
        setAlert({
          msg: "",
          status: false,
          type: "",
        });
        router.push("/equipment");
        router.refresh();
      }, 2000);

      return;
    }
    await axios.post("/api/equipments", {
      eqType,
      brand,
      model,
      serialNumber,
    });
    setAlert({
      msg: "Los datos han sido registrados",
      status: true,
      type: "success",
    });
    await loadEquipment();
    setTimeout(() => {
      setAlert({
        msg: "",
        status: false,
        type: "",
      });
    }, 4000);
    setTypeEq("");
    setBrand("");
    setModel("");
    setSerialN("");
    router.refresh();
  };
  const handleReset = () => {
    setTypeEq("");
    setBrand("");
    setModel("");
    setSerialN("");
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
            Tipo de equipo
          </label>
          <select
            name="eqType"
            id="eqType"
            className={`block w-full p-2 rounded-md bg-white`}
            style={{ fontFamily: "Roboto, sans-serif" }}
            value={eqType}
            onChange={(e) => setTypeEq(e.target.value)}
          >
            <option value="">-- Selecciona una opción --</option>
            <option value="Laptop">Laptop</option>
            <option value="PC Escritorio">PC Escritorio</option>
            <option value="Impresora">Impresora</option>
            <option value="Escaner">Escaner</option>
          </select>
        </div>
        <div className="w-full space-y-2">
          <label htmlFor="lastname" className="block w-full">
            Marca
          </label>
          <input
            type="text"
            name="brand"
            id="brand"
            className="block w-full p-2 rounded-md"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between gap-5">
        <div className="w-full space-y-2">
          <label htmlFor="model" className="block w-full">
            Modelo
          </label>
          <input
            type="text"
            name="model"
            id="model"
            className="block w-full p-2 rounded-md"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        <div className="w-full space-y-2">
          <label htmlFor="serialNumber" className="w-full">
            N° Serie
          </label>
          <input
            type="text"
            name="serialNumber"
            id="serialNumber"
            className="block w-full p-2 rounded-md"
            value={serialNumber}
            onChange={(e) => setSerialN(e.target.value)}
          />
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

export default FormEquip;
