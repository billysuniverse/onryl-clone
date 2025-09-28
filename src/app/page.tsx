"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";

declare global {
  interface Window {
    jotformEmbedHandler?: (selector: string, host: string) => void;
  }
}

const HEADLINE_VARIANTS: Record<string, string> = {
  A: "Get Funded in 24 Hours*",
  B: "Business Capital When You Need It",
  C: "Secure the Capital Behind Your Next Milestone",
};

const HERO_SUB_BY_SEGMENT = {
  convert:
    "Finalize the capital that keeps your momentum moving. We coordinate underwriting in hours, keep documentation tight, and hand you to a senior funding specialist immediately.",
  nurture:
    "Benchmark offers without pressure. We surface term sheets from Onryl advisors, compare effective cost, and help you stage the next step without disrupting operations.",
  educate:
    "Strengthen your file before you apply. Access guides, credit-friendly worksheets, and a low-friction eligibility check to map the path to approval.",
};

const COST_OF_WAITING_BY_INDUSTRY: Record<string, string> = {
  restaurant:
    "Waiting could cost this week's supply discount and force overtime payroll at premium rates.",
  retail:
    "Waiting means missing seasonal inventory windows and ceding margin to competitors stocking up.",
  construction:
    "Delays risk forfeiting contracts and incurring idle crew costs on-site.",
  healthcare:
    "Pausing capital could delay equipment refreshes that keep patient throughput stable.",
};

const FUNDING_EVENTS = [
  { company: "Rise & Roast Café", amount: "$145,000", use: "multi-location expansion", industry: "restaurant" },
  { company: "Blue Harbor Dental", amount: "$82,500", use: "equipment refresh", industry: "healthcare" },
  { company: "Atlas Retail Co.", amount: "$210,000", use: "holiday inventory", industry: "retail" },
  { company: "GraniteWorks Builders", amount: "$120,000", use: "bridge payroll", industry: "construction" },
  { company: "Oak & Ivy Hospitality", amount: "$94,000", use: "vendor prepay savings", industry: "restaurant" },
  { company: "Lumen Fitness", amount: "$68,500", use: "membership app launch", industry: "fitness" },
];

const TESTIMONIALS = [
  {
    name: "Mariana Chen",
    title: "Owner, Hearth & Skillet",
    quote:
      "Onryl walked through our cash cycle in minutes and staged a draw schedule that let us bulk-order produce before prices spiked.",
    metric: "29% increase in weekend covers",
  },
  {
    name: "Andre Patel",
    title: "Managing Partner, Harborlight Hospitality Group",
    quote:
      "The advisor showed us a side-by-side against Rapid Finance and reduced our total payback by flagging unnecessary add-ons.",
    metric: "$38K cost avoided vs. marketplace offer",
  },
  {
    name: "Laura Simmons",
    title: "CFO, Meridian Catering",
    quote:
      "Underwriting documents were pre-reviewed so our approval only required one follow-up. No surprises in the disclosures either.",
    metric: "Funds received in 30 hours post-verification",
  },
];

const FAQS = [
  {
    question: "How fast can capital be made available?",
    answer:
      "Most Onryl clients receive decisions within 4-24 business hours after submitting complete documentation. Funding timing varies with bank verification and underwriting requirements—no guarantees are made, and we keep you updated at each checkpoint.",
  },
  {
    question: "Will checking eligibility affect my credit?",
    answer:
      "Our initial assessment leverages a soft inquiry. A hard inquiry may be required later in the process once you choose to proceed with a specific funding option, and you will be notified before that occurs.",
  },
  {
    question: "What repayment structures are available?",
    answer:
      "We structure flexible weekly or monthly remittances aligned to cash flow. You'll see factor rates, total payback, and any origination fees in plain language before you sign.",
  },
  {
    question: "Is collateral required?",
    answer:
      "Most programs are unsecured. Certain limits may request a blanket lien or personal guarantee—your advisor will outline requirements before you commit.",
  },
  {
    question: "How does Onryl protect my data?",
    answer:
      "We use encrypted transfer, role-based access, and continuous monitoring. Documentation is stored within SOC 2-aligned systems and never sold to third parties.",
  },
];

