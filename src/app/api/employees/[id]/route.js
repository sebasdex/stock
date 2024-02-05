import { conn } from "@/libs/db";
import { data } from "autoprefixer";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const result = await conn.query("SELECT * FROM employees WHERE id = ?", [
      params.id,
    ]);
    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "Empleado no encontrado",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error en la solicitud",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const result = await conn.query("UPDATE employees SET ? WHERE id = ?", [
      data,
      params.id,
    ]);
    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    const updatedProduct = await conn.query(
      "SELECT * FROM employees WHERE id = ?",
      [params.id]
    );
    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
