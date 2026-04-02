import { getTranslations } from "@/lib/i18n";
import { getSampleExams } from "@/lib/sample-data";
import { ExamCard } from "@/components/exam-card";
import { SectionTitle } from "@/components/section-title";

export default async function ExamsPage() {
  const { locale, messages } = await getTranslations();
  const sampleExams = getSampleExams(locale);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionTitle
        eyebrow={messages.examsPage.eyebrow}
        title={messages.examsPage.title}
        description={messages.examsPage.description}
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {sampleExams.map((exam) => (
          <ExamCard key={exam.slug} exam={exam} copy={messages.common} />
        ))}
      </div>
    </div>
  );
}
