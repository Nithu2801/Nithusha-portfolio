import type { Certification } from "@/lib/types";

export default function CertificationsSection({ certifications }: { certifications: Certification[] }) {
  if (certifications.length === 0) return null;

  return (
    <section className="py-section-padding px-margin-x bg-surface" id="certifications">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16 space-y-stack-sm">
          <p className="text-primary text-sm font-bold tracking-widest uppercase">Certifications</p>
          <h2 className="text-3xl md:text-4xl font-bold">Licenses &amp; Certifications</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl border border-outline-variant/30 p-6 space-y-3 hover-lift"
            >
              <div className="flex items-center gap-3">
                {cert.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cert.image_url} alt={cert.name} className="w-12 h-12 rounded-lg object-cover border" />
                ) : (
                  <span className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-2xl">workspace_premium</span>
                  </span>
                )}
                <div>
                  <h3 className="font-semibold leading-tight">{cert.name}</h3>
                  {cert.issuer && <p className="text-on-surface-variant text-sm">{cert.issuer}</p>}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-on-surface-variant">{cert.issued_date}</span>
                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline"
                  >
                    View credential
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
