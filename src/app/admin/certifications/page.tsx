import { getCertifications } from "@/lib/data";
import CertificationsManager from "@/components/admin/CertificationsManager";

export default async function CertificationsAdminPage() {
  const certifications = await getCertifications();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Certifications</h1>
        <p className="text-on-surface-variant">Licenses and certificates shown on the public site.</p>
      </div>
      <CertificationsManager initialItems={certifications} />
    </div>
  );
}