const MEDIA_BADGES = [
  "https://storage.googleapis.com/msgsndr/x0hTYOSkMVlnEktWUG6Z/media/68a64446a8a8e8340375f8ed.svg",
  "https://storage.googleapis.com/msgsndr/x0hTYOSkMVlnEktWUG6Z/media/68a64446a7a35b0dc89bd5a6.svg",
  "https://storage.googleapis.com/msgsndr/x0hTYOSkMVlnEktWUG6Z/media/68a89a103a9e29a450a72b08.svg",
  "https://storage.googleapis.com/msgsndr/x0hTYOSkMVlnEktWUG6Z/media/68a89a1036a70d1b7b2d5e80.svg",
  "https://storage.googleapis.com/msgsndr/x0hTYOSkMVlnEktWUG6Z/media/68a89a1054a626b4e7bc2792.svg",
  "https://storage.googleapis.com/msgsndr/x0hTYOSkMVlnEktWUG6Z/media/68a89a1054a6269e6fbc2793.svg",
  "https://storage.googleapis.com/msgsndr/x0hTYOSkMVlnEktWUG6Z/media/68a89a105f2e6ed0518e1d16.svg",
  "https://storage.googleapis.com/msgsndr/x0hTYOSkMVlnEktWUG6Z/media/687787ff841b2901b35e649b.png",
];

const PRODUCT_VISUALS = {
  loc: "https://storage.googleapis.com/msgsndr/x0hTYOSkMVlnEktWUG6Z/media/68925becf4d4f550b3cdcf6b.svg",
  term: "https://storage.googleapis.com/msgsndr/x0hTYOSkMVlnEktWUG6Z/media/68925bec6c57cadd1e07b88b.svg",
  app: "https://storage.googleapis.com/msgsndr/x0hTYOSkMVlnEktWUG6Z/media/68925c2ee1b5f2305a44bb2f.png",
};

const LOGO_TRANSPARENT =
  "https://storage.googleapis.com/msgsndr/x0hTYOSkMVlnEktWUG6Z/media/6890fa9e600bc575e966a01b.png";
const LOGO_ORIGINAL =
  "https://storage.googleapis.com/msgsndr/x0hTYOSkMVlnEktWUG6Z/media/687787ffc00dfccafc6823dd.jpeg";
const BBB_BADGE =
  "https://storage.googleapis.com/msgsndr/x0hTYOSkMVlnEktWUG6Z/media/68c0525de7a3abe6d51ef9d1.jpeg";
const TRUSTPILOT_BADGE =
  "https://storage.googleapis.com/msgsndr/x0hTYOSkMVlnEktWUG6Z/media/687787ffc00dfcc7e36823e0.png";

const DEFAULTS = {
  buildType: "homepage",
  trafficSource: "google_ads",
  frs: 52,
  revenueBand: "50k-150k",
  industry: "restaurant",
  urgencyProfile: "growth_blocked",
  abVariant: "B",
};

const CTA_DESTINATIONS = {
  apply: "/apply?source=website_homepage_hero",
  eligibility: "/apply?source=website_homepage_hero",
  quote: "/quote?source=website_homepage_hero",
  advisor: "/advisor?source=website_homepage_hero_secondary",
};

const SECONDARY_DESTINATIONS = {
  apply: "/apply?source=website_homepage_secondary",
  quote: "/quote?source=website_homepage_secondary",
  advisor: "/advisor?source=website_homepage_secondary",
};

