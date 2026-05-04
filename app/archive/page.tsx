import type { Metadata } from "next";
import { Music, FileVideo, Mic, BookOpen } from "lucide-react";
import { Ornament } from "@/components/ornament";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "A forthcoming open archive of music, documentaries and interviews from the Indian classical tradition.",
};

const planned = [
  {
    icon: Music,
    title: "Concert Recordings",
    body: "Selected audio from past Sabha concerts, released with artist permission.",
  },
  {
    icon: FileVideo,
    title: "Documentaries",
    body: "Short films on artists, traditions, gharanas and lineages.",
  },
  {
    icon: Mic,
    title: "Interviews",
    body: "Long-form conversations with senior musicians, scholars and rasikas.",
  },
  {
    icon: BookOpen,
    title: "Liner Notes",
    body: "Programme notes, raga guides and contextual essays for new listeners.",
  },
];

export default function ArchivePage() {
  return (
    <>
      <section className="border-b border-pink bg-cream">
        <div className="container-edge py-14 md:py-20">
          <p className="kicker">Cultural Preservation</p>
          <Ornament className="mt-5 h-3 w-24 text-brand-purple/70" />
          <h1 className="mt-5 font-display text-display-lg text-maroon">Archive</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/85">
            A growing open archive of music, documentaries and interviews — the
            historical record of the Indian classical tradition as it lives and
            evolves.
          </p>
        </div>
      </section>

      <section className="bg-cream-deep/30">
        <div className="container-edge py-16 md:py-24">
          <div className="mx-auto max-w-readable text-center">
            <p className="font-display text-3xl italic text-brand-purple md:text-4xl">
              Coming soon.
            </p>
            <p className="mt-6 leading-relaxed text-ink/85">
              The archive is in active development. We are currently gathering
              and securing rights for a first wave of concert recordings,
              documentaries and interviews. Sign up below to be notified when
              the first releases are public.
            </p>

            <a
              href="#newsletter"
              className="smallcaps mt-8 inline-flex min-h-12 items-center border border-maroon bg-maroon px-6 py-3 text-cream transition hover:bg-maroon-deep"
            >
              Notify me when it launches
            </a>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-edge py-16 md:py-24">
          <div className="text-center">
            <p className="kicker">What will live here</p>
            <h2 className="mt-3 font-display text-display-md text-maroon">
              The first releases
            </h2>
            <Ornament className="mx-auto mt-5 h-3 w-24 text-brand-purple/70" />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {planned.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="flex flex-col gap-4 border border-pink bg-cream/60 p-6 md:p-8"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center border border-maroon/30 text-maroon"
                  aria-hidden="true"
                >
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl text-maroon md:text-2xl">{title}</h3>
                <p className="text-base leading-relaxed text-ink/85">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
