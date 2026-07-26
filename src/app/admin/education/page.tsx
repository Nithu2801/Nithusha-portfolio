import { getEducation } from "@/lib/data";
import EducationManager from "@/components/admin/EducationManager";

export default async function EducationAdminPage() {
  const education = await getEducation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Education</h1>
        <p className="text-on-surface-variant">Degrees and schools shown in the Education section.</p>
      </div>
      <EducationManager initialItems={education} />
    </div>
  );
}
