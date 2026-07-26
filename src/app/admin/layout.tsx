import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

const navItems = [
  { href: "/admin", label: "Overview", icon: "dashboard" },
  { href: "/admin/profile", label: "Contact & Profile", icon: "person" },
  { href: "/admin/social-links", label: "Social Links", icon: "share" },
  { href: "/admin/skills", label: "Skills", icon: "code_blocks" },
  { href: "/admin/experience", label: "Experience", icon: "work_history" },
  { href: "/admin/education", label: "Education", icon: "school" },
  { href: "/admin/certifications", label: "Certifications", icon: "workspace_premium" },
  { href: "/admin/projects", label: "Projects", icon: "dashboard_customize" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-surface-container-low">
      <aside className="w-64 bg-white border-r border-outline-variant/20 flex-col p-6 hidden md:flex">
        <div className="text-xl font-bold text-primary mb-8">Admin Panel</div>
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors font-medium"
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/"
          target="_blank"
          className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 mb-4"
        >
          <span className="material-symbols-outlined text-lg">open_in_new</span>
          View site
        </Link>
        <LogoutButton />
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="md:hidden bg-white border-b border-outline-variant/20 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-lg font-bold text-primary">Admin Panel</div>
            <LogoutButton />
          </div>
          <nav className="flex gap-2 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap px-3 py-2 rounded-lg bg-surface-container-low text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="flex-1 p-6 md:p-10 max-w-5xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
