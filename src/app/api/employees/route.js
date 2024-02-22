import { NextResponse } from "next/server";
import { conn } from "@/libs/db";

export async function GET() {
  try {
    const results = await conn.query(process.env.QUERY_EMPLOYEESMOD);
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
    const result = await conn.query(process.env.INSERT_EMPLOYEES, {
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
