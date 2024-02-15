"use client";
import axios from "axios";
import Alert from "../Alert";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

function TableEq({ equip }) {
  const params = useParams();
  const router = useRouter();
  const [alert, setAlert] = useState({
    msg: "",
    status: false,
    type: "",
  });

  const handleDelete = async (id) => {
    try {
      if (confirm("Estas seguro de eliminar datos?")) {
        const res = await axios.delete(`/api/equipments/${id}`);
        if (res.status === 204) {
          router.push("/equipment");
        }
      }
    } catch (error) {
      setAlert({
        msg: "Este equipo se encuentra en mantenimiento o asignado y no se puede eliminar.",
        status: true,
        type: "error",
      });
      setTimeout(() => {
        setAlert({
          msg: "",
          status: false,
          type: "",
        });
      }, 5000);
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
                Tipo de Equipo
              </th>
              <th scope="col" className="px-6 py-3">
                Marca
              </th>
              <th scope="col" className="px-6 py-3">
                Modelo
              </th>
              <th scope="col" className="px-6 py-3">
                Número de serie
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {equip ? (
              equip.map((item) => (
                <tr
                  className="odd:bg-whiteeven:bg-gray-50 border-b capitalize"
                  key={item.id}
                >
                  <td className="px-6 py-4">{item.eqType}</td>
                  <td className="px-6 py-4">{item.brand}</td>
                  <td className="px-6 py-4">{item.model}</td>
                  <td className="px-6 py-4">{item.serialNumber}</td>
                  <td className="px-6 py-4 space-x-10">
                    {params.id && Number(params.id) === item.id ? (
                      <button
                        onClick={() => router.push(`/equipment`)}
                        className="font-medium text-red-600 hover:underline"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    ) : (
                      <button
                        onClick={
                          params.id && Number(params.id) === item.id
                            ? () => router.push(`/equipment`)
                            : () => router.push(`/equipment/edit/${item.id}`)
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
                  No hay equipos para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TableEq;
