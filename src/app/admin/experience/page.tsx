import { getExperience } from "@/lib/data";
import ExperienceManager from "@/components/admin/ExperienceManager";

export default async function ExperienceAdminPage() {
  const experience = await getExperience();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Experience</h1>
        <p className="text-on-surface-variant">Your professional timeline, shown newest first.</p>
      </div>
      <ExperienceManager initialItems={experience} />
    </div>
  );
}
