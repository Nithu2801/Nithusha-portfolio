import { getSocialLinks } from "@/lib/data";
import SocialLinksManager from "@/components/admin/SocialLinksManager";

export default async function SocialLinksAdminPage() {
  const links = await getSocialLinks();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Social Links</h1>
        <p className="text-on-surface-variant">
          GitHub, LinkedIn and other links shown in the footer. Icon names use{" "}
          <a
            className="text-primary underline"
            href="https://fonts.google.com/icons"
            target="_blank"
            rel="noopener noreferrer"
          >
            Material Symbols
          </a>{" "}
          names (e.g. <code>code</code> for GitHub, <code>share</code> for LinkedIn).
        </p>
      </div>
      <SocialLinksManager initialLinks={links} />
    </div>
  );
}
