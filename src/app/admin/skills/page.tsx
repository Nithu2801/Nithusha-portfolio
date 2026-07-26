import { getSkillGroups } from "@/lib/data";
import SkillsManager from "@/components/admin/SkillsManager";

export default async function SkillsAdminPage() {
  const groups = await getSkillGroups();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Skills</h1>
        <p className="text-on-surface-variant">
          Organize skills into groups (e.g. Frontend Dev, Backend). Each skill has a proficiency level shown as an
          animated bar on the public site.
        </p>
      </div>
      <SkillsManager initialGroups={groups} />
    </div>
  );
}
