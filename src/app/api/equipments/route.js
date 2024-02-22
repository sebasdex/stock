import { NextResponse } from "next/server";
import { conn } from "@/libs/db";

export async function GET() {
  try {
    const data = await conn.query(process.env.QUERY_EQUIPMENT);
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request) {
  try {
    const { eqType, brand, model, serialNumber } = await request.json();
    const result = conn.query(process.env.INSERT_EQUIPMENT, {
      eqType,
      brand,
      model,
      serialNumber,
    });
    return NextResponse.json({
      eqType,
      brand,
      model,
      serialNumber,
      id: result.insertId,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      {
        status: 500,
      }
    );
  }
}
