"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MoveRight, X, CheckCircle2 } from "lucide-react";

interface Props {
  businessName: string;
  primaryColor: string;
  stripeDepositLink: string | null;
  calKickoffLink: string | null;
  onPrimaryClick: (state: "pre" | "post") => void;
  onDepositSuccessViewed: () => void;
  /**
   * Which part of the CTA UI to render.
   *  - "banner" renders only the fixed-top success banner (only visible on ?deposit=success)
   *  - "section" renders the main bottom-of-page commitment block
   */
  part?: "banner" | "section";
}

/**
 * Section G: Commitment CTA block with pre/post-deposit state machine.
 *  - Default: "Reserve this build — $500 deposit" + reply-to-email.
 *  - With ?deposit=success: confirmation banner + "Book your kickoff call".
 * See docs/medspa-demo-template-spec.md Section G.
 */
export default function MedspaCTA({
  businessName,
  primaryColor,
  stripeDepositLink,
  calKickoffLink,
  onPrimaryClick,
  onDepositSuccessViewed,
  part = "section",
}: Props) {
  const searchParams = useSearchParams();
  const isDepositSuccess = searchParams.get("deposit") === "success";
  const [bannerOpen, setBannerOpen] = useState(true);

  useEffect(() => {
    // Only fire the event once, from the banner render (which always mounts first).
    if (isDepositSuccess && part === "banner") onDepositSuccessViewed();
  }, [isDepositSuccess, onDepositSuccessViewed, part]);

  const mailtoHref = `mailto:hello@flynerd.tech?subject=${encodeURIComponent(
    `Questions about our proposal - ${businessName}`
  )}`;

  const depositDisabled = !stripeDepositLink;
  const kickoffDisabled = !calKickoffLink;

  if (part === "banner") {
    if (!isDepositSuccess || !bannerOpen) return null;
    return (
      <div
        className="fixed top-0 left-0 right-0 z-40 px-6 md:px-10 py-3 border-b shadow-sm"
        style={{
          backgroundColor: primaryColor,
          borderColor: "rgba(0,0,0,0.08)",
        }}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-white">
            <CheckCircle2 size={18} />
            <p className="text-sm font-semibold">Payment confirmed. Book your kickoff call →</p>
          </div>
          <div className="flex items-center gap-3">
            {kickoffDisabled ? (
              <span className="text-xs text-white/80">
                We will send the link by email within the hour.
              </span>
            ) : (
              <a
                href={calKickoffLink!}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onPrimaryClick("post")}
                className="inline-flex items-center gap-1.5 bg-white text-xs font-bold px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                style={{ color: primaryColor }}
              >
                Book kickoff <MoveRight size={13} />
              </a>
            )}
            <button
              aria-label="Dismiss banner"
              onClick={() => setBannerOpen(false)}
              className="text-white/80 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // part === "section" — main bottom-of-page CTA block
  return (
    <section
      id="commit"
      className="py-20 md:py-28 px-6 md:px-10 border-t"
      style={{ borderColor: "#E8E5DF", backgroundColor: "#FAF9F6" }}
    >
      <div className="max-w-[760px] mx-auto text-center">
        {isDepositSuccess ? (
          <PostDepositBlock
            primaryColor={primaryColor}
            calKickoffLink={calKickoffLink}
            mailtoHref={mailtoHref}
            kickoffDisabled={kickoffDisabled}
            onPrimaryClick={() => onPrimaryClick("post")}
          />
        ) : (
          <PreDepositBlock
            businessName={businessName}
            primaryColor={primaryColor}
            stripeDepositLink={stripeDepositLink}
            mailtoHref={mailtoHref}
            depositDisabled={depositDisabled}
            onPrimaryClick={() => onPrimaryClick("pre")}
          />
        )}
      </div>
    </section>
  );
}

function PreDepositBlock({
  businessName,
  primaryColor,
  stripeDepositLink,
  mailtoHref,
  depositDisabled,
  onPrimaryClick,
}: {
  businessName: string;
  primaryColor: string;
  stripeDepositLink: string | null;
  mailtoHref: string;
  depositDisabled: boolean;
  onPrimaryClick: () => void;
}) {
  return (
    <>
      <p
        className="text-xs uppercase tracking-[0.18em] font-medium mb-4"
        style={{ color: primaryColor }}
      >
        Reserve your build
      </p>
      <h2
        className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-5"
        style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, color: "#1A1A1A" }}
      >
        Ready to make this yours?
      </h2>
      <p className="text-base md:text-lg leading-relaxed mb-10" style={{ color: "#555555" }}>
        Put a $500 deposit on your build. We start the week your deposit clears. Deposit is credited toward the full project. If {businessName} decides it is not the right fit, we refund.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        {depositDisabled ? (
          <span
            className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-full text-sm text-white opacity-50 cursor-not-allowed"
            style={{ backgroundColor: primaryColor }}
            title="Deposit link not configured"
          >
            Reserve this build, $500 deposit <MoveRight size={16} />
          </span>
        ) : (
          <a
            href={stripeDepositLink!}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onPrimaryClick}
            className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-full text-sm text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: primaryColor }}
          >
            Reserve this build, $500 deposit <MoveRight size={16} />
          </a>
        )}
        <a
          href={mailtoHref}
          className="text-sm underline underline-offset-4"
          style={{ color: "#555555" }}
        >
          Questions? Reply to our email.
        </a>
      </div>
    </>
  );
}

function PostDepositBlock({
  primaryColor,
  calKickoffLink,
  mailtoHref,
  kickoffDisabled,
  onPrimaryClick,
}: {
  primaryColor: string;
  calKickoffLink: string | null;
  mailtoHref: string;
  kickoffDisabled: boolean;
  onPrimaryClick: () => void;
}) {
  return (
    <>
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs uppercase tracking-[0.18em] font-medium mb-6"
        style={{
          backgroundColor: `${primaryColor}14`,
          color: primaryColor,
          border: `1px solid ${primaryColor}33`,
        }}
      >
        <CheckCircle2 size={13} /> Payment confirmed
      </div>
      <h2
        className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-5"
        style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, color: "#1A1A1A" }}
      >
        Let us kick this off.
      </h2>
      <p className="text-base md:text-lg leading-relaxed mb-3" style={{ color: "#555555" }}>
        Book a 30-minute kickoff call. We confirm scope, gather assets, and set the build calendar.
      </p>
      <p className="text-sm leading-relaxed mb-10" style={{ color: "#555555" }}>
        We also emailed you this same link. If it does not arrive in 5 minutes, reply to this demo's email and we will resend.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        {kickoffDisabled ? (
          <span
            className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-full text-sm text-white opacity-50 cursor-not-allowed"
            style={{ backgroundColor: primaryColor }}
            title="Kickoff link not configured"
          >
            Book your kickoff call <MoveRight size={16} />
          </span>
        ) : (
          <a
            href={calKickoffLink!}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onPrimaryClick}
            className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-full text-sm text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: primaryColor }}
          >
            Book your kickoff call <MoveRight size={16} />
          </a>
        )}
        <a
          href={mailtoHref}
          className="text-sm underline underline-offset-4"
          style={{ color: "#555555" }}
        >
          Not ready yet? Reply to our email.
        </a>
      </div>
    </>
  );
}
