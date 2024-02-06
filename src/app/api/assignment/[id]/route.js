import { conn } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  if (!params.id) {
    // Valida el ID antes de la consulta
    return new NextResponse(
      JSON.stringify({ message: "ID no proporcionado" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  try {
    const [data] = await conn.query("SELECT * FROM assignments WHERE id = ?", [
      params.id,
    ]);
    if (data.length === 0) {
      // Manejo cuando no se encuentran datos
      return new NextResponse(
        JSON.stringify({ message: "No se encontraron datos" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new NextResponse(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Error al recuperar datos" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
