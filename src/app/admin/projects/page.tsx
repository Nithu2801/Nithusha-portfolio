import { getProjects } from "@/lib/data";
import ProjectsManager from "@/components/admin/ProjectsManager";

export default async function ProjectsAdminPage() {
  const projects = await getProjects();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-on-surface-variant">
          Case studies shown on the public site. Mark one as &quot;Large&quot; layout to feature it at the top.
        </p>
      </div>
      <ProjectsManager initialProjects={projects} />
    </div>
  );
}
