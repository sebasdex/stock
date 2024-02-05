import { NextResponse } from "next/server";
import { conn } from "@/libs/db";

export async function GET() {
  try {
    const employeesResult = await conn.query("SELECT * FROM employees");
    const equipmentResult = await conn.query("SELECT * FROM equipment");
    const assignmentData = await conn.query(
      "SELECT CONCAT(employees.name,' ', employees.firstName, ' ', employees.lastName)as name, CONCAT(equipment.brand,' ', equipment.model)as equip, assignments.id, assignments.assignDate,assignments.details,assignments.status   FROM assignments    INNER JOIN employees ON assignments.idEmployee = employees.id INNER JOIN equipment ON assignments.idEq = equipment.id;"
    );
    return NextResponse.json({
      employeesResult,
      equipmentResult,
      assignmentData,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request) {
  try {
    const { idEmployee, idEq, assignDate, details, status } =
      await request.json();
    const result = await conn.query("INSERT INTO assignments SET ?", {
      idEmployee,
      idEq,
      assignDate,
      details,
      status,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
  }
}
