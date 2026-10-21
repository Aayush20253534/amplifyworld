import "./setup-dom";
import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { cleanup, fireEvent, render, waitFor, act } from "@testing-library/react";
import { InquiryForm } from "../components/contact/inquiry-form";
import { getOfficialWhatsAppHref, getWhatsAppHref } from "../components/whatsapp-cta";
import {
  EMPTY_INQUIRY, normalizeInquiry, validateInquiry, submitWithDeadline,
  type InquiryResult, type InquirySubmitter
} from "../components/contact/inquiry";

afterEach(cleanup);

test("WhatsApp only builds a direct encoded URL for an explicitly configured international number", () => {
  for (const number of [undefined, "", "pending", "+000000000", "123", "https://example.org", "44 7700 900123"]) {
    assert.equal(getWhatsAppHref(number), null);
  }
  // Reserved UK drama number used only as a format fixture, never production configuration.
  const url = new URL(getWhatsAppHref("+447700900123")!);
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/447700900123");
  assert.equal(url.searchParams.get("text"), "Hello AmplifyWorld, I'd like to discuss growing my business.");
});

test("verified AmplifyWorld WhatsApp fallback remains usable when no override is set", () => {
  const defaultUrl = new URL(getOfficialWhatsAppHref("")!);
  assert.equal(defaultUrl.origin, "https://wa.me");
  assert.equal(defaultUrl.pathname, "/918931801405");
  assert.equal(defaultUrl.searchParams.get("text"), "Hello AmplifyWorld, I'd like to discuss growing my business.");
  assert.equal(new URL(getOfficialWhatsAppHref("+447700900123")!).pathname, "/447700900123");
  assert.equal(getOfficialWhatsAppHref("invalid"), null);
});

const valid = {
  name: "  Sample Person  ", email: "  person@example.org  ", phone: "", company: "",
  service: "website", message: "  We need a website that explains our services clearly.  "
};

function fill(container: HTMLElement) {
  for (const [name, value] of Object.entries(valid)) {
    const control = container.querySelector(`[name="${name}"]`) as HTMLInputElement;
    fireEvent.change(control, { target: { value } });
  }
}

test("validation rejects missing, malformed, unknown and overlong fields without requiring optional data", () => {
  assert.deepEqual(Object.keys(validateInquiry(EMPTY_INQUIRY)), ["name", "email", "service", "message"]);
  assert.deepEqual(validateInquiry(valid), {});
  assert.equal(normalizeInquiry(valid).email, "person@example.org");
  assert.deepEqual(validateInquiry({ ...valid, service: "not-sure", name: "李" }), {});
  for (const email of ["bad", "a@@b.com", "person @example.org", "a@b", "x".repeat(250) + "@a.org"]) {
    assert.ok(validateInquiry({ ...valid, email }).email, email);
  }
  for (const phone of ["abcdefghi", "123", "+1234567890123456", "123+456789"]) {
    assert.ok(validateInquiry({ ...valid, phone }).phone, phone);
  }
  assert.deepEqual(validateInquiry({ ...valid, phone: "+44 (20) 7946-0123" }), {});
  for (const [field, value] of [
    ["name", "x".repeat(101)], ["company", "x".repeat(151)], ["message", " ".repeat(30)],
    ["message", "x".repeat(5001)], ["service", "invented"]
  ]) assert.ok(validateInquiry({ ...valid, [field!]: value })[field as keyof typeof valid]);
});

test("empty submission has inline errors, links and focus on the first invalid field", async () => {
  const view = render(<InquiryForm />);
  fireEvent.submit(view.container.querySelector("form")!);
  await waitFor(() => assert.equal(document.activeElement?.id, "inquiry-name"));
  assert.ok(view.getByRole("alert"));
  assert.equal(view.getByRole("textbox", { name: "Full Name" }).getAttribute("aria-invalid"), "true");
  fireEvent.click(view.getByRole("link", { name: /Email Address: Enter a valid/ }));
  assert.equal(document.activeElement?.id, "inquiry-email");
});

