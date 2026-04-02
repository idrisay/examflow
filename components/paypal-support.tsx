"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";

import { formatCurrency } from "@/lib/utils";

const presets = [5, 15, 30, 50];

type PayPalSupportProps = {
  clientId: string;
  currency: string;
  configured: boolean;
};

export function PayPalSupport({
  clientId,
  currency,
  configured
}: PayPalSupportProps) {
  const [selectedAmount, setSelectedAmount] = useState(15);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [scriptReady, setScriptReady] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const buttonContainerRef = useRef<HTMLDivElement | null>(null);
  const activeAmount =
    customAmount.trim().length > 0 ? Number.parseFloat(customAmount) : selectedAmount;

  const canRenderButtons = useMemo(
    () =>
      Boolean(
        configured &&
          scriptReady &&
          name.trim() &&
          email.trim() &&
          Number.isFinite(activeAmount) &&
          activeAmount >= 1
      ),
    [activeAmount, configured, scriptReady, name, email]
  );

  useEffect(() => {
    if (!canRenderButtons || !window.paypal || !buttonContainerRef.current) {
      return;
    }

    buttonContainerRef.current.innerHTML = "";

    window.paypal
      .Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "paypal"
        },
        createOrder: async () => {
          setMessage("");
          try {
            const response = await fetch("/api/paypal/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name,
                email,
                amount: activeAmount,
                currency,
                message: note
              })
            });

            const data = (await response.json()) as {
              error?: string;
              orderId?: string;
            };

            if (!response.ok || !data.orderId) {
              throw new Error(data.error || "Unable to create PayPal order.");
            }

            return data.orderId;
          } catch (error) {
            const message =
              error instanceof Error && error.message
                ? error.message
                : "Unable to create PayPal order.";
            setMessage(message);
            throw error;
          }
        },
        onApprove: async ({ orderID }) => {
          const response = await fetch("/api/paypal/capture-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: orderID,
              name,
              email,
              amount: activeAmount,
              currency,
              message: note
            })
          });

          const data = (await response.json()) as { error?: string; message?: string };

          if (!response.ok) {
            setMessage(data.error || "Payment capture failed.");
            return;
          }

          setPaymentComplete(true);
          setMessage(data.message || "Thank you for supporting the platform.");
        },
        onError: (error) => {
          const fallback = "PayPal could not start. Please try again.";
          const message =
            error instanceof Error && error.message ? error.message : fallback;
          setMessage(message);
        }
      })
      .render(buttonContainerRef.current);
  }, [activeAmount, canRenderButtons, currency, email, name, note]);

  return (
    <div className="editorial-card space-y-5 rounded-[2rem] p-8">
      <div className="grid gap-3 sm:grid-cols-5">
        {presets.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => {
              setSelectedAmount(amount);
              setCustomAmount("");
            }}
            className={`rounded-2xl border px-4 py-4 text-left transition ${
              customAmount.length === 0 && selectedAmount === amount
                ? "border-[color:var(--brand)] bg-[color:var(--status-success-soft)] text-[color:var(--foreground)]"
                : "border-[var(--line)] bg-[color:var(--surface-muted)] text-[color:var(--ink-soft)]"
            }`}
          >
            {formatCurrency(amount)}
          </button>
        ))}
        <div
          className={`rounded-2xl border px-4 py-3 transition ${
            customAmount.length > 0
              ? "border-[color:var(--brand)] bg-[color:var(--status-success-soft)]"
              : "border-[var(--line)] bg-[color:var(--surface-muted)]"
          }`}
        >
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
            Other
          </label>
          <input
            type="number"
            min="1"
            step="1"
            inputMode="decimal"
            value={customAmount}
            onChange={(event) => setCustomAmount(event.target.value)}
            className="w-full bg-transparent text-left text-lg text-[color:var(--field-text)] outline-none placeholder:text-sm placeholder:text-[color:var(--field-placeholder)]"
            placeholder="$"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-[color:var(--ink-soft)]">Name</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="field-input px-4 py-3"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-[color:var(--ink-soft)]">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="field-input px-4 py-3"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-[color:var(--ink-soft)]">Message</label>
        <textarea
          rows={4}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          className="field-input px-4 py-3"
          placeholder="Optional encouragement for the project."
        />
      </div>

      <div className="rounded-2xl border border-[var(--line)] bg-[color:var(--surface-muted)] px-4 py-4">
        <p className="text-sm text-[color:var(--ink-soft)]">Support amount</p>
        <p className="mt-1 text-2xl font-semibold text-[color:var(--foreground)]">
          {Number.isFinite(activeAmount) && activeAmount >= 1
            ? formatCurrency(activeAmount)
            : "Enter at least $1"}
        </p>
      </div>

      {configured ? (
        <>
          <Script
            src={`https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}&intent=capture&components=buttons`}
            strategy="afterInteractive"
            onLoad={() => setScriptReady(true)}
          />

          {!name.trim() || !email.trim() ? (
            <p className="text-sm text-[color:var(--ink-soft)]">
              Enter your name and email to enable the PayPal button.
            </p>
          ) : !Number.isFinite(activeAmount) || activeAmount < 1 ? (
            <p className="text-sm text-[color:var(--ink-soft)]">
              Enter a support amount of at least $1 to enable PayPal.
            </p>
          ) : null}

          <div
            ref={buttonContainerRef}
            className={paymentComplete ? "pointer-events-none opacity-60" : ""}
          />
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-[color:var(--brand)]/30 bg-[color:var(--status-success-soft)] px-4 py-4 text-sm text-[color:var(--foreground)]">
          Add your PayPal API credentials to `.env.local` to enable live checkout.
        </div>
      )}

      {message ? <p className="text-sm text-[color:var(--status-success)]">{message}</p> : null}
    </div>
  );
}
