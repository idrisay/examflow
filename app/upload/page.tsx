import { SectionTitle } from "@/components/section-title";
import { UploadForm } from "@/components/upload-form";

export default function UploadPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <div>
        <SectionTitle
          eyebrow="Community Uploads"
          title="Help improve the library"
          description="If you have useful TELC-style notes, worksheets, or reference documents, you can upload them here so we can review and improve the platform."
        />
        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 text-slate-300">
          <p className="font-medium text-white">Suggested files</p>
          <p className="mt-3 text-sm leading-7">
            Upload PDFs, scanned exercises, writing prompts, answer sheets, or
            vocabulary notes. We store submissions for review before anything is
            published.
          </p>
        </div>
      </div>

      <UploadForm />
    </div>
  );
}
