import type { Project } from "@/lib/types";

function ProjectCard({ project }: { project: Project }) {
  const inner = (
    <div className="group relative overflow-hidden rounded-3xl soft-shadow hover-lift bg-white h-full flex flex-col">
      <div
        className="h-56 bg-cover bg-center bg-primary/10"
        style={project.image_url ? { backgroundImage: `url('${project.image_url}')` } : undefined}
      />
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <span className="material-symbols-outlined text-primary text-3xl">{project.icon}</span>
          <h3 className="text-xl font-semibold">{project.title}</h3>
        </div>
        {project.category && (
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full inline-block text-xs font-bold uppercase tracking-wide mb-3 w-fit">
            {project.category}
          </div>
        )}
        <p className="text-on-surface-variant flex-1">{project.description}</p>
      </div>
    </div>
  );

  if (project.link_url) {
    return (
      <a href={project.link_url} target="_blank" rel="noopener noreferrer" className="block h-full">
        {inner}
      </a>
    );
  }
  return inner;
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const featured = projects.find((p) => p.layout_size === "large") ?? projects[0];
  const rest = projects.filter((p) => p.id !== featured?.id);

  return (
    <section className="py-section-padding px-margin-x" id="projects">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16 space-y-stack-sm">
          <p className="text-primary text-sm font-bold tracking-widest uppercase">Case Studies</p>
          <h2 className="text-3xl md:text-4xl font-bold">Turning Ideas into Impact</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {featured && (
            <div className="md:col-span-12 group relative overflow-hidden rounded-3xl bg-vibrant-gradient p-1">
              <div className="bg-white rounded-[22px] overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center">
                <div className="p-12 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-3xl animate-pulse-slow">
                      {featured.icon}
                    </span>
                    {featured.category && (
                      <div className="bg-primary/10 text-primary px-4 py-1 rounded-full inline-block text-sm font-semibold">
                        {featured.category}
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl lg:text-4xl font-bold">{featured.title}</h3>
                  <p className="text-on-surface-variant text-lg">{featured.description}</p>
                  {featured.link_url && (
                    <a
                      href={featured.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex items-center gap-2 text-primary font-bold w-fit"
                    >
                      See the Full Case Study
                      <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-1">
                        arrow_right_alt
                      </span>
                    </a>
                  )}
                </div>
                <div className="relative h-64 lg:h-full min-h-[400px] bg-primary/10">
                  {featured.image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="absolute inset-0 w-full h-full object-cover"
                      src={featured.image_url}
                      alt={featured.title}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
          {rest.map((project) => (
            <div key={project.id} className="md:col-span-6 lg:col-span-4">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
