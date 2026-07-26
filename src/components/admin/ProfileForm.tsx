"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { uploadAsset } from "@/lib/upload";
import type { Profile } from "@/lib/types";

export default function ProfileForm({ profile }: { profile: Profile }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: profile?.name ?? "",
    title: profile?.title ?? "",
    tagline: profile?.tagline ?? "",
    bio: profile?.bio ?? "",
    about_text: profile?.about_text ?? "",
    location: profile?.location ?? "",
    email: profile?.email ?? "",
    phone: profile?.phone ?? "",
    whatsapp_number: profile?.whatsapp_number ?? "",
    stat_projects: profile?.stat_projects ?? "",
    stat_satisfaction: profile?.stat_satisfaction ?? "",
    hero_image_url: profile?.hero_image_url ?? "",
    cv_url: profile?.cv_url ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<"image" | "cv" | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  const cvInput = useRef<HTMLInputElement>(null);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>, field: "hero_image_url" | "cv_url") {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(field === "hero_image_url" ? "image" : "cv");
    try {
      const url = await uploadAsset(file, field === "hero_image_url" ? "hero" : "cv");
      update(field, url);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(null);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const supabase = createClient();
    const { error } = await supabase.from("profile").update(form).eq("id", 1);
    setSaving(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage("Saved.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSave} className="bg-white rounded-2xl border border-outline-variant/30 p-6 space-y-6 max-w-2xl">
      {message && <div className="bg-primary/10 text-primary text-sm rounded-lg px-4 py-2">{message}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full name">
          <input className="input" value={form.name} onChange={(e) => update("name", e.target.value)} />
        </Field>
        <Field label="Title">
          <input className="input" value={form.title} onChange={(e) => update("title", e.target.value)} />
        </Field>
      </div>

      <Field label="Hero tagline">
        <input className="input" value={form.tagline} onChange={(e) => update("tagline", e.target.value)} />
      </Field>

      <Field label="Bio (short summary shown in the hero section)">
        <textarea className="input min-h-28" value={form.bio} onChange={(e) => update("bio", e.target.value)} />
      </Field>

      <Field label="About Me (personal paragraph shown in the About section)">
        <textarea
          className="input min-h-28"
          value={form.about_text}
          onChange={(e) => update("about_text", e.target.value)}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Location">
          <input className="input" value={form.location} onChange={(e) => update("location", e.target.value)} />
        </Field>
        <Field label="Email">
          <input className="input" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
        </Field>
        <Field label="Phone (display)">
          <input className="input" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        </Field>
        <Field label="WhatsApp number (digits only, with country code)">
          <input
            className="input"
            placeholder="94771234567"
            value={form.whatsapp_number}
            onChange={(e) => update("whatsapp_number", e.target.value.replace(/[^0-9]/g, ""))}
          />
        </Field>
        <Field label="Stat: projects completed">
          <input className="input" value={form.stat_projects} onChange={(e) => update("stat_projects", e.target.value)} />
        </Field>
        <Field label="Stat: client satisfaction">
          <input
            className="input"
            value={form.stat_satisfaction}
            onChange={(e) => update("stat_satisfaction", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Hero / profile photo">
        <div className="flex items-center gap-4">
          {form.hero_image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.hero_image_url} alt="" className="w-16 h-16 rounded-xl object-cover border" />
          )}
          <button
            type="button"
            onClick={() => imageInput.current?.click()}
            className="border-2 border-primary text-primary px-4 py-2 rounded-full font-semibold text-sm"
          >
            {uploading === "image" ? "Uploading..." : "Upload image"}
          </button>
          <input ref={imageInput} type="file" accept="image/*" hidden onChange={(e) => handleUpload(e, "hero_image_url")} />
        </div>
      </Field>

      <Field label="CV / Resume (PDF)">
        <div className="flex items-center gap-4">
          {form.cv_url && (
            <a href={form.cv_url} target="_blank" rel="noopener noreferrer" className="text-primary text-sm underline">
              Current CV
            </a>
          )}
          <button
            type="button"
            onClick={() => cvInput.current?.click()}
            className="border-2 border-primary text-primary px-4 py-2 rounded-full font-semibold text-sm"
          >
            {uploading === "cv" ? "Uploading..." : "Upload CV"}
          </button>
          <input ref={cvInput} type="file" accept="application/pdf" hidden onChange={(e) => handleUpload(e, "cv_url")} />
        </div>
      </Field>

      <button
        type="submit"
        disabled={saving}
        className="bg-vibrant-gradient text-white font-bold rounded-full px-8 py-3 hover:scale-105 transition-transform disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-semibold text-on-surface-variant">{label}</span>
      {children}
    </label>
  );
}
