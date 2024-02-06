import axios from "axios";
import TableM from "./TableM";

async function loadMaintenance() {
  const { data } = await axios("http://localhost:3000/api/maintenance");
  return data.dataMaintenance;
}

async function TableMaintenance() {
  const maintenance = await loadMaintenance();
  return <TableM maintenance={maintenance} />;
}

export default TableMaintenance;
