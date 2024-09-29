import { modifyCompany } from "@/controllers/companies";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const { name, image, description, active, currency } = body;

    if (!name || !image || !description || active === undefined || !currency) {
      return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }

    const data = await modifyCompany({ name, image, description, active, currency });

    const { status } = data;
    return NextResponse.json(data, { status });
  } catch (error) {
    console.error("Error updating company:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
