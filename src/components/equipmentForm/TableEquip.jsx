import axios from "axios";
import TableEq from "./TableEq";

async function loadEquipment() {
  try {
    const { data } = await axios("http://localhost:3000/api/equipments");
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function TableEquip() {
  const equip = await loadEquipment();
  return <TableEq equip={equip} />;
}

export default TableEquip;
