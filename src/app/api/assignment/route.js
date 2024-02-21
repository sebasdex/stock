import { NextResponse } from "next/server";
import { conn } from "@/libs/db";

export async function GET() {
  try {
    const employeesResult = await conn.query("SELECT * FROM employees");
    const equipmentResult = await conn.query("SELECT * FROM equipment");
    const assignmentData = await conn.query(
      "SELECT CONCAT(employees.name,' ', employees.firstName, ' ', employees.lastName) AS name, CONCAT(equipment.brand,' ', equipment.model) AS equip, assignments.id, assignments.assignDate, assignments.details, assignments.status FROM assignments INNER JOIN employees ON assignments.idEmployee = employees.id INNER JOIN equipment ON assignments.idEq = equipment.id WHERE assignments.visible = 1"
    );
    return NextResponse.json(
      {
        employeesResult,
        equipmentResult,
        assignmentData,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    // Enviar el estado del error a la UI
    return new NextResponse(
      JSON.stringify({
        success: false,
        error:
          "Hubo un problema al obtener los datos. Por favor, intente más tarde.",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
      visible: 1,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
  }
}
