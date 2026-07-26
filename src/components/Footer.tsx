import type { Profile, SocialLink } from "@/lib/types";

export default function Footer({ profile, socialLinks }: { profile: Profile; socialLinks: SocialLink[] }) {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/20 w-full mt-auto">
      <div className="px-margin-x max-w-[1280px] mx-auto py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-outline-variant/15">
          <div className="md:col-span-2 space-y-4">
            <div className="text-xl font-bold text-primary">{profile?.name}</div>
            <p className="text-on-surface-variant text-sm max-w-xs leading-relaxed">{profile?.title}</p>
            <div className="flex gap-3 pt-1">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                  aria-label={link.platform}
                >
                  <span className="material-symbols-outlined text-lg">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Navigation</h4>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors" href="#about">About</a></li>
              <li><a className="hover:text-primary transition-colors" href="#experience">Experience</a></li>
              <li><a className="hover:text-primary transition-colors" href="#projects">Projects</a></li>
              <li><a className="hover:text-primary transition-colors" href="#skills">Skills</a></li>
              <li><a className="hover:text-primary transition-colors" href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Contact</h4>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              {profile?.email && (
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">mail</span>
                  <span className="break-all">{profile.email}</span>
                </li>
              )}
              {profile?.phone && (
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">call</span> {profile.phone}
                </li>
              )}
              {profile?.location && (
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">location_on</span> {profile.location}
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="pt-6 flex flex-col-reverse sm:flex-row justify-between items-center gap-3">
          <p className="text-on-surface-variant text-sm">
            © {new Date().getFullYear()} {profile?.name}. All rights reserved.
          </p>
          <a
            href="#"
            className="text-on-surface-variant hover:text-primary text-sm font-semibold transition-colors flex items-center gap-1"
          >
            Back to top
            <span className="material-symbols-outlined text-base">arrow_upward</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
