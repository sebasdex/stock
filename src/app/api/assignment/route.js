import { NextResponse } from "next/server";
import { conn } from "@/libs/db";

export async function GET() {
  try {
    const employeesResult = await conn.query(process.env.QUERY_EMPLOYEES);
    const equipmentResult = await conn.query(process.env.QUERY_EQUIPMENT);
    const assignmentData = await conn.query(process.env.QUERY_ASSIGNMENT);
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
    const result = await conn.query(process.env.INSERT_ASSIGNMENT, {
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
