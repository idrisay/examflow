import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { attemptSchema } from "@/lib/validation";
import { Attempt } from "@/models/Attempt";

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Please log in first." }, { status: 401 });
    }

    const body = await request.json();
    const parsed = attemptSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid attempt data." }, { status: 400 });
    }

    await connectToDatabase();
    const attempt = await Attempt.create({
      userId: session.userId,
      examId: parsed.data.examId,
      score: parsed.data.score,
      answers: parsed.data.answers
    });

    return NextResponse.json({
      message: "Attempt saved.",
      score: attempt.score
    });
  } catch {
    return NextResponse.json({ error: "Could not save attempt." }, { status: 500 });
  }
}
