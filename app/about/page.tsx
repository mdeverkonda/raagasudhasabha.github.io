import type { Metadata } from "next";
import { Ornament } from "@/components/ornament";

export const metadata: Metadata = {
  title: "About",
  description:
    "Raaga Sudha Sabha is a 501(c)(3) non-profit cultural arts organization, sister initiative to Raaga Sudha School of Music.",
};

export default function AboutPage() {
  return (
    <>
      {/* HEADER */}
      <section className="border-b border-pink bg-cream">
        <div className="container-edge py-14 md:py-20">
          <p className="kicker">About the Sabha</p>
          <Ornament className="mt-5 h-3 w-24 text-brand-purple/70" />
          <h1 className="mt-5 font-display text-display-lg text-maroon">
            A platform for the music we love
          </h1>
        </div>
      </section>

      {/* MISSION + ESSAY */}
      <section className="bg-cream-deep/30">
        <div className="container-edge py-14 md:py-20">
          <div className="prose-text mx-auto max-w-readable text-lg leading-[1.7] text-ink/90 md:text-xl">
            <p>
              Raaga Sudha Sabha is a cultural arts organization dedicated to the
              preservation and global promotion of Indian classical music. We
              aim to make this art form accessible to all enthusiasts
              <em> (rasikas)</em> and provide a robust platform for the younger
              generation to learn, perform, and engage with the community for
              cultural enrichment.
            </p>
            <p className="mt-6">
              To honor this living tradition, the Sabha serves as both a vibrant stage 
              and a lasting archive. We provide a platform where master musicians and 
              emerging talents perform side-by-side, ensuring their artistry is celebrated 
              today and preserved for future generations.
            </p>
            <p className="mt-6">
              We uphold the art form&rsquo;s high standards by organizing
              concerts and workshops featuring world-class professional artists
              from across the Indian Classical tradition. We are equally
              committed to opening the music to new listeners — through accessible
              programming, an open archive, and a serious commitment to
              ecological responsibility.
            </p>
          </div>
        </div>
      </section>

      {/* HISTORY */}
      <section className="border-y border-pink bg-cream">
        <div className="container-edge py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="kicker">History</p>
              <h2 className="mt-3 font-display text-display-md text-maroon">
                A Public Platform for Music
              </h2>
            </div>
            <div className="prose-text lg:col-span-8 text-lg leading-relaxed text-ink/85">
              {/* TODO: replace with the real founding story when ready */}
              <p>
                This organization was established to bring classical 
                music traditions into the public sphere. It serves as a platform
                 for performance, preservation, and community engagement.
              </p>
              <p className="mt-4">
                While the foundational institution focuses on pedagogy 
                and teaching methods, this initiative addresses a broader question: 
                "How do we sustain and elevate this music within the wider world?" 
                It pursues this mission through live concerts, archival work, mentorship programs, 
                and a commitment to environmentally responsible practices in presenting and preserving 
                the art form.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOARD OF DIRECTORS */}
      <section className="bg-cream-deep/30">
        <div className="container-edge py-14 md:py-20">
          <div className="text-center">
            <p className="kicker">Leadership</p>
            <h2 className="mt-3 font-display text-display-md text-maroon">
              Board of Directors
            </h2>
            <Ornament className="mx-auto mt-5 h-3 w-24 text-brand-purple/70" />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {[
              { name: "Sudha Dusi", role: "President", phone: "510-449-7602" },
              { name: "Jayaram Manda", role: "Secretary", phone: "510-449-8108" },
              { name: "Madhav Deverkonda", role: "Treasurer" },
            ].map((member) => (
              <article
                key={member.name}
                className="flex flex-col gap-3 border border-pink bg-cream/60 p-6 md:p-8"
              >
                <p className="kicker">{member.role}</p>
                <p className="font-display text-2xl text-maroon">{member.name}</p>
                {member.phone && (
                  <p className="text-sm text-ink/80">
                    <a
                      href={`tel:${member.phone.replace(/\D/g, "")}`}
                      className="link-purple"
                    >
                      {member.phone}
                    </a>
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ADVISORY COMMITTEE */}
      <section className="border-t border-pink bg-cream">
        <div className="container-edge py-14 md:py-20">
          <div className="text-center">
            <p className="kicker">Advisors</p>
            <h2 className="mt-3 font-display text-display-md text-maroon">
              Advisory Committee
            </h2>
            <Ornament className="mx-auto mt-5 h-3 w-24 text-brand-purple/70" />
            <p className="mt-6 max-w-xl mx-auto text-base text-ink/80">
              An extended council of advisors who help shape programming,
              partnerships and the long-term direction of the Sabha.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {[
              "Santosh Dusi",
              "Siddhartha Dusi",
              "Krishna Nadiminti",
              "Padmanjali Deverkonda",
              "Purna Vanka",
            ].map((name) => (
              <li
                key={name}
                className="flex items-center justify-center border border-pink bg-cream-deep/40 p-5 text-center font-display text-lg text-maroon md:p-6 md:text-xl"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 501(c)(3) */}
      <section className="bg-cream">
        <div className="container-edge py-14 md:py-20">
          <div className="mx-auto max-w-readable border border-pink bg-cream-deep/40 p-8 md:p-10">
            <p className="kicker">Non-Profit Status</p>
            <h2 className="mt-3 font-display text-2xl text-maroon md:text-3xl">
              A 501(c)(3) public charity
            </h2>
            <p className="mt-4 leading-relaxed text-ink/85">
              Raaga Sudha Sabha is a registered 501(c)(3) non-profit
              organization. Donations are tax-deductible to the extent permitted
              by law.
            </p>
            <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="smallcaps text-muted">Federal Tax ID</dt>
                <dd className="mt-1 font-mono text-ink">42-2139154</dd>
              </div>
              <div>
                <dt className="smallcaps text-muted">Founded</dt>
                <dd className="mt-1 text-ink">2026</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
