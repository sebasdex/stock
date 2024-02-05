"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "../Alert";
import axios from "axios";

function FormMaintenance() {
  const [typeMain, setTMain] = useState("");
  const [idEq, setEquip] = useState("");
  const [mDate, setDateM] = useState("");
  const [details, setDetails] = useState("");
  const [dataEquip, setDataEquip] = useState([]);
  const [alert, setAlert] = useState({
    msg: "",
    status: false,
    type: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if ([typeMain, idEq, mDate, details].includes("")) {
        setAlert({
          msg: "Los campos están vacíos",
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

      await axios.post("/api/maintenance", {
        idEq,
        mDate,
        typeMain,
        details,
      });
    } catch (error) {
      console.error("Error during post request:", error);
      if (error.response) {
        console.error(
          "Server responded with status code:",
          error.response.status
        );
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received from the server");
      } else {
        console.error("Error setting up the request:", error.message);
      }
      setAlert({
        msg: "Error during request",
        status: true,
        type: "error",
      });
    }
    setAlert({
      msg: "Los datos han sido registrados",
      status: true,
      type: "success",
    });
    setTimeout(() => {
      setAlert({
        msg: "",
        status: false,
        type: "",
      });
    }, 4000);
    setTMain("");
    setEquip("");
    setDateM("");
    setDetails("");
    router.refresh();
  };

  const handleReset = () => {
    setTMain("");
    setEquip("");
    setDateM("");
    setDetails("");
  };

  useEffect(() => {
    async function dataAxios() {
      try {
        const dataMain = await axios("/api/maintenance");
        setDataEquip(dataMain.data.dataEquipment);
      } catch (error) {
        console.log(error);
      }
    }
    dataAxios();
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
          <label htmlFor="typeMain" className="block w-full ">
            Tipo de mantenimiento
          </label>
          <select
            name="typeMain"
            id="typeMain"
            className={`block w-full p-2 rounded-md bg-white`}
            style={{ fontFamily: "Roboto, sans-serif" }}
            value={typeMain}
            onChange={(e) => setTMain(e.target.value)}
          >
            <option value="">-- Selecciona una opción --</option>
            <option value="Preventivo">Preventivo</option>
            <option value="Correctivo">Correctivo</option>
            <option value="Actualización">Actualización</option>
          </select>
        </div>
        <div className="w-full space-y-2">
          <label htmlFor="idEq" className="block w-full ">
            Equipo
          </label>
          <select
            name="idEq"
            id="idEq"
            className={`block w-full p-2 rounded-md bg-white`}
            style={{ fontFamily: "Roboto, sans-serif" }}
            value={idEq}
            onChange={(e) => setEquip(Number(e.target.value))}
          >
            <option value="">-- Selecciona una opción --</option>
            {dataEquip.map((item) => (
              <option key={item.id} value={item.id}>
                {`${item.brand}${" | "}${item.model}`}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full space-y-2">
          <label htmlFor="mDate" className="block w-full">
            Fecha mantenimiento
          </label>
          <input
            type="date"
            name="mDate"
            id="mDate"
            className="block w-full p-2 rounded-md"
            value={mDate}
            onChange={(e) => setDateM(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between gap-5">
        <div className="w-full space-y-2">
          <label htmlFor="details" className="block w-full">
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

export default FormMaintenance;
