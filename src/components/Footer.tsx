import type { Profile, SocialLink } from "@/lib/types";

export default function Footer({ profile, socialLinks }: { profile: Profile; socialLinks: SocialLink[] }) {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/20 w-full py-section-padding mt-auto">
      <div className="px-margin-x max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-stack-lg mb-section-padding">
          <div className="md:col-span-2 space-y-6">
            <div className="text-2xl font-bold text-primary">{profile?.name}</div>
            <p className="text-on-surface-variant max-w-xs">{profile?.tagline}</p>
            <div className="flex gap-4 flex-wrap">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                  aria-label={link.platform}
                >
                  <span className="material-symbols-outlined">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Navigation</h4>
            <ul className="space-y-2 text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors" href="#about">About</a></li>
              <li><a className="hover:text-primary transition-colors" href="#experience">Experience</a></li>
              <li><a className="hover:text-primary transition-colors" href="#projects">Projects</a></li>
              <li><a className="hover:text-primary transition-colors" href="#skills">Skills</a></li>
              <li><a className="hover:text-primary transition-colors" href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Contact</h4>
            <ul className="space-y-2 text-on-surface-variant">
              {profile?.email && (
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">mail</span> {profile.email}
                </li>
              )}
              {profile?.phone && (
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">call</span> {profile.phone}
                </li>
              )}
              {profile?.location && (
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">location_on</span> {profile.location}
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="border-t border-outline-variant/10 pt-stack-lg flex flex-col md:flex-row justify-between items-center gap-stack-md">
          <p className="text-on-surface-variant text-base">
            © {new Date().getFullYear()} {profile?.name}. Built with precision.
          </p>
          <div className="flex gap-stack-lg">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface-variant hover:text-primary transition-all capitalize"
              >
                {link.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
