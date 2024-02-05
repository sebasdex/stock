import { NextResponse } from "next/server";
import { conn } from "@/libs/db";

export async function GET() {
  try {
    const results = await conn.query("SELECT * FROM employees");
    return NextResponse.json(results);
  } catch (error) {
    return (
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    const { name, firstName, lastName, charge, department } =
      await request.json();
    const result = await conn.query("INSERT INTO employees SET ?", {
      name,
      firstName,
      lastName,
      charge,
      department,
    });
    return NextResponse.json({
      name,
      firstName,
      lastName,
      charge,
      department,
      id: result.insertId,
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
