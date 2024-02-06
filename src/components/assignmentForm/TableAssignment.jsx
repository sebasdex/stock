import axios from "axios";
import TableA from "./TableA";

async function dataAssignment() {
  const { data } = await axios("http://localhost:3000/api/assignment");
  return data.assignmentData;
}

async function TableAssignment() {
  const assignment = await dataAssignment();
  return <TableA assignment={assignment} />;
}

export default TableAssignment;
