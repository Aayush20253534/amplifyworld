import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import { absolutePublicUrl, marketingWebPage } from "@/lib/site";

const description = "AmplifyWorld offers SEO, Google Business Profile optimization, Meta Ads, social media marketing, custom websites and AI automation for businesses in Prayagraj, Uttar Pradesh.";
const canonical = absolutePublicUrl("/prayagraj");
export const metadata: Metadata = {
  title: "Digital Marketing Agency in Prayagraj | SEO & Meta Ads",
  description,
  ...(canonical ? { alternates: { canonical }, openGraph: { title: "Digital Marketing Agency in Prayagraj | AmplifyWorld", description, url: canonical } } : {})
};
export default function PrayagrajPage() {
  const services = [
    ["Local SEO and Google Business Profile", "Improve your business information, local landing pages and Google Maps discovery."],
    ["SEO, GEO and AEO", "Organize useful content and technical foundations for search engines and AI-assisted discovery."],
    ["Meta Ads and performance marketing", "Plan measurable Facebook and Instagram advertising campaigns with relevant creative."],
    ["Custom website development", "Build responsive, accessible websites with clear conversion paths."],
    ["Social media marketing", "Plan content, creative production and consistent channel management."],
    ["AI automation", "Explore practical AI assistants and business workflow automation."]
  ];
  return <main id="main-content" className="content-shell" style={{paddingBlock:"clamp(70px,9vw,135px)"}}>
    <StructuredData data={marketingWebPage("/prayagraj", "Digital Marketing Agency in Prayagraj | AmplifyWorld", description)} />
    <p className="eyebrow">Prayagraj, Uttar Pradesh</p>
    <h1>Digital Marketing Agency in <span className="gradient-text">Prayagraj</span></h1>
    <p style={{maxWidth:760,lineHeight:1.8,marginTop:24}}>{description} We work with local businesses looking to improve online visibility, enquiries and their digital customer experience.</p>
    <h2 style={{marginTop:64}}>Digital growth services for Prayagraj businesses</h2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,290px),1fr))",gap:18,marginTop:24}}>
      {services.map(([name,detail])=><article key={name} style={{padding:24,border:"1px solid #54336b",borderRadius:18,background:"#130c21"}}><h3>{name}</h3><p style={{lineHeight:1.7}}>{detail}</p></article>)}
    </div>
    <h2 style={{marginTop:64}}>Local strategy, broader reach</h2>
    <p style={{maxWidth:760,lineHeight:1.8}}>Whether you serve customers in Prayagraj or across India and international markets, we can discuss a plan tailored to your audience, channels and business goals. Search visibility and advertising results depend on competition, content quality and ongoing execution.</p>
    <p style={{marginTop:30}}><Link href="/services">Explore all services →</Link> &nbsp; <Link href="/contact">Contact AmplifyWorld →</Link></p>
  </main>;
}
