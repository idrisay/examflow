import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db";
import { supportSchema } from "@/lib/validation";
import { SupportContribution } from "@/models/SupportContribution";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = supportSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid support details." }, { status: 400 });
    }

    await connectToDatabase();
    await SupportContribution.create({
      name: parsed.data.name,
      email: parsed.data.email,
      amount: parsed.data.amount,
      message: parsed.data.message || "",
      status: "pending"
    });

    return NextResponse.json({
      message:
        "Support intent saved. Connect Stripe or PayPal next to collect real payments."
    });
  } catch {
    return NextResponse.json({ error: "Unable to save support request." }, { status: 500 });
  }
}
