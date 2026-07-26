import Link from "next/link";
import type { Project } from "@/lib/types";

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`} className="block h-full">
      <div className="group overflow-hidden rounded-3xl border border-outline-variant/30 soft-shadow hover-lift bg-white h-full flex flex-col">
        <div
          className="h-48 bg-cover bg-center bg-primary/10 flex items-center justify-center"
          style={project.image_url ? { backgroundImage: `url('${project.image_url}')` } : undefined}
        >
          {!project.image_url && (
            <span className="material-symbols-outlined text-primary/30 text-5xl">{project.icon}</span>
          )}
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-primary text-2xl">{project.icon}</span>
            <h3 className="text-lg font-semibold">{project.title}</h3>
          </div>
          {project.category && (
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full inline-block text-xs font-bold uppercase tracking-wide mb-3 w-fit">
              {project.category}
            </div>
          )}
          <p className="text-on-surface-variant text-sm flex-1">{project.description}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-primary font-bold text-sm w-fit">
            View project
            <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">
              arrow_right_alt
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section className="py-section-padding px-margin-x" id="projects">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16 space-y-stack-sm">
          <p className="text-primary text-sm font-bold tracking-widest uppercase">Case Studies</p>
          <h2 className="text-3xl md:text-4xl font-bold">Turning Ideas into Impact</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter items-stretch">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
