import type { Profile } from "@/lib/types";

export default function ContactCta({ profile }: { profile: Profile }) {
  return (
    <section className="py-section-padding px-margin-x" id="contact">
      <div className="max-w-[1280px] mx-auto bg-vibrant-gradient rounded-3xl p-12 md:p-20 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <p className="text-white/80 text-lg mb-4">
            We value transparency and commitment. If you value the same, we&apos;re ready to deliver results beyond
            expectations.
          </p>
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-stack-lg">
            Ready to build your next app? Let&apos;s talk on WhatsApp.
          </h2>
          <div className="flex flex-wrap gap-stack-md">
            <a
              href={`https://wa.me/${profile?.whatsapp_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary px-10 py-4 rounded-full font-bold soft-shadow hover:scale-105 transition-all flex items-center gap-2"
            >
              Chat on WhatsApp
            </a>
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="border-2 border-white/40 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all flex items-center gap-2"
              >
                Email Me
                <span className="material-symbols-outlined">mail</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
