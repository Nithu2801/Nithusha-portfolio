import { SITE_URL } from "@/lib/site";
import type { Profile, SocialLink, SkillGroup, Education } from "@/lib/types";

export default function PersonJsonLd({
  profile,
  socialLinks,
  skillGroups,
  education,
}: {
  profile: Profile;
  socialLinks: SocialLink[];
  skillGroups: SkillGroup[];
  education: Education[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: profile?.name,
    jobTitle: profile?.title,
    description: profile?.bio,
    url: SITE_URL,
    image: profile?.hero_image_url || undefined,
    email: profile?.email ? `mailto:${profile.email}` : undefined,
    telephone: profile?.phone || undefined,
    address: profile?.location
      ? {
          "@type": "PostalAddress",
          addressLocality: profile.location,
        }
      : undefined,
    sameAs: socialLinks.map((link) => link.url),
    knowsAbout: skillGroups.flatMap((g) => g.skill_items.map((s) => s.name)),
    alumniOf: education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.institution,
    })),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
