import { NextResponse } from "next/server";
import { conn } from "@/libs/db";

export async function GET() {
  try {
    const historyD = await conn.query(process.env.QUERY_HISTORY);
    return NextResponse.json(
      {
        historyD,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
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
    const data = await conn.query(process.env.INSERT_HISTORY, {
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
