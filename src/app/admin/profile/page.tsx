import { getProfile } from "@/lib/data";
import ProfileForm from "@/components/admin/ProfileForm";

export default async function ProfileAdminPage() {
  const profile = await getProfile();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Contact & Profile</h1>
        <p className="text-on-surface-variant">This information powers the hero, about, footer and WhatsApp button.</p>
      </div>
      <ProfileForm profile={profile} />
    </div>
  );
}
