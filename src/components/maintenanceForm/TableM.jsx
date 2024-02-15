"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function TableM() {
  const params = useParams();
  const router = useRouter();
  const [maintenance, setMaintenance] = useState([]);
  const [error, setError] = useState("");

  // Función para recargar los datos
  const reloadData = async () => {
    setError(""); // Resetea el mensaje de error antes de intentar cargar los datos
    try {
      const { data } = await axios("/api/maintenance");
      setMaintenance(data.dataMaintenance || []);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
      setError(
        "Error al cargar los datos. Por favor, intenta de nuevo más tarde."
      );
    }
  };

  // Efecto para cargar los datos al montar el componente
  useEffect(() => {
    reloadData();
  }, []); // Depende de un array vacío para ejecutarse solo en el montaje

  // Función para manejar la eliminación de un registro de mantenimiento
  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de eliminar estos datos?")) {
      try {
        await axios.delete(`/api/maintenance/${id}`);
        reloadData(); // Recarga los datos después de una eliminación exitosa
      } catch (error) {
        console.error(error);
        setError(
          "Error al eliminar el dato. Por favor, intenta de nuevo más tarde."
        );
      }
    }
  };
  return (
    <section className="w-[70rem] h-auto m-auto mt-12 p-4 bg-white rounded-md">
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
            {Array.isArray(maintenance) && maintenance.length > 0 ? (
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
