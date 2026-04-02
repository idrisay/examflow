import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db";
import { createSession, setSessionCookie } from "@/lib/auth";
import { registerSchema } from "@/lib/validation";
import { User } from "@/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid registration data." }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email: parsed.data.email });
    if (existingUser) {
      return NextResponse.json({ error: "An account already exists." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 10);
    const user = await User.create({
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash
    });

    const token = await createSession({
      userId: String(user._id),
      email: user.email,
      name: user.name
    });

    await setSessionCookie(token);

    return NextResponse.json({
      message: "Registration successful.",
      user: { id: String(user._id), name: user.name, email: user.email }
    });
  } catch {
    return NextResponse.json({ error: "Unable to register right now." }, { status: 500 });
  }
}
