"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useEmployees } from "@/context/myContext";
import Alert from "../Alert";

function TableM() {
  const params = useParams();
  const router = useRouter();
  const { loadMaintenance, maintenance } = useEmployees();
  const [alert, setAlert] = useState({
    status: false,
    msg: "",
    type: "",
  });

  useEffect(() => {
    const loadData = async () => {
      await loadMaintenance();
    };
    loadData();
  }, []);

  // Función para manejar la eliminación de un registro de mantenimiento
  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de eliminar estos datos?")) {
      try {
        const res = await axios.delete(`/api/maintenance/${id}`);
        if (res.status === 204) {
          setAlert({
            status: true,
            msg: "Datos eliminados correctamente",
            type: "success",
          });
          setTimeout(() => {
            setAlert({
              status: false,
              msg: "",
              type: "",
            });
          }, 5000);
          await loadMaintenance();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <section className="w-[70rem] h-auto m-auto mt-12 p-4 bg-white rounded-md">
      {alert.status && (
        <Alert
          message={alert.msg}
          type={
            alert.type === "error" ? "bg-red-500 mb-4" : "bg-green-500 mb-4"
          }
        />
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Equipo
              </th>
              <th scope="col" className="px-6 py-3">
                Tipo de mantenimiento
              </th>
              <th scope="col" className="px-6 py-3">
                Detalles
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha de mantenimiento
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {maintenance.length > 0 ? (
              maintenance.map((item) => (
                <tr className="border-b capitalize" key={item.id}>
                  <td className="px-6 py-4">{item.equip}</td>
                  <td className="px-6 py-4">{item.typeMain}</td>
                  <td className="px-6 py-4">{item.details}</td>
                  <td className="px-6 py-4 normal-case">
                    {new Date(item.mDate).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 space-x-10">
                    {params.id && Number(params.id) === item.id ? (
                      <button
                        onClick={() => router.push(`/maintenance`)}
                        className="font-medium text-red-600 hover:underline"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    ) : (
                      <button
                        onClick={
                          params.id && Number(params.id) === item.id
                            ? () => router.push(`/maintenance`)
                            : () => router.push(`/maintenance/edit/${item.id}`)
                        }
                        className="font-medium hover:underline"
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                    )}
                    {params.id ? (
                      ""
                    ) : (
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="hover:underline"
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  No hay mantenimientos para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TableM;
