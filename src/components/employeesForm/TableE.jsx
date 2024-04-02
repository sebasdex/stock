"use client";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useEmployees } from "@/context/myContext";
import Alert from "../Alert";
function Table() {
  const router = useRouter();
  const params = useParams();
  const [alert, setAlert] = useState({
    msg: "",
    status: false,
    type: "",
  });

  const { employees, loadEmployees } = useEmployees();

  useEffect(() => {
    const getEmployees = async () => {
      await loadEmployees();
    };
    getEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (confirm("Estas seguro de eliminar datos?")) {
        const res = await axios.delete(`/api/employees/${id}`);
        if (res.status === 204) {
          setAlert({
            msg: "Empleado eliminado exitosamente.",
            status: true,
            type: "success",
          });
          setTimeout(() => {
            setAlert({
              msg: "",
              status: false,
              type: "",
            });
          }, 5000);
          await loadEmployees();
        }
      }
    } catch (error) {
      if (error.response.status === 500) {
        setAlert({
          msg: "No se puede eliminar el usuario porque tiene asignado un equipo.",
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
                Cargo
              </th>
              <th scope="col" className="px-6 py-3">
                Área
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {employees?.length > 0 ? (
              employees?.map((item) => (
                <tr
                  className="odd:bg-whiteeven:bg-gray-50 border-b capitalize"
                  key={item.id}
                >
                  <td className="px-6 py-4">{`${item.name} ${item.firstName} ${item.lastName}`}</td>
                  <td className="px-6 py-4">{item.charge}</td>
                  <td className="px-6 py-4">{item.department}</td>
                  <td className="px-6 py-4 space-x-10">
                    {params.id && Number(params.id) === item.id ? (
                      <button
                        onClick={() => router.push(`/employees`)}
                        className="font-medium text-red-600 hover:underline"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    ) : (
                      <button
                        onClick={
                          params.id && Number(params.id) === item.id
                            ? () => router.push(`/employees`)
                            : () => router.push(`/employees/edit/${item.id}`)
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
                <td colSpan="4" className="px-6 py-4 text-center">
                  No hay empleados para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Table;
