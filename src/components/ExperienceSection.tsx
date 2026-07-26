import type { Experience } from "@/lib/types";

export default function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section className="py-section-padding px-margin-x bg-surface" id="experience">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <p className="text-primary text-sm font-bold tracking-widest uppercase mb-4">The Journey</p>
            <h2 className="text-3xl md:text-4xl font-bold">Professional Experience</h2>
          </div>
          <div className="hidden md:block">
            <span className="material-symbols-outlined text-primary/20 text-8xl">work_history</span>
          </div>
        </div>
        <div className="space-y-gutter relative before:absolute before:left-0 md:before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-outline-variant/30 before:-translate-x-1/2">
          {experience.map((exp) => (
            <div key={exp.id} className="relative grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
              <div className="md:text-right pr-12 order-2 md:order-1">
                <h3 className="text-xl font-semibold text-primary">{exp.role}</h3>
                <p className="font-bold text-on-surface mb-2">{exp.company}</p>
                <p className="text-on-surface-variant text-base">{exp.description}</p>
              </div>
              <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20 z-10 order-1 md:order-none" />
              <div className="pl-12 order-3 md:order-2">
                <span className="px-4 py-1 bg-surface-container rounded-full text-sm font-bold text-primary border border-primary/20">
                  {exp.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
