import axios from "axios";
import TableH from "./TableH";
async function dataHistory() {
  try {
    const { data } = await axios("http://localhost:3000/api/history");
    if (data) {
      return data.historyD;
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}
async function History() {
  const historyData = await dataHistory();
  return <TableH historyData={historyData} />;
}

export default History;
