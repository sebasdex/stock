import axios from "axios";

async function dataAssignment() {
  const { data } = await axios("http://localhost:3000/api/assignment");
  return data.assignmentData;
}

async function TableAssignment() {
  const assignment = await dataAssignment();
  return (
    <section className="w-[70rem] h-auto m-auto mt-12 p-4 bg-white rounded-md">
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
                Fecha del evento
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {assignment.map((item) => (
              <tr
                className="odd:bg-whiteeven:bg-gray-50 border-b capitalize"
                key={item.id}
              >
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.equip}</td>
                <td className="px-6 py-4">{item.status}</td>
                <td className="px-6 py-4 normal-case">
                  {new Date(item.assignDate).toLocaleDateString("es-ES", {
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

export default TableAssignment;
