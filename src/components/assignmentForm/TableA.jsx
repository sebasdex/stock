"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Alert from "../Alert";

function TableA({ assignment = [] }) {
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
        const res = await axios.delete(`/api/assignment/${id}`);
        if (res.status === 204) {
          router.push("/equipment");
        }
      }
    } catch (error) {
      setAlert({
        msg: "Esta asignación se encuentra en mantenimiento y no se puede eliminar.",
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
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Equipo
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Detalles
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha del evento
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {assignment.length > 0 ? (
              assignment?.map((item) => (
                <tr
                  className="odd:bg-whiteeven:bg-gray-50 border-b capitalize"
                  key={item.id}
                >
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.equip}</td>
                  <td className="px-6 py-4">{item.status}</td>
                  <td className="px-6 py-4">{item.details}</td>
                  <td className="px-6 py-4 normal-case">
                    {new Date(item.assignDate).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 space-x-10">
                    {params.id && Number(params.id) === item.id ? (
                      <button
                        onClick={() => router.push(`/assignment`)}
                        className="font-medium text-red-600 hover:underline"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    ) : (
                      <button
                        onClick={
                          params.id && Number(params.id) === item.id
                            ? () => router.push(`/assignment`)
                            : () => router.push(`/assignment/edit/${item.id}`)
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
                <td colSpan="6" className="px-6 py-4 text-center">
                  No hay asignaciones para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TableA;
