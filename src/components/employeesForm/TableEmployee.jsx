import axios from "axios";
import Table from "./Table";

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
  return <Table employee={employee} />;
}

export default TableEmployee;
