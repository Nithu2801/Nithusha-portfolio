import type { Education } from "@/lib/types";

export default function EducationSection({ education }: { education: Education[] }) {
  if (education.length === 0) return null;

  return (
    <section className="py-section-padding px-margin-x bg-surface-container-lowest" id="education">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16 space-y-stack-sm">
          <p className="text-primary text-sm font-bold tracking-widest uppercase">Education</p>
          <h2 className="text-3xl md:text-4xl font-bold">Academic Background</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 bg-white rounded-2xl border border-outline-variant/30 p-6"
            >
              <span className="material-symbols-outlined text-primary text-3xl shrink-0">school</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{edu.degree}</h3>
                <p className="font-bold text-on-surface">{edu.institution}</p>
                {edu.description && <p className="text-on-surface-variant text-sm mt-1">{edu.description}</p>}
              </div>
              <span className="px-4 py-1 bg-surface-container rounded-full text-sm font-bold text-primary border border-primary/20 w-fit shrink-0">
                {edu.period}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
