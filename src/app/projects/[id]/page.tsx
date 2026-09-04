import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectById, getProfile } from "@/lib/data";
import type { ProjectMedia } from "@/lib/types";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE_URL } from "@/lib/site";

export const revalidate = 0;

function getVideoEmbed(url: string): { kind: "youtube" | "vimeo" | "file"; src: string } {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/);
  if (yt) return { kind: "youtube", src: `https://www.youtube.com/embed/${yt[1]}` };
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return { kind: "vimeo", src: `https://player.vimeo.com/video/${vimeo[1]}` };
  return { kind: "file", src: url };
}

function MediaItem({ media }: { media: ProjectMedia }) {
  if (media.media_type === "video") {
    const embed = getVideoEmbed(media.url);
    if (embed.kind === "file") {
      return (
        <video controls className="w-full h-full object-cover rounded-2xl">
          <source src={embed.src} />
        </video>
      );
    }
    return (
      <iframe
        src={embed.src}
        title="Project video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full aspect-video rounded-2xl border border-outline-variant/30"
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={media.url} alt="Project media" className="w-full h-full object-cover rounded-2xl" />
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return { title: "Project not found" };

  const title = `${project.title} | Case Study`;
  const description = project.description || project.long_description?.slice(0, 160);

  return {
    title,
    description,
    alternates: { canonical: `/projects/${id}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${SITE_URL}/projects/${id}`,
      images: project.image_url ? [{ url: project.image_url }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [project, profile] = await Promise.all([getProjectById(id), getProfile()]);

  if (!project) notFound();

  const paragraphs = (project.long_description || project.description)
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        image: project.image_url || undefined,
        url: `${SITE_URL}/projects/${project.id}`,
        author: profile?.name ? { "@type": "Person", name: profile.name } : undefined,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/#projects` },
          { "@type": "ListItem", position: 3, name: project.title, item: `${SITE_URL}/projects/${project.id}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-4xl mx-auto px-margin-x py-16 md:py-24">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary font-semibold text-sm mb-8 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to portfolio
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-2xl">{project.icon}</span>
          </span>
          {project.category && (
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold">
              {project.category}
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">{project.title}</h1>

        {project.link_url && (
          <a
            href={project.link_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-vibrant-gradient text-white px-6 py-3 rounded-full font-bold soft-shadow hover:scale-105 transition-all mb-10"
          >
            View Live Demo
            <span className="material-symbols-outlined text-lg">open_in_new</span>
          </a>
        )}

        {project.image_url && (
          <div className="rounded-3xl overflow-hidden soft-shadow mb-10 bg-primary/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.image_url} alt={project.title} className="w-full max-h-[480px] object-cover" />
          </div>
        )}

        <div className="prose-content space-y-4 text-lg text-on-surface-variant leading-relaxed mb-12">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {project.project_media.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.project_media.map((media) => (
                <div key={media.id} className="aspect-video">
                  <MediaItem media={media} />
                </div>
              ))}
            </div>
          </section>
        )}

        {project.project_links.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Links &amp; Documents</h2>
            <div className="flex flex-wrap gap-3">
              {project.project_links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-primary text-primary px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-primary/5 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
      <WhatsAppButton number={profile?.whatsapp_number} />
    </>
  );
}