test("production form validates locally, never reports success and retains all values", async () => {
  const view = render(<InquiryForm />);
  fill(view.container);
  fireEvent.submit(view.container.querySelector("form")!);
  await waitFor(() => assert.match(view.getByRole("status").textContent!, /Nothing has been sent/));
  assert.equal(document.activeElement, view.getByRole("status"));
  assert.equal((view.getByRole("textbox", { name: "Email Address" }) as HTMLInputElement).value, valid.email.trim());
  assert.ok(view.getByRole("button", { name: /Check Inquiry/ }));
  assert.equal(view.queryByText(/inquiry has been received/i), null);
});

test("pending submissions are locked synchronously and success requires explicit acceptance", async () => {
  let finish!: (result: InquiryResult) => void;
  let calls = 0;
  const submit: InquirySubmitter = (values) => {
    calls++;
    assert.deepEqual(values, normalizeInquiry(valid));
    return new Promise((resolve) => { finish = resolve; });
  };
  const view = render(<InquiryForm submitInquiry={submit} />);
  fill(view.container);
  const form = view.container.querySelector("form")!;
  act(() => { fireEvent.submit(form); fireEvent.submit(form); });
  assert.equal(calls, 1);
  assert.equal(form.getAttribute("aria-busy"), "true");
  assert.equal((view.getByRole("button", { name: /Sending/ }) as HTMLButtonElement).disabled, true);
  await act(async () => { finish({ status: "accepted" }); });
  assert.match(view.getByRole("status").textContent!, /has been received/);
  fireEvent.submit(form);
  assert.equal(calls, 1);
  fireEvent.click(view.getByRole("button", { name: "Start another inquiry" }));
  await waitFor(() => assert.equal(document.activeElement?.id, "inquiry-name"));
  assert.equal((view.getByRole("textbox", { name: "Full Name" }) as HTMLInputElement).value, "");
});

test("failure preserves inputs, allows an explicit retry and never displays raw errors", async () => {
  let calls = 0;
  const submit: InquirySubmitter = async () => {
    calls++;
    if (calls === 1) throw new Error("private server diagnostics");
    return { status: "accepted" };
  };
  const view = render(<InquiryForm submitInquiry={submit} />);
  fill(view.container);
  fireEvent.submit(view.container.querySelector("form")!);
  await waitFor(() => assert.match(view.getByRole("status").textContent!, /couldn’t confirm receipt/));
  assert.equal((view.getByRole("textbox", { name: "Project Details" }) as HTMLTextAreaElement).value, valid.message);
  assert.equal(view.queryByText("private server diagnostics"), null);
  fireEvent.click(view.getByRole("button", { name: /Try Again/ }));
  await waitFor(() => assert.match(view.getByRole("status").textContent!, /has been received/));
  assert.equal(calls, 2);
});

test("server validation maps to linked inline errors and moves focus", async () => {
  const view = render(<InquiryForm submitInquiry={async () => ({
    status: "invalid", errors: { email: "Check this address before trying again." }
  })} />);
  fill(view.container);
  fireEvent.submit(view.container.querySelector("form")!);
  await waitFor(() => assert.equal(document.activeElement?.id, "inquiry-email"));
  assert.match(view.getByRole("alert").textContent!, /Check this address/);
  assert.equal(view.getByRole("textbox", { name: "Email Address" }).getAttribute("aria-invalid"), "true");
});

test("a malformed acknowledgement cannot produce success", async () => {
  const view = render(<InquiryForm submitInquiry={async () => undefined as unknown as InquiryResult} />);
  fill(view.container);
  fireEvent.submit(view.container.querySelector("form")!);
  await waitFor(() => assert.match(view.getByRole("status").textContent!, /couldn’t confirm receipt/));
});

test("unmount aborts an active request", async () => {
  let signal: AbortSignal | undefined;
  let finish!: (result: InquiryResult) => void;
  const view = render(<InquiryForm submitInquiry={(_values, nextSignal) => {
    signal = nextSignal;
    return new Promise((resolve) => { finish = resolve; });
  }} />);
  fill(view.container);
  fireEvent.submit(view.container.querySelector("form")!);
  view.unmount();
  assert.equal(signal?.aborted, true);
  await act(async () => { finish({ status: "accepted" }); });
});

test("deadline cancels an unresponsive transport and rejects rather than simulating success", async () => {
  const controller = new AbortController();
  await assert.rejects(submitWithDeadline(() => new Promise(() => {}), valid, controller, 5), /timed out/);
  assert.equal(controller.signal.aborted, true);
});