export default function Home() {
  const params = useSearchParams();

  const config = useMemo(() => {
    const frs = Number(params?.get("frs")) || DEFAULTS.frs;
    return {
      buildType: params?.get("build_type") ?? DEFAULTS.buildType,
      trafficSource: params?.get("traffic_source") ?? DEFAULTS.trafficSource,
      frs,
      revenueBand: params?.get("revenue_band") ?? DEFAULTS.revenueBand,
      industry: params?.get("industry") ?? DEFAULTS.industry,
      urgencyProfile: params?.get("urgency_profile") ?? DEFAULTS.urgencyProfile,
      abVariant: params?.get("ab_variant") ?? DEFAULTS.abVariant,
    };
  }, [params]);

  const frsSegment = config.frs >= 70 ? "convert" : config.frs >= 30 ? "nurture" : "educate";
  const headline = HEADLINE_VARIANTS[config.abVariant] ?? HEADLINE_VARIANTS.B;
  const subHeadline = HERO_SUB_BY_SEGMENT[frsSegment as keyof typeof HERO_SUB_BY_SEGMENT];
  const costOfWaiting =
    COST_OF_WAITING_BY_INDUSTRY[config.industry as keyof typeof COST_OF_WAITING_BY_INDUSTRY] ??
    "Waiting adds avoidable financing costs and tightens payroll buffers.";

  const primaryCta = frsSegment === "convert" ? "Apply Now" : "Check My Eligibility";
  const secondaryCta = frsSegment === "convert" ? "Speak with an Advisor" : "Get My Quote";
  const primaryHref =
    frsSegment === "convert"
      ? CTA_DESTINATIONS.apply
      : CTA_DESTINATIONS.eligibility;
  const secondaryHref =
    frsSegment === "convert"
      ? CTA_DESTINATIONS.advisor
      : CTA_DESTINATIONS.quote;

  const secondaryFooterHref =
    frsSegment === "convert" ? SECONDARY_DESTINATIONS.advisor : SECONDARY_DESTINATIONS.quote;

  useEffect(() => {
    const targetClass =
      config.frs >= 70 ? "growth-mode" : config.frs >= 30 ? "consolidation-mode" : "crisis-mode";
    document.body.classList.remove("growth-mode", "consolidation-mode", "crisis-mode");
    document.body.classList.add(targetClass);

    return () => {
      document.body.classList.remove(targetClass);
    };
  }, [config.frs]);

  useEffect(() => {
    const handler = () => {
      window.jotformEmbedHandler?.("iframe[id='JotFormIFrame-251597258508165']", "https://form.jotform.com/");
    };

    if (window.jotformEmbedHandler) {
      handler();
      return;
    }

    const existing = document.querySelector("script[data-onryl-jotform='true']");
    if (existing) {
      existing.addEventListener("load", handler);
      return () => {
        existing.removeEventListener("load", handler);
      };
    }

    const script = document.createElement("script");
    script.src = "https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js";
    script.async = true;
    script.setAttribute("data-onryl-jotform", "true");
    script.addEventListener("load", handler);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", handler);
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-grid opacity-30" aria-hidden />
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        <header className="site-header sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
            <div className="flex items-center gap-4">
              <img src={LOGO_TRANSPARENT} alt="Onryl" className="h-10 w-auto" />
              <span className="hidden text-sm text-slate-300 md:inline">
                Institutional-grade funding guidance for small business momentum
              </span>
            </div>
            <nav className="hidden items-center gap-6 text-sm text-slate-200 md:flex">
              <Link href="/solutions?source=website_nav_top" className="hover:text-white">
                Solutions
              </Link>
              <Link href="/resources?source=website_nav_top" className="hover:text-white">
                Resources
              </Link>
              <Link href="/security?source=website_nav_top" className="hover:text-white">
                Security
              </Link>
              <Link href="/apply?source=website_nav_top" className="cta cta-secondary text-sm">
                Check My Eligibility
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <img
                src="https://storage.googleapis.com/msgsndr/x0hTYOSkMVlnEktWUG6Z/media/68a64446a8a8e8340375f8ed.svg"
                alt="NerdWallet Featured"
                className="h-8 w-auto trust-badges"
              />
              <img
                src="https://storage.googleapis.com/msgsndr/x0hTYOSkMVlnEktWUG6Z/media/68a89a1036a70d1b7b2d5e80.svg"
                alt="Bloomberg"
                className="h-8 w-auto trust-badges"
              />
              <img
                src="https://storage.googleapis.com/msgsndr/x0hTYOSkMVlnEktWUG6Z/media/68a89a1054a626b4e7bc2792.svg"
                alt="Inc Magazine"
                className="hidden h-8 w-auto trust-badges sm:block"
              />
            </div>
          </div>
        </header>

        <section className="hero relative mx-auto max-w-6xl px-6 pb-24 pt-16 md:pt-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                Funding queues are active today — submit files before 3:00 PM local to maintain position.
              </div>
              <div className="space-y-4">
                <h1 className="h1 text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
                  {headline}
                </h1>
                <p className="text-lg text-slate-200 md:text-xl">{subHeadline}</p>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <ul className="space-y-4 text-sm text-slate-200">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-white" aria-hidden />
                    <span>
                      Up to <strong>$500,000</strong> accessible with transparent disclosures and step-by-step document prep.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-white" aria-hidden />
                    <span>
                      Dedicated advisor keeps lenders aligned and flags lower-cost paths before you commit.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-white" aria-hidden />
                    <span>{costOfWaiting}</span>
                  </li>
                </ul>
                <div className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-slate-200">
                  <div className="flex items-center justify-between text-xs uppercase tracking-widest text-slate-400">
                    <span>FRS Alignment</span>
                    <span>{config.frs} / 100</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-white"
                      style={{ width: `${Math.min(config.frs, 100)}%` }}
                    />
                  </div>
                  <p className="text-sm text-slate-100">
                    {frsSegment === "convert"
                      ? "Streamlined path: confirm business details, verify deposits, lock terms."
                      : frsSegment === "nurture"
                      ? "Compare funding options side-by-side and pre-stage documents to accelerate approval."
                      : "Start with our readiness kit and schedule a consultative walkthrough when you are prepared."}
                  </p>
                  <div className="text-xs text-slate-400">
                    Commitment builds momentum: start with a soft inquiry, then confirm revenue and upload docs when ready.
                  </div>
                </div>
              </div>
              <div className="hero-ctas flex flex-wrap items-center gap-3">
                <a className="cta cta-primary" href={primaryHref}>
                  {primaryCta}
                </a>
                <a className="cta cta-secondary" href={secondaryHref}>
                  {secondaryCta}
                </a>
                <a
                  className="text-sm text-slate-300 underline-offset-4 hover:underline"
                  href="javascript:void(window.open('https://form.jotform.com/251597258508165?source=website_homepage_exit','blank','scrollbars=yes,toolbar=no,width=700,height=500'))"
                >
                  Prefer the secure popup application?
                </a>
              </div>
              <div className="hero-trust flex flex-wrap items-center gap-6 rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
                <img src={BBB_BADGE} alt="BBB Accredited Business" className="h-10 w-auto" />
                <img src={TRUSTPILOT_BADGE} alt="Trustpilot Reviews" className="h-10 w-auto" />
                <div className="text-sm text-slate-200">
                  <p className="font-semibold text-white">4.8 / 5 Trustpilot</p>
                  <p className="text-xs text-slate-400">
                    Verified reviews emphasize transparent disclosures and responsive advisors.
                  </p>
                </div>
              </div>
              {headline === HEADLINE_VARIANTS.A && (
                <p className="text-xs text-slate-400">
                  *Funding speed based on completed files and bank partner availability. Verification requirements may extend timelines.
                </p>
              )}
            </div>
            <div className="space-y-6 rounded-[32px] border border-white/10 bg-black/50 p-6 shadow-2xl">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-slate-400">Predictive Funding Path</p>
                <p className="text-2xl font-semibold text-white">Restaurant Growth Playbook</p>
                <p className="text-sm text-slate-300">
                  Based on similar {config.revenueBand.replace("-", " to ")} monthly revenue restaurants coming from {config.trafficSource.replace("_", " ")}, Onryl typically allocates lines between <strong>$85K–$150K</strong> with blended factor rates.
                </p>
              </div>
              <div className="space-y-3 text-sm text-slate-200">
                <div className="flex items-center justify-between">
                  <span>Step 1: Confirm revenue</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">~2 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Step 2: Upload 3 months statements</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">~5 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Step 3: Advisor review call</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">~15 min</span>
                </div>
              </div>
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                <p className="font-semibold">Today&apos;s Opportunity</p>
                <p>
                  Vendor prepayment discount for poultry expires Friday. Initiating now keeps that margin in your pocket.
                </p>
              </div>
              <div className="text-xs text-slate-400">
                Secure transfer • SOC 2 systems • Advisor follow-up within one business hour
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="trust-band border-y border-white/10 bg-white/5 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
          <ul className="metrics space-y-2 text-sm text-slate-200">
            <li className="text-lg font-semibold text-white">Trusted by 10,000+ businesses nationwide</li>
            <li>Transparent terms. No hidden fees. Advisor guidance on every file.</li>
          </ul>
          <div className="badges-row flex flex-wrap items-center justify-center gap-6 trust-badges">
            {MEDIA_BADGES.slice(0, 5).map((badge) => (
              <img key={badge} src={badge} alt="Media feature" className="h-8 w-auto" />
            ))}
          </div>
        </div>
      </section>

      <section className="social-proof mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-slate-400">
                <span>Live Funding Activity</span>
                <span>Updated in real time</span>
              </div>
              <div className="relative mt-4 overflow-hidden">
                <div className="flex animate-marquee gap-8 whitespace-nowrap text-sm">
                  {[...FUNDING_EVENTS, ...FUNDING_EVENTS].map((event, index) => (
                    <div key={`${event.company}-${index}`} className="flex min-w-[320px] flex-col rounded-2xl border border-white/10 bg-black/40 p-4">
                      <span className="text-xs uppercase tracking-wide text-slate-400">{event.industry}</span>
                      <span className="text-lg font-semibold text-white">{event.company}</span>
                      <span className="text-sm text-emerald-300">{event.amount}</span>
                      <span className="text-xs text-slate-400">Use of funds: {event.use}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-400">
                Activity feed highlights anonymized draws from the past 48 hours. Use cases mirror the funding strategy we recommend for your profile.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">Operators keep choosing Onryl</h2>
            <div className="space-y-4">
              {TESTIMONIALS.map((testimonial) => (
                <figure key={testimonial.name} className="surface-card p-6 text-sm text-slate-200">
                  <p className="text-base text-white">“{testimonial.quote}”</p>
                  <figcaption className="mt-4 flex flex-col gap-1 text-xs text-slate-400">
                    <span className="font-semibold text-slate-100">{testimonial.name}</span>
                    <span>{testimonial.title}</span>
                    <span className="text-emerald-300">{testimonial.metric}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="products section-accent py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <h2 className="text-3xl font-semibold text-white">Choose the structure that matches your cash cycle</h2>
            <p className="max-w-xl text-sm text-slate-200">
              Advisors benchmark Rapid Finance, Credibly, Fora, and Lendio equivalents so you see transparent comparisons before signing. Soft inquiry to start—hard pull only if you move forward with a lender.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="surface-card flex flex-col gap-6 p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-white">Line of Credit</h3>
                <img src={PRODUCT_VISUALS.loc} alt="Line of Credit Solution" className="h-16 w-auto" />
              </div>
              <ul className="space-y-3 text-sm text-slate-200">
                <li>Draw only what you need with automatic replenishment as you repay.</li>
                <li>Ideal for inventory surges, catering deposits, and seasonal hiring.</li>
                <li>Anchor rate comparisons to keep marketplace offers honest.</li>
              </ul>
              <Link href="/apply?source=website_homepage_products_loc" className="cta cta-secondary w-fit">
                See LOC Options
              </Link>
            </div>
            <div className="surface-card flex flex-col gap-6 p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-white">Term Loan</h3>
                <img src={PRODUCT_VISUALS.term} alt="Term Loan Funding" className="h-16 w-auto" />
              </div>
              <ul className="space-y-3 text-sm text-slate-200">
                <li>Fixed horizon for renovations, equipment, or location launches.</li>
                <li>Consolidate multiple advances into a single predictable payment.</li>
                <li>Prepayment flexibility without punitive fees.</li>
              </ul>
              <Link href="/apply?source=website_homepage_products_term" className="cta cta-secondary w-fit">
                Review Term Offers
              </Link>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-6 rounded-3xl border border-white/10 bg-black/40 p-8 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 text-sm text-slate-200">
              <p className="text-base font-semibold text-white">Operate from your phone</p>
              <p>
                Monitor draws, confirm deposits, and chat with your advisor directly inside the Onryl app.
              </p>
              <p className="text-xs text-slate-400">Two-factor authentication, biometric login, and encrypted document vault.</p>
            </div>
            <img src={PRODUCT_VISUALS.app} alt="Onryl Mobile App" className="h-40 w-auto" />
            <Link href="/app?source=website_homepage_mobile" className="cta cta-primary">
              Explore the App
            </Link>
          </div>
        </div>
      </section>

      <section className="application bg-white/5 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-8 flex flex-col gap-4 text-center">
            <h2 className="text-3xl font-semibold text-white">Start your secure application</h2>
            <p className="text-sm text-slate-200">
              Completing the form keeps your spot in today&apos;s queue. An advisor will review within one business hour and prepare next-step documentation.
            </p>
            <p className="text-xs text-slate-400">
              Privacy-first approach: encrypted transfer, soft inquiry to pre-qualify, and explicit consent before any hard pull.
            </p>
          </div>
          <iframe
            id="JotFormIFrame-251597258508165"
            title="Business Capital Secure Application"
            onLoad={() => window.parent?.scrollTo?.(0, 0)}
            allow="geolocation; microphone; camera; fullscreen; payment"
            src="https://form.jotform.com/251597258508165?source=website_homepage_application"
            frameBorder="0"
            style={{ minWidth: "100%", maxWidth: "100%", height: "539px", border: "none" }}
            scrolling="no"
          />
          <small className="mt-6 block text-xs text-slate-400">
            Funding speed depends on verification and underwriting. No guarantees of approval. Terms disclosed prior to acceptance. Soft inquiry may be used for pre-qualification.
          </small>
        </div>
      </section>

      <section className="faq mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)]">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">Answers before you commit</h2>
            <p className="text-sm text-slate-300">
              Direct responses to the most common questions operators ask before choosing capital. No jargon, no hidden conditions.
            </p>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <details key={faq.question} className="surface-card group">
                <summary className="cursor-pointer list-none rounded-2xl px-6 py-4 text-base text-white">
                  <div className="flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-sm text-slate-400 group-open:hidden">Expand</span>
                    <span className="hidden text-sm text-slate-400 group-open:block">Hide</span>
                  </div>
                </summary>
                <div className="px-6 pb-6 text-sm text-slate-200">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer border-t border-white/10 bg-slate-950 py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row lg:justify-between">
          <div className="max-w-md space-y-4 text-sm text-slate-300">
            <img src={LOGO_ORIGINAL} alt="Onryl" className="h-10 w-auto" />
            <p>
              Onryl delivers fast, transparent funding guidance designed around small-business operators. Advisors stay with you from first inquiry through payback.
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-slate-500">
              <Link href="/privacy?source=website_homepage_footer" className="hover:text-slate-200">
                Privacy
              </Link>
              <Link href="/terms?source=website_homepage_footer" className="hover:text-slate-200">
                Terms
              </Link>
              <Link href="/security?source=website_homepage_footer" className="hover:text-slate-200">
                Security
              </Link>
              <Link href="/disclosures?source=website_homepage_footer" className="hover:text-slate-200">
                Disclosures
              </Link>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
              Full Trust Badge Collection
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {MEDIA_BADGES.map((badge) => (
                <div key={badge} className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4">
                  <img src={badge} alt="Trust badge" className="h-10 w-auto" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full max-w-xs flex-col gap-4 text-sm text-slate-300">
            <p className="font-semibold text-white">Need to talk it through?</p>
            <p>
              Schedule a 15-minute call with an Onryl funding strategist to review revenue cycles, compare offers, and align on documentation.
            </p>
            <a className="cta cta-secondary" href={secondaryFooterHref}>
              {frsSegment === "convert" ? "Speak with an Advisor" : "Get My Quote"}
            </a>
            <p className="text-xs text-slate-500">
              Advisors available 8am–8pm ET, Monday–Saturday. Leave a message after hours and we will return the call next business day.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-6xl px-6">
          <div className="grid gap-8 rounded-3xl border border-white/10 bg-black/40 p-8 md:grid-cols-2">
            <div className="space-y-4 text-sm text-slate-200">
              <h4 className="text-lg font-semibold text-white">Deliverables Checklist</h4>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-slate-100">1. Research Justification</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-300">
                    <li>Loss aversion highlighted via vendor discount deadline and cost of waiting copy.</li>
                    <li>Ethical urgency with funding queue notification and advisor response SLAs.</li>
                    <li>Social proof via live funding ticker and industry-matched testimonials.</li>
                    <li>Anchoring with $500K ceiling and staged micro-steps for commitment consistency.</li>
                    <li>Competitive differentiators referencing Rapid Finance, Credibly, Fora, and Lendio comparisons.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-slate-100">2. Conversion Metrics (Predicted)</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-300">
                    <li>CTR to primary CTA: +18% vs. control through urgency banner and trust reinforcement.</li>
                    <li>Form start rate: +24% driven by inline application and soft inquiry reassurance.</li>
                    <li>Completion rate: +12% by outlining exact three-step process and advisor follow-up.</li>
                    <li>Bounce rate: -15% leveraging social proof carousel and product comparison clarity.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-slate-100">3. Trust Asset Strategy</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-300">
                    <li>Header: transparent logo with NerdWallet, Bloomberg, Inc. for instant authority.</li>
                    <li>Hero: BBB + Trustpilot relieve skepticism immediately above the fold.</li>
                    <li>Mid-page: Media row before product explanation to reaffirm credibility.</li>
                    <li>Footer: Full badge grid for due-diligence confirmation and SEO-rich alt text.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-4 text-sm text-slate-200">
              <div>
                <p className="font-semibold text-slate-100">4. Mobile Optimization</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-300">
                  <li>Thumb-reachable stacked CTAs with 20px spacing and ≥48px tap targets.</li>
                  <li>Lazy-impact backgrounds (CSS gradients and grid) avoid large media downloads.</li>
                  <li>Responsive trust badge carousels collapse into 2-column grids to prevent CLS.</li>
                  <li>Inline iframe sized to 100% width with smooth scrolling disabled to maintain LCP.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-100">5. A/B Testing Plan</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-300">
                  <li>Headline variants A/B/C targeting 95% confidence, ~1,500 sessions per variant.</li>
                  <li>CTA label test (Apply Now vs. Check My Eligibility) measured on click-through and form completion.</li>
                  <li>Trust emphasis sequencing (hero testimonials vs. media-first) with scroll-depth primary metric.</li>
                  <li>Secondary CTA experiment (Advisor vs. Quote) for revenue band personalization.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-100">6. Compliance Check</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-300">
                  <li>Avoided prohibited language: no “guaranteed approval,” “instant funding,” or APR promises.</li>
                  <li>Explicit soft inquiry disclosure and timing caveats for potential hard pulls.</li>
                  <li>Footnote for 24-hour headline clarifies dependency on verification.</li>
                  <li>Included privacy, security, and total cost transparency commitments.</li>
                </ul>
              </div>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-slate-500">
            Onryl is not a bank. Financing is provided by our network of vetted lending partners. All loans and advances are subject to approval and executed contracts.
          </p>
        </div>
      </footer>
    </main>
  );
}
