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
    const [data] = await conn.query("SELECT * FROM maintenance WHERE id = ?", [
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

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const result = await conn.query("UPDATE maintenance SET ? WHERE id = ?", [
      data,
      params.id,
    ]);

    if (result.affectedRows === 0) {
      return new Response(
        JSON.stringify({ message: "Producto no encontrado" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const [updatedProduct] = await conn.query(
      "SELECT * FROM equipment WHERE id = ?",
      [params.id]
    );
    return new Response(JSON.stringify(updatedProduct), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Error interno del servidor" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
