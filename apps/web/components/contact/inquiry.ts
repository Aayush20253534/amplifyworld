import { SERVICES } from "@amplifyworld/shared";

export const INQUIRY_FIELDS = ["name", "email", "phone", "company", "service", "message"] as const;
export type InquiryField = (typeof INQUIRY_FIELDS)[number];
export type InquiryValues = Record<InquiryField, string>;
export type InquiryErrors = Partial<Record<InquiryField, string>>;

export const EMPTY_INQUIRY: InquiryValues = {
  name: "", email: "", phone: "", company: "", service: "", message: ""
};

export const INQUIRY_LABELS: Record<InquiryField, string> = {
  name: "Full Name", email: "Email Address", phone: "Phone Number",
  company: "Company / Brand Name", service: "Service Interested In", message: "Project Details"
};

export const INQUIRY_LIMITS = { name: 100, email: 254, phone: 40, company: 150, message: 5000 } as const;

export function normalizeInquiry(values: InquiryValues): InquiryValues {
  return Object.fromEntries(INQUIRY_FIELDS.map((field) => [field, values[field].trim()])) as InquiryValues;
}

/** Frontend policy, to be reconciled with server validation in Module 12. */
export function validateInquiry(input: InquiryValues): InquiryErrors {
  const values = normalizeInquiry(input);
  const errors: InquiryErrors = {};
  if (!values.name) errors.name = "Enter your full name.";
  else if (values.name.length > INQUIRY_LIMITS.name) errors.name = "Use 100 characters or fewer.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address.";
  else if (values.email.length > INQUIRY_LIMITS.email) errors.email = "Use 254 characters or fewer.";
  if (values.phone && (
    !/^\+?[\d\s().-]+$/.test(values.phone) ||
    !/^\d{7,15}$/.test(values.phone.replace(/\D/g, "")) ||
    values.phone.length > INQUIRY_LIMITS.phone
  )) errors.phone = "Enter 7–15 digits, with an optional country code, spaces, brackets or hyphens.";
  if (values.company.length > INQUIRY_LIMITS.company) errors.company = "Use 150 characters or fewer.";
  if (values.service !== "not-sure" && !SERVICES.some((service) => service.id === values.service)) {
    errors.service = "Select a service, or choose Not sure yet.";
  }
  if (values.message.length < 20) errors.message = "Tell us a little more: use at least 20 characters.";
  else if (values.message.length > INQUIRY_LIMITS.message) errors.message = "Use 5,000 characters or fewer.";
  return errors;
}

/**
 * Frontend integration seam, NOT an HTTP API contract. There is no inquiry API
 * on main yet. A future client adapter must resolve `accepted` only after the
 * backend confirms durable receipt, and map server validation to known fields.
 * No production adapter, demo transport or environment toggle is provided.
 */
export type InquiryResult =
  | { status: "accepted" }
  | { status: "invalid"; errors: InquiryErrors };
export type InquirySubmitter = (values: InquiryValues, signal: AbortSignal) => Promise<InquiryResult>;

export const SUBMISSION_TIMEOUT_MS = 20_000;

/** Bound a future request even if its transport fails to honour cancellation. */
export async function submitWithDeadline(
  submit: InquirySubmitter, values: InquiryValues, controller: AbortController,
  timeoutMs = SUBMISSION_TIMEOUT_MS
): Promise<InquiryResult> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(() => {
      controller.abort();
      reject(new Error("Inquiry confirmation timed out"));
    }, timeoutMs);
  });
  try {
    return await Promise.race([submit(values, controller.signal), deadline]);
  } finally {
    clearTimeout(timer);
  }
}
