import axios from "axios";

async function loadEquipment() {
  const { data } = await axios("http://localhost:3000/api/equipments");
  return data;
}

async function TableEquip() {
  const equip = await loadEquipment();
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
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {equip.map((item) => (
              <tr
                className="odd:bg-whiteeven:bg-gray-50 border-b capitalize"
                key={item.id}
              >
                <td className="px-6 py-4">{item.eqType}</td>
                <td className="px-6 py-4">{item.brand}</td>
                <td className="px-6 py-4">{item.model}</td>
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

export default TableEquip;
