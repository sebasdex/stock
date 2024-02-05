import axios from "axios";
import TableE from "./TableE";

async function dataEmployees() {
  try {
    const { data } = await axios("http://localhost:3000/api/employees");
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function TableEmployee() {
  const employee = await dataEmployees();
  return <TableE employee={employee} />;
}

export default TableEmployee;
