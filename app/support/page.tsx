import { PayPalSupport } from "@/components/paypal-support";
import { SectionTitle } from "@/components/section-title";
import { getTranslations } from "@/lib/i18n";
import { getPayPalClientId, isPayPalConfigured } from "@/lib/paypal";

export default async function SupportPage() {
  const { messages } = await getTranslations();
  const clientId = getPayPalClientId();
  const configured = isPayPalConfigured();

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <div>
        <SectionTitle
          eyebrow={messages.supportPage.eyebrow}
          title={messages.supportPage.title}
          description={messages.supportPage.description}
        />
        <div className="editorial-card mt-8 rounded-[2rem] p-6 text-[color:var(--ink-soft)]">
          <p className="font-medium text-[color:var(--foreground)]">{messages.supportPage.cardTitle}</p>
          <p className="mt-3 text-sm leading-7">{messages.supportPage.cardText}</p>
        </div>
      </div>

      <PayPalSupport clientId={clientId} currency="USD" configured={configured} />
    </div>
  );
}
