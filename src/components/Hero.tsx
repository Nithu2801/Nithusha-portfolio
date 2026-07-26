import type { Profile, SkillGroup } from "@/lib/types";

function CodeMockup({ profile }: { profile: Profile }) {
  const skills = profile ? [profile.title || "Full Stack Developer"] : [];
  return (
    <div className="w-full h-full bg-[#1a1c2b] flex flex-col">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-white/40 text-xs font-mono">developer.ts</span>
      </div>
      <div className="p-6 font-mono text-sm leading-7 overflow-hidden">
        <p>
          <span className="text-[#ff79c6]">const</span> <span className="text-[#8be9fd]">developer</span>{" "}
          <span className="text-white/60">=</span> <span className="text-white/60">{"{"}</span>
        </p>
        <p className="pl-6">
          <span className="text-[#50fa7b]">name</span>
          <span className="text-white/60">:</span> <span className="text-[#f1fa8c]">&quot;{profile?.name || "Your Name"}&quot;</span>
          <span className="text-white/60">,</span>
        </p>
        <p className="pl-6">
          <span className="text-[#50fa7b]">role</span>
          <span className="text-white/60">:</span>{" "}
          <span className="text-[#f1fa8c]">&quot;{profile?.title || "Full Stack Developer"}&quot;</span>
          <span className="text-white/60">,</span>
        </p>
        <p className="pl-6">
          <span className="text-[#50fa7b]">basedIn</span>
          <span className="text-white/60">:</span>{" "}
          <span className="text-[#f1fa8c]">&quot;{profile?.location || "Sri Lanka"}&quot;</span>
          <span className="text-white/60">,</span>
        </p>
        <p className="pl-6">
          <span className="text-[#50fa7b]">available</span>
          <span className="text-white/60">:</span> <span className="text-[#bd93f9]">true</span>
        </p>
        <p>
          <span className="text-white/60">{"}"}</span>
          <span className="inline-block w-2 h-4 bg-primary/70 ml-1 animate-pulse align-middle" />
        </p>
        {skills.length > 0 && (
          <p className="mt-4 text-white/30">// building with .NET, Angular &amp; Next.js</p>
        )}
      </div>
    </div>
  );
}

function TechBadge({
  icon,
  label,
  className,
  delay = 0,
}: {
  icon: string;
  label: string;
  className: string;
  delay?: number;
}) {
  return (
    <div
      className={`absolute z-20 flex items-center gap-2 bg-white rounded-full pl-2 pr-4 py-2 soft-shadow border border-outline-variant/30 animate-float ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-base">{icon}</span>
      </span>
      <span className="text-sm font-bold text-on-surface whitespace-nowrap">{label}</span>
    </div>
  );
}

export default function Hero({ profile, badges }: { profile: Profile; badges: Pick<SkillGroup, "icon" | "title">[] }) {
  return (
    <section className="md:min-h-[80vh] flex flex-col justify-center relative overflow-hidden px-margin-x py-10 md:py-section-padding">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
        <div className="lg:col-span-7 space-y-stack-lg">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Open to full-time opportunities
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
            {profile?.tagline || `Hi, I'm ${profile?.name || "there"}.`}
          </h1>
          {profile?.title && (
            <p className="text-xl md:text-2xl font-semibold text-primary">{profile.title}</p>
          )}
          <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">{profile?.bio}</p>
          <div className="flex flex-wrap gap-stack-md pt-4">
            <a
              href="#projects"
              className="bg-vibrant-gradient text-on-primary px-10 py-4 rounded-full font-bold soft-shadow hover:scale-105 transition-all flex items-center gap-2"
            >
              View My Work
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
            {profile?.cv_url && (
              <a
                href={profile.cv_url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-primary text-primary px-10 py-4 rounded-full font-bold hover:bg-primary/5 transition-all"
              >
                Download CV
              </a>
            )}
          </div>
        </div>
        <div className="lg:col-span-5 relative mt-16 lg:mt-0 lg:ml-8">
          <div className="aspect-square relative z-10 rounded-3xl overflow-hidden soft-shadow border-8 border-white bg-surface-container">
            {profile?.hero_image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt={profile?.name}
                className="w-full h-full object-cover"
                src={profile.hero_image_url}
              />
            ) : (
              <CodeMockup profile={profile} />
            )}
          </div>

          {badges[0] && (
            <TechBadge icon={badges[0].icon} label={badges[0].title} className="-top-6 -left-8" delay={0} />
          )}
          {badges[1] && (
            <TechBadge icon={badges[1].icon} label={badges[1].title} className="top-1/3 -right-10" delay={0.6} />
          )}
          {badges[2] && (
            <TechBadge icon={badges[2].icon} label={badges[2].title} className="-bottom-6 left-1/4" delay={1.2} />
          )}

          <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary-container/20 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
}
