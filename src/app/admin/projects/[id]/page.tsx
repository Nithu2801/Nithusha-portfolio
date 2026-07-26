import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/data";
import ProjectDetailManager from "@/components/admin/ProjectDetailManager";

export default async function ProjectDetailAdminPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/projects" className="text-primary text-sm font-semibold hover:underline">
          ← Back to Projects
        </Link>
        <h1 className="text-2xl font-bold mt-2">{project.title}</h1>
        <p className="text-on-surface-variant">
          Add a full case-study write-up, gallery photos/videos, and supporting links or documents.
        </p>
      </div>
      <ProjectDetailManager project={project} />
    </div>
  );
}
