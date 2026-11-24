"use client";

import { useEffect, useRef, useState } from "react";
import { SERVICES } from "@/data/services";
import { CONTACT, whatsappLink } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * Appointment enquiry.
 *
 * With NEXT_PUBLIC_ENQUIRY_ENDPOINT set (e.g. a Formspree or similar form URL that
 * accepts JSON POSTs), the form submits there. Without it, the form opens WhatsApp
 * with the message pre-filled. Nothing is stored by this website either way.
 * Only the child's age is asked for, never the child's name.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT;

const AGES = ["Under 2 years", "2 to 3 years", "3 to 5 years", "5 to 8 years", "8 years or older"];

type Errors = Partial<Record<"parent" | "phone" | "email", string>>;

export function EnquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "opened" | "failed">("idle");

  useEffect(() => {
    if (dateRef.current) dateRef.current.min = new Date().toISOString().slice(0, 10);
  }, []);

  function validate(data: FormData): Errors {
    const e: Errors = {};
    if (!String(data.get("parent") ?? "").trim()) e.parent = "Enter your name so we know who to reply to.";
    const phone = String(data.get("phone") ?? "").replace(/[\s()-]/g, "");
    if (!/^\+?\d{10,13}$/.test(phone)) e.phone = "Enter a phone number with 10 digits, for example 98765 43210.";
    const email = String(data.get("email") ?? "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Check the email address, or leave it empty.";
    return e;
  }

  function messageFrom(data: FormData) {
    const lines = [
      "Hello Kahani, I'd like to enquire about an appointment.",
      `Name: ${data.get("parent")}`,
      `Phone: ${data.get("phone")}`,
      data.get("email") && `Email: ${data.get("email")}`,
      data.get("age") && `Child's age: ${data.get("age")}`,
      data.get("service") && `Interested in: ${data.get("service")}`,
      data.get("date") && `Preferred date: ${data.get("date")}`,
      data.get("message") && `Message: ${data.get("message")}`,
    ];
    return lines.filter(Boolean).join("\n");
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      formRef.current?.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (ENDPOINT) {
      setStatus("sending");
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(Object.fromEntries(data)),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus("sent");
        formRef.current?.reset();
      } catch {
        setStatus("failed");
      }
      return;
    }
    window.open(whatsappLink(messageFrom(data)), "_blank", "noopener,noreferrer");
    setStatus("opened");
  }

  const mailto = () => {
    const data = formRef.current ? new FormData(formRef.current) : new FormData();
    return `mailto:${CONTACT.email}?subject=${encodeURIComponent("Appointment enquiry")}&body=${encodeURIComponent(messageFrom(data))}`;
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2" aria-describedby="form-note">
      <Field label="Your name" name="parent" required autoComplete="name" error={errors.parent} />
      <Field label="Phone number" name="phone" type="tel" required autoComplete="tel" inputMode="tel" error={errors.phone} />
      <Field label="Email (optional)" name="email" type="email" autoComplete="email" error={errors.email} className="sm:col-span-2" />

      <SelectField label="Child's age" name="age" options={AGES} />
      <SelectField label="Area of interest" name="service" options={[...SERVICES.map((s) => s.title), "Not sure yet"]} />

      <div className="sm:col-span-2">
        <label htmlFor="f-date" className="block font-bold text-forest">
          Preferred appointment date <span className="font-normal text-ink/60">(optional)</span>
        </label>
        <input ref={dateRef} id="f-date" name="date" type="date" className={inputCls} />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="f-message" className="block font-bold text-forest">
          Message <span className="font-normal text-ink/60">(optional)</span>
        </label>
        <p id="f-message-hint" className="mt-1 text-sm text-ink/65">
          Tell us a little about what you&rsquo;ve noticed. Please don&rsquo;t include your child&rsquo;s name or medical
          records here.
        </p>
        <textarea id="f-message" name="message" rows={4} aria-describedby="f-message-hint" className={cn(inputCls, "resize-y")} />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group/btn relative inline-flex min-h-13 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-forest px-7 py-3.5 font-bold text-paper transition-[transform,color] duration-200 hover:text-deep active:scale-[0.97] disabled:opacity-70"
        >
          <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-marigold transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover/btn:scale-y-100" />
          {!ENDPOINT && <WhatsAppIcon className="relative size-5" />}
          <span className="relative">
            {ENDPOINT ? (status === "sending" ? "Sending enquiry…" : "Send enquiry") : "Send enquiry on WhatsApp"}
          </span>
        </button>
        {!ENDPOINT && (
          <a
            href={`mailto:${CONTACT.email}`}
            onClick={(e) => {
              e.currentTarget.href = mailto();
            }}
            className="prose-link text-center font-semibold"
          >
            Send by email instead
          </a>
        )}
      </div>

      <div id="form-note" className="sm:col-span-2" aria-live="polite">
        {status === "idle" && (
          <p className="text-sm text-ink/65">
            {ENDPOINT
              ? "Your enquiry goes straight to the Kahani team. We only use your details to reply."
              : "This opens WhatsApp with your details filled in, ready for you to send. Nothing is stored on this website."}
          </p>
        )}
        {status === "opened" && (
          <p className="rounded-2xl bg-sprout px-4 py-3 text-forest">
            WhatsApp has opened in a new tab with your message. Press send there to reach us. If it didn&rsquo;t open,
            call us on <a href={CONTACT.phoneHref} className="prose-link font-semibold">{CONTACT.phoneDisplay}</a>.
          </p>
        )}
        {status === "sent" && (
          <p className="rounded-2xl bg-sprout px-4 py-3 text-forest">Enquiry sent. We&rsquo;ll be in touch soon.</p>
        )}
        {status === "failed" && (
          <p className="rounded-2xl bg-beak/10 px-4 py-3 text-ink">
            The enquiry didn&rsquo;t go through. Please try again, or call us on{" "}
            <a href={CONTACT.phoneHref} className="prose-link font-semibold">{CONTACT.phoneDisplay}</a>.
          </p>
        )}
      </div>
    </form>
  );
}

const inputCls =
  "mt-2 block min-h-12 w-full rounded-[0.9rem] border-0 bg-paper px-4 py-3 text-ink ring-1 ring-forest/20 transition-shadow duration-200 placeholder:text-ink/40 focus:ring-2 focus:ring-forest focus:outline-none aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-beak";

function Field({
  label,
  name,
  error,
  className,
  ...rest
}: { label: string; name: string; error?: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `f-${name}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="block font-bold text-forest">
        {label}
      </label>
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className={inputCls}
        {...rest}
      />
      {error && (
        <p id={`${id}-err`} className="mt-2 text-sm font-semibold text-beak">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  const id = `f-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block font-bold text-forest">
        {label}
      </label>
      <select id={id} name={name} defaultValue="" className={cn(inputCls, "appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%231F5A35%22 stroke-width=%222.5%22%3E%3Cpath d=%22m6 9 6 6 6-6%22/%3E%3C/svg%3E')] bg-[length:1.1rem] bg-[position:right_1rem_center] bg-no-repeat pr-10")}>
        <option value="">Choose one</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
