import { NextResponse } from "next/server";
import { conn } from "@/libs/db";

export async function GET() {
  try {
    const historyD = await conn.query(
      "SELECT history.id, history.details, CONCAT(eqType,' ',brand,' ', model)as eq, CONCAT(name, ' ', firstName, ' ', lastName)as fullName, dateEvent,typeEvent FROM history, equipment,employees WHERE history.idEq = equipment.id AND history.idEmployee = employees.id ORDER BY history.id DESC"
    );
    return NextResponse.json(
      {
        historyD,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    //console.log(error);
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
    const { idEmployee, idEq, dateEvent, typeEvent, details } =
      await request.json();
    const data = await conn.query("INSERT INTO history SET ?", {
      idEmployee,
      idEq,
      dateEvent,
      typeEvent,
      details,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}
