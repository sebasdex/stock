import axios from "axios";
import TableM from "./TableM";

async function loadMaintenance() {
  try {
    const { data } = await axios("http://localhost:3000/api/maintenance");
    if (data.dataMaintenance) {
      return data.dataMaintenance;
    } else {
      return <p>No data..</p>;
    }
  } catch (error) {
    console.error("Error fetching maintenance data:", error);
    return <p>Error fetching data. Please try again later.</p>;
  }
}

async function TableMaintenance() {
  const maintenance = await loadMaintenance();
  return <TableM maintenance={maintenance} />;
}

export default TableMaintenance;
