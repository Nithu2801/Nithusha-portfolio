import type { SkillGroup } from "@/lib/types";
import SkillIcon from "@/components/SkillIcon";

export default function SkillsSection({ groups }: { groups: SkillGroup[] }) {
  return (
    <section className="py-section-padding px-margin-x bg-surface-container-low" id="skills">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16 space-y-stack-sm">
          <p className="text-primary text-sm font-bold tracking-widest uppercase">My Skills</p>
          <h2 className="text-3xl md:text-4xl font-bold">Technical Arsenal</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter items-start">
          {groups.map((group) => (
            <div key={group.id} className="bg-white rounded-2xl border border-outline-variant/30 p-6">
              <div className="flex items-center gap-2 pb-4 mb-4 border-b border-outline-variant/20">
                <span className="material-symbols-outlined text-primary text-xl">{group.icon}</span>
                <h3 className="text-lg font-bold">{group.title}</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {group.skill_items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col items-center justify-center gap-2 rounded-xl bg-surface-container-low border border-transparent p-4 text-center hover:border-primary/30 hover:bg-primary/5 transition-colors"
                  >
                    <SkillIcon name={item.name} />
                    <span className="text-sm font-semibold text-on-surface">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
