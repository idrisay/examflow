import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db";
import { createSession, setSessionCookie } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";
import { User } from "@/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid login data." }, { status: 400 });
    }

    await connectToDatabase();
    const user = await User.findOne({ email: parsed.data.email });

    if (!user) {
      return NextResponse.json({ error: "Account not found." }, { status: 404 });
    }

    const isValid = await bcrypt.compare(parsed.data.password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }

    const token = await createSession({
      userId: String(user._id),
      email: user.email,
      name: user.name
    });

    await setSessionCookie(token);

    return NextResponse.json({
      message: "Login successful.",
      user: { id: String(user._id), name: user.name, email: user.email }
    });
  } catch {
    return NextResponse.json({ error: "Unable to log in right now." }, { status: 500 });
  }
}
