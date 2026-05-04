import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { Ornament } from "@/components/ornament";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Raaga Sudha Sabha — for partnerships, artist enquiries, donations and rasika questions.",
};

const ORG_EMAIL = "info@raagasudhasabha.org";
const ORG_ADDRESS_LINES = [
  "Raaga Sudha Sabha",
  "1101 Hoskins Lane",
  "San Ramon, CA, USA",
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-pink bg-cream">
        <div className="container-edge py-14 md:py-20">
          <p className="kicker">In Touch</p>
          <Ornament className="mt-5 h-3 w-24 text-brand-purple/70" />
          <h1 className="mt-5 font-display text-display-lg text-maroon">Contact</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/85">
            Whether you&rsquo;re an artist, a partner, a donor, or a rasika
            with a question — we&rsquo;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="bg-cream-deep/30">
        <div className="container-edge py-14 md:py-20">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-display-md text-maroon">Reach us</h2>

            <ul className="mt-10 space-y-8">
              <li className="flex items-start gap-4">
                <span
                  className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center border border-pink-deep text-maroon"
                  aria-hidden="true"
                >
                  <Mail size={18} strokeWidth={1.5} />
                </span>
                <div>
                  <p className="smallcaps text-muted">Email</p>
                  <a className="link-purple mt-1 inline-block text-lg" href={`mailto:${ORG_EMAIL}`}>
                    {ORG_EMAIL}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span
                  className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center border border-pink-deep text-maroon"
                  aria-hidden="true"
                >
                  <MapPin size={18} strokeWidth={1.5} />
                </span>
                <div>
                  <p className="smallcaps text-muted">Mailing Address</p>
                  <address className="mt-1 not-italic text-lg text-ink/85">
                    {ORG_ADDRESS_LINES.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
