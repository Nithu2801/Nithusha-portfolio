type Visual =
  | { kind: "text"; text: string; bg: string; fg: string }
  | { kind: "symbol"; symbol: string; bg: string; fg: string }
  | { kind: "react" };

const VISUALS: Record<string, Visual> = {
  html5: { kind: "text", text: "5", bg: "#E34F2618", fg: "#E34F26" },
  css3: { kind: "text", text: "3", bg: "#1572B618", fg: "#1572B6" },
  javascript: { kind: "text", text: "JS", bg: "#F7DF1E", fg: "#1a1a1a" },
  typescript: { kind: "text", text: "TS", bg: "#3178C618", fg: "#3178C6" },
  angular: { kind: "text", text: "A", bg: "#DD003118", fg: "#DD0031" },
  "next.js": { kind: "text", text: "N", bg: "#00000012", fg: "#111111" },
  bootstrap: { kind: "text", text: "B", bg: "#7952B318", fg: "#7952B3" },
  "c#": { kind: "text", text: "C#", bg: "#68217A18", fg: "#68217A" },
  ".net core": { kind: "text", text: ".NET", bg: "#512BD418", fg: "#512BD4" },
  "sql server": { kind: "text", text: "SQL", bg: "#CC292718", fg: "#CC2927" },
  postgresql: { kind: "text", text: "PG", bg: "#33679118", fg: "#336791" },
  postman: { kind: "text", text: "P", bg: "#FF6C3718", fg: "#FF6C37" },
  react: { kind: "react" },
  "rest api": { kind: "symbol", symbol: "api", bg: "#9300FF18", fg: "#9300FF" },
  git: { kind: "symbol", symbol: "account_tree", bg: "#F0503218", fg: "#F05032" },
  github: { kind: "symbol", symbol: "code", bg: "#18171718", fg: "#181717" },
  agile: { kind: "symbol", symbol: "sync", bg: "#0EA5E918", fg: "#0EA5E9" },
  testing: { kind: "symbol", symbol: "bug_report", bg: "#16A34A18", fg: "#16A34A" },
};

const DEFAULT_VISUAL: Visual = { kind: "symbol", symbol: "code_blocks", bg: "#9300FF18", fg: "#9300FF" };

export default function SkillIcon({ name }: { name: string }) {
  const visual = VISUALS[name.trim().toLowerCase()] ?? DEFAULT_VISUAL;

  if (visual.kind === "react") {
    return (
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: "#61DAFB18" }}
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7" style={{ color: "#149ECA" }}>
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
          <g fill="none" stroke="currentColor" strokeWidth="1.2">
            <ellipse cx="12" cy="12" rx="10" ry="4.2" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
          </g>
        </svg>
      </div>
    );
  }

  if (visual.kind === "symbol") {
    return (
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: visual.bg }}
      >
        <span className="material-symbols-outlined text-2xl" style={{ color: visual.fg }}>
          {visual.symbol}
        </span>
      </div>
    );
  }

  return (
    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: visual.bg }}>
      <span className="font-bold text-sm" style={{ color: visual.fg }}>
        {visual.text}
      </span>
    </div>
  );
}
