import { conn } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const result = await conn.query("SELECT * FROM equipment WHERE id = ?", [
      params.id,
    ]);
    return NextResponse.json(result);
  } catch (error) {
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
    const result = await conn.query("UPDATE equipment SET ? WHERE id = ?", [
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
      "SELECT * FROM equipment WHERE id = ?",
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

export async function DELETE(request, { params }) {
  try {
    const result = await conn.query("DELETE FROM equipment WHERE id = ?", [
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
    return new NextResponse(null, {
      status: 204,
    });
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
