import type { Profile } from "@/lib/types";

export default function About({ profile }: { profile: Profile }) {
  return (
    <section className="py-section-padding px-margin-x bg-surface-container-lowest" id="about">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-stack-md">
            <p className="text-primary text-sm font-bold tracking-widest uppercase">Professional Background</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Developer based in {profile?.location || "..."}.
            </h2>
            <div className="space-y-stack-md text-lg text-on-surface-variant leading-relaxed">
              <p>{profile?.bio}</p>
            </div>
            <div className="grid grid-cols-2 gap-stack-lg pt-stack-md">
              <div className="p-stack-md bg-surface rounded-xl border border-outline-variant/30">
                <h4 className="text-primary text-2xl font-bold">{profile?.stat_projects}</h4>
                <p className="text-sm font-semibold">Projects Completed</p>
              </div>
              <div className="p-stack-md bg-surface rounded-xl border border-outline-variant/30">
                <h4 className="text-primary text-2xl font-bold">{profile?.stat_satisfaction}</h4>
                <p className="text-sm font-semibold">Client Satisfaction</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
            <div className="p-stack-lg glass-card rounded-2xl hover-lift space-y-3">
              <span
                className="material-symbols-outlined text-primary text-4xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <h3 className="text-xl font-semibold">Quality</h3>
              <p className="text-on-surface-variant text-base">
                Providing top-notch services that exceed expectations in every line of code.
              </p>
            </div>
            <div className="p-stack-lg glass-card rounded-2xl hover-lift space-y-3 md:translate-y-8">
              <span
                className="material-symbols-outlined text-primary text-4xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                lightbulb
              </span>
              <h3 className="text-xl font-semibold">Innovation</h3>
              <p className="text-on-surface-variant text-base">
                Continuously pushing the boundaries to stay ahead in the tech industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
