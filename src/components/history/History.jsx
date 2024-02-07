import axios from "axios";
async function dataHistory() {
  const { data } = await axios("http://localhost:3000/api/history");
  return data;
}
async function History() {
  const history = await dataHistory();
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-white">
          <tr>
            <th scope="col" className="px-6 py-3">
              Equipo
            </th>
            <th scope="col" className="px-6 py-3">
              Empleado
            </th>
            <th scope="col" className="px-6 py-3">
              Tipo de evento
            </th>
            <th scope="col" className="px-6 py-3">
              Detalles
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha del evento
            </th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr className="bg-white border-b" key={item.id}>
              <td className="px-6 py-4">{item.eq}</td>
              <td className="px-6 py-4">{item.fullName}</td>
              <td className="px-6 py-4">{item.typeEvent}</td>
              <td className="px-6 py-4">{item.details}</td>
              <td className="px-6 py-4">
                {new Date(item.dateEvent).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
