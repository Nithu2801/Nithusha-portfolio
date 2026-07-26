"use client";

import { useEffect, useRef, useState } from "react";
import type { SkillGroup } from "@/lib/types";

function SkillBar({ name, level, animate }: { name: string; level: number; animate: boolean }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold text-on-surface">{name}</span>
        <span className="text-xs font-bold text-primary">{level}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-surface-container overflow-hidden">
        <div
          className="h-full rounded-full bg-vibrant-gradient transition-all duration-1000 ease-out"
          style={{ width: animate ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection({ groups }: { groups: SkillGroup[] }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-section-padding px-margin-x bg-surface-container-low" id="skills">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-gutter">
          <div className="lg:w-1/3">
            <p className="text-primary text-sm font-bold tracking-widest uppercase mb-4">Our Specialities</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Technical Arsenal</h2>
            <p className="text-on-surface-variant text-lg">
              A deep-rooted understanding of modern development paradigms and high-performance technologies.
            </p>
          </div>
          <div ref={ref} className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-stack-md">
            {groups.map((group, i) => (
              <div
                key={group.id}
                className="p-stack-lg bg-white rounded-2xl border border-outline-variant/30 space-y-4 group hover:border-primary/50 transition-colors"
              >
                <div
                  className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center animate-float"
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
                  <span
                    className="material-symbols-outlined text-primary text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {group.icon}
                  </span>
                </div>
                <h3 className="text-xl font-semibold">{group.title}</h3>
                <div className="space-y-3">
                  {group.skill_items.map((item) => (
                    <SkillBar key={item.id} name={item.name} level={item.level} animate={visible} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
