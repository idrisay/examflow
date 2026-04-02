import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db";
import { sampleExams, sampleQuestions } from "@/lib/sample-data";
import { Exam } from "@/models/Exam";
import { Question } from "@/models/Question";

export async function GET() {
  try {
    await connectToDatabase();

    const examCount = await Exam.countDocuments();
    if (examCount === 0) {
      await Exam.insertMany(sampleExams, { ordered: false });
      await Question.insertMany(sampleQuestions, { ordered: false });
    }

    const exams = await Exam.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(exams);
  } catch {
    return NextResponse.json(sampleExams);
  }
}
