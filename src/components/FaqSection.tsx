import { SITE_URL } from "@/lib/site";
import type { Profile, SkillGroup } from "@/lib/types";

export default function FaqSection({ profile, skillGroups }: { profile: Profile; skillGroups: SkillGroup[] }) {
  const topSkills = skillGroups
    .flatMap((g) => g.skill_items)
    .slice(0, 6)
    .map((s) => s.name)
    .join(", ");

  const faqs = [
    {
      question: `What does ${profile?.name || "this developer"} specialize in?`,
      answer: `${profile?.name || "This developer"} is a ${
        profile?.title || "Full Stack Developer"
      } who works across ${topSkills || "modern web technologies"}, building full stack web applications end to end.`,
    },
    {
      question: `Where is ${profile?.name || "this developer"} based?`,
      answer: `${profile?.name || "This developer"} is based in ${profile?.location || "Sri Lanka"}, and works with clients and teams remotely as well as on site.`,
    },
    {
      question: `Is ${profile?.name || "this developer"} available for work?`,
      answer: `Yes — ${profile?.name || "this developer"} is currently open to full-time opportunities. The fastest way to reach out is via WhatsApp or email.`,
    },
    {
      question: `How can I contact ${profile?.name || "this developer"}?`,
      answer: `You can reach out on WhatsApp${
        profile?.phone ? ` at ${profile.phone}` : ""
      }${profile?.email ? `, or by email at ${profile.email}` : ""}.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-section-padding px-margin-x bg-surface-container-lowest" id="faq">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16 space-y-stack-sm">
          <p className="text-primary text-sm font-bold tracking-widest uppercase">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="bg-white rounded-2xl border border-outline-variant/30 p-6">
              <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
              <p className="text-on-surface-variant">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
