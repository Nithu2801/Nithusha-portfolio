import Nav from "@/components/Nav";
import CursorGlow from "@/components/CursorGlow";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import CertificationsSection from "@/components/CertificationsSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactCta from "@/components/ContactCta";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  getProfile,
  getSocialLinks,
  getSkillGroups,
  getExperience,
  getProjects,
  getEducation,
  getCertifications,
} from "@/lib/data";

export const revalidate = 0;

export default async function Home() {
  const [profile, socialLinks, skillGroups, experience, projects, education, certifications] = await Promise.all([
    getProfile(),
    getSocialLinks(),
    getSkillGroups(),
    getExperience(),
    getProjects(),
    getEducation(),
    getCertifications(),
  ]);

  return (
    <>
      <CursorGlow />
      <Nav profile={profile} />
      <main className="mt-20 flex-1">
        <Hero profile={profile} badges={skillGroups.slice(0, 3).map((g) => ({ icon: g.icon, title: g.title }))} />
        <section className="py-stack-lg border-y border-outline-variant/20 bg-surface-white">
          <div className="max-w-[1280px] mx-auto px-margin-x flex flex-wrap justify-center md:justify-between items-center gap-stack-lg opacity-40 grayscale hover:grayscale-0 transition-all">
            {skillGroups.slice(0, 5).map((g) => (
              <span key={g.id} className="text-xl font-bold text-on-surface-variant uppercase">
                {g.title}
              </span>
            ))}
          </div>
        </section>
        <About profile={profile} />
        <ExperienceSection experience={experience} />
        <EducationSection education={education} />
        <CertificationsSection certifications={certifications} />
        <ProjectsSection projects={projects} />
        <SkillsSection groups={skillGroups} />
        <ContactCta profile={profile} />
      </main>
      <Footer profile={profile} socialLinks={socialLinks} />
      <WhatsAppButton number={profile?.whatsapp_number} />
    </>
  );
}
