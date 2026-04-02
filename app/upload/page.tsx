import { SectionTitle } from "@/components/section-title";
import { UploadForm } from "@/components/upload-form";
import { getTranslations } from "@/lib/i18n";

export default async function UploadPage() {
  const { messages } = await getTranslations();

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <div>
        <SectionTitle
          eyebrow={messages.uploadPage.eyebrow}
          title={messages.uploadPage.title}
          description={messages.uploadPage.description}
        />
        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 text-slate-300">
          <p className="font-medium text-white">{messages.uploadPage.cardTitle}</p>
          <p className="mt-3 text-sm leading-7">{messages.uploadPage.cardText}</p>
        </div>
      </div>

      <UploadForm />
    </div>
  );
}
