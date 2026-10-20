import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { SectionReveal } from "@/components/home/section-reveal";
import { getWhatsAppHref, WhatsAppCta } from "@/components/whatsapp-cta";

export const metadata: Metadata = {
  title: "Contact",
  description: "Explore a conversation with AmplifyWorld about strategy, marketing and technology. Prepare your project inquiry and check available contact options."
};

const nextSteps = [
  { title: "We Review Your Inquiry", text: "We understand your business, requirements and goals." },
  { title: "We Connect With You", text: "We discuss your project and explore the right opportunities." },
  { title: "We Plan Your Growth Roadmap", text: "We shape a practical approach around your priorities." }
];

export default function ContactPage() {
  const whatsappAvailable = Boolean(getWhatsAppHref(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER));

  return (
    <main className="contact-page">
      <section className="contact-hero" aria-labelledby="contact-title">
        <div className="content-shell contact-hero-grid">
          <div className="contact-hero-copy">
            <p className="eyebrow">Let’s connect</p>
            <h1 id="contact-title">Contact<br /><span className="gradient-text">AmplifyWorld</span></h1>
            <p className="contact-intro">Have a project in mind or want to grow your business?
              Let’s talk about strategy, marketing, websites and the possibilities ahead.</p>
            <div className="contact-actions">
              <WhatsAppCta label="Talk to Amplify World" />
              <a className="contact-secondary" href="#inquiry">Send Your Inquiry <span aria-hidden="true">↓</span></a>
            </div>
            <p className="contact-availability">
              Online submission is not available yet.
              {!whatsappAvailable && " WhatsApp will open once our verified business number is configured."}
            </p>
          </div>
          <div className="contact-art" aria-hidden="true">
            <Image src="/design/about/earth-beauty-1200.webp" alt="" width={1200} height={1200}
              className="contact-earth" priority sizes="(max-width: 639px) 82vw, 45vw" />
            <Image src="/design/scene/orbits.svg" alt="" width={800} height={600} className="contact-orbits" />
            <Image src="/design/scene/mountain-main-640.webp" alt="" width={640} height={480}
              className="contact-mountain" sizes="(max-width: 639px) 100vw, 50vw" />
            <Image src="/design/artwork/contact-envelope.svg" alt="" width={800} height={600}
              className="contact-envelope" />
            <p className="contact-art-caption">Your vision.<br />Our expertise.</p>
          </div>
        </div>
      </section>

      <div className="content-shell">
        <SectionReveal>
          <section className="contact-section" aria-labelledby="contact-choices-title">
            <div className="contact-section-heading" data-reveal>
              <div><p className="eyebrow">Start the conversation</p>
                <h2 id="contact-choices-title">Your Next Chapter<br /><span className="gradient-text">Starts Here.</span></h2></div>
              <p>Bring your ambitions. Let’s explore the possibilities together.</p>
            </div>
            <div className="contact-channels">
              <article className="contact-card contact-channel" data-reveal>
                <Image src="/design/icons/whatsapp.svg" alt="" width={32} height={32} className="contact-icon" />
                <div><h3>Talk on WhatsApp</h3>
                  <p>{whatsappAvailable ? "For a direct conversation about your goals." : "Our verified business WhatsApp number is not configured yet."}</p>
                  <WhatsAppCta label="Talk to Amplify World" className="contact-channel-cta" />
                </div>
              </article>
              <a className="contact-card contact-channel" href="#inquiry" data-reveal>
                <Image src="/design/icons/mail.svg" alt="" width={32} height={32} className="contact-icon" />
                <div><h3>Share Your Project</h3>
                  <p>Prepare and check your project details. Online submission is not open yet.</p>
                  <span className="contact-text-link">View inquiry form <span aria-hidden="true">↓</span></span>
                </div>
              </a>
            </div>
          </section>
        </SectionReveal>

        <section className="contact-section contact-form-section" id="inquiry" aria-labelledby="inquiry-title">
          <div className="contact-grid">
            <InquiryForm />
            <aside aria-labelledby="contact-next-title">
              <div className="contact-card contact-next">
                <p className="eyebrow">A simple process</p>
                <h2 id="contact-next-title">What Happens<br /><span className="gradient-text">Next?</span></h2>
                <p>Once inquiries open, this is how we plan to start the conversation.</p>
                <ol>{nextSteps.map((step, index) => (
                  <li key={step.title}>
                    <span className="contact-step-number" aria-hidden="true">0{index + 1}</span>
                    <div><h3>{step.title}</h3><p>{step.text}</p></div>
                  </li>
                ))}</ol>
              </div>
              <div className="contact-aside-note">
                <h3>Built around your business.</h3>
                <p>Strategic guidance. Connected expertise. A clear next step.</p>
                <p>Inquiry delivery is coming soon. No response time is promised while contact services are unavailable.</p>
              </div>
            </aside>
          </div>
        </section>

        <SectionReveal>
          <section className="contact-final-cta" aria-labelledby="contact-final-title" data-reveal>
            <h2 id="contact-final-title">Ready to <span className="gradient-text">Amplify</span> Your Business?</h2>
            <p>Let’s build a thoughtful path to growth through strategy, technology and marketing.</p>
            <div className="contact-actions">
              <WhatsAppCta label="Talk to Amplify World" />
              <Link className="contact-secondary" href="/portfolio">Explore Our Work <span aria-hidden="true">↗</span></Link>
            </div>
            {!whatsappAvailable && <p className="contact-availability">WhatsApp is awaiting a verified business number.</p>}
          </section>
        </SectionReveal>
      </div>
    </main>
  );
}
