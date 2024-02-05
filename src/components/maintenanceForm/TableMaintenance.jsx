import axios from "axios";

async function loadMaintenance() {
  const { data } = await axios("http://localhost:3000/api/maintenance");
  return data.dataMaintenance;
}

async function TableMaintenance() {
  const maintenance = await loadMaintenance();
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
            {maintenance.map((item) => (
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
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TableMaintenance;
