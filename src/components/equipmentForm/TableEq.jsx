"use client";
import { useParams, useRouter } from "next/navigation";

function TableEq({ equip }) {
  const params = useParams();
  const router = useRouter();
  return (
    <section className="w-[70rem] h-auto m-auto mt-12 p-4 bg-white rounded-md">
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
                        onClick={() =>
                          router.push(`/equipment/edit/${item.id}`)
                        }
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
