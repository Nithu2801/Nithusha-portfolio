import Link from "next/link";
import { getProfile, getSocialLinks, getSkillGroups, getExperience, getProjects } from "@/lib/data";

export default async function AdminOverview() {
  const [profile, socialLinks, skillGroups, experience, projects] = await Promise.all([
    getProfile(),
    getSocialLinks(),
    getSkillGroups(),
    getExperience(),
    getProjects(),
  ]);

  const cards = [
    { label: "Profile completeness", value: profile?.name ? "Set up" : "Incomplete", href: "/admin/profile", icon: "person" },
    { label: "Social links", value: socialLinks.length, href: "/admin/social-links", icon: "share" },
    { label: "Skill groups", value: skillGroups.length, href: "/admin/skills", icon: "code_blocks" },
    { label: "Experience entries", value: experience.length, href: "/admin/experience", icon: "work_history" },
    { label: "Projects", value: projects.length, href: "/admin/projects", icon: "dashboard_customize" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Welcome back{profile?.name ? `, ${profile.name.split(" ")[0]}` : ""}</h1>
        <p className="text-on-surface-variant">Manage everything shown on your public portfolio from here.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="bg-white rounded-2xl border border-outline-variant/30 p-6 hover:border-primary/50 hover:shadow-md transition-all"
          >
            <span className="material-symbols-outlined text-primary text-3xl">{c.icon}</span>
            <div className="text-2xl font-bold mt-3">{c.value}</div>
            <div className="text-on-surface-variant text-sm">{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
