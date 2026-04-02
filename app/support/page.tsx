import { SupportForm } from "@/components/support-form";
import { SectionTitle } from "@/components/section-title";

export default function SupportPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <div>
        <SectionTitle
          eyebrow="Support"
          title="Keep the platform completely free"
          description="Your support helps with hosting, content review, and expanding the question bank so more learners can prepare without paywalls."
        />
        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 text-slate-300">
          <p className="font-medium text-white">How this works</p>
          <p className="mt-3 text-sm leading-7">
            This starter stores support intentions in MongoDB. You can later connect
            Stripe or PayPal to turn these pledges into real payments.
          </p>
        </div>
      </div>

      <SupportForm />
    </div>
  );
}
