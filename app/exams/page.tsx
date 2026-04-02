import { connectToDatabase } from "@/lib/db";
import { sampleExams } from "@/lib/sample-data";
import { Exam } from "@/models/Exam";
import { ExamCard } from "@/components/exam-card";
import { SectionTitle } from "@/components/section-title";

export default async function ExamsPage() {
  let exams = sampleExams;

  try {
    await connectToDatabase();
    const dbExams = await Exam.find().sort({ createdAt: -1 }).lean();
    if (dbExams.length > 0) {
      exams = dbExams.map((exam) => ({
        title: exam.title,
        slug: exam.slug,
        provider: exam.provider,
        level: exam.level,
        category: exam.category,
        durationMinutes: exam.durationMinutes,
        description: exam.description,
        isPremium: exam.isPremium,
        questionCount: exam.questionCount
      }));
    }
  } catch {
    exams = sampleExams;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionTitle
        eyebrow="Exam Library"
        title="Public exam packs, premium-style practice flow"
        description="Users can browse exam collections without creating an account. When they log in, they can keep results and build consistency."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {exams.map((exam) => (
          <ExamCard key={exam.slug} exam={exam} />
        ))}
      </div>
    </div>
  );
}
