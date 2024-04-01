import { conn } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dataEquipment = await conn.query("SELECT * FROM equipment");
    const dataMaintenance = await conn.query(
      "SELECT CONCAT(equipment.brand,' ', equipment.model) as equip,maintenance.id, maintenance.typeMain, maintenance.details, maintenance.mDate FROM maintenance, equipment WHERE maintenance.idEq = equipment.id;"
    );
    if (dataEquipment.length === 0 || dataMaintenance === 0) {
      return NextResponse.json(
        {
          error: {
            message: "No se encontraron resultados",
          },
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json({
      dataEquipment,
      dataMaintenance,
    });
  } catch (error) {
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
    const { idEq, mDate, typeMain, details } = await request.json();
    if (!idEq || !mDate || !typeMain || !details) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Datos incompletos. Asegúrate de proporcionar todos los campos requeridos.",
        },
        {
          status: 400,
        }
      );
    }

    const result = await conn.query("INSERT INTO maintenance SET ?", {
      idEq,
      mDate,
      typeMain,
      details,
    });
    return NextResponse.json({
      success: true,
      data: result,
    });
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
