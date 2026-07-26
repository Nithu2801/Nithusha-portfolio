"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadAsset } from "@/lib/upload";
import type { Certification } from "@/lib/types";

const empty = {
  name: "",
  issuer: "",
  issued_date: "",
  credential_url: null as string | null,
  image_url: null as string | null,
};

type Draft = typeof empty;

function CertFields({ value, onChange }: { value: Draft; onChange: (patch: Partial<Draft>) => void }) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadAsset(file, "certifications");
      onChange({ image_url: url });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className="input" value={value.name} onChange={(e) => onChange({ name: e.target.value })} placeholder="Certification name" />
        <input className="input" value={value.issuer} onChange={(e) => onChange({ issuer: e.target.value })} placeholder="Issuer (e.g. Microsoft)" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className="input" value={value.issued_date} onChange={(e) => onChange({ issued_date: e.target.value })} placeholder="Issued date (e.g. 2025)" />
        <input
          className="input"
          value={value.credential_url ?? ""}
          onChange={(e) => onChange({ credential_url: e.target.value })}
          placeholder="Credential URL (optional)"
        />
      </div>
      <div className="flex items-center gap-4">
        {value.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value.image_url} alt="" className="w-12 h-12 object-cover rounded-lg border" />
        )}
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          className="border-2 border-primary text-primary px-4 py-2 rounded-full font-semibold text-sm"
        >
          {uploading ? "Uploading..." : "Upload badge/certificate image"}
        </button>
        <input ref={fileInput} type="file" accept="image/*" hidden onChange={handleUpload} />
      </div>
    </div>
  );
}

export default function CertificationsManager({ initialItems }: { initialItems: Certification[] }) {
  const [items, setItems] = useState(initialItems);
  const [draft, setDraft] = useState<Draft>(empty);
  const [busy, setBusy] = useState(false);

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.name) return;
    setBusy(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("certifications")
      .insert({ ...draft, sort_order: items.length })
      .select()
      .single();
    setBusy(false);
    if (!error && data) {
      setItems((l) => [...l, data as Certification]);
      setDraft(empty);
    }
  }

  async function removeItem(id: string) {
    const supabase = createClient();
    await supabase.from("certifications").delete().eq("id", id);
    setItems((l) => l.filter((i) => i.id !== id));
  }

  async function updateItem(id: string, patch: Partial<Certification>) {
    setItems((l) => l.map((i) => (i.id === id ? { ...i, ...patch } : i)));
    const supabase = createClient();
    await supabase.from("certifications").update(patch).eq("id", id);
  }

  return (
    <div className="space-y-4 max-w-3xl">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-2xl border border-outline-variant/30 p-6 space-y-3">
          <CertFields value={item} onChange={(patch) => updateItem(item.id, patch)} />
          <button onClick={() => removeItem(item.id)} className="text-error text-sm font-semibold hover:bg-error/10 rounded-lg px-3 py-1">
            Remove
          </button>
        </div>
      ))}

      <form onSubmit={addItem} className="bg-white rounded-2xl border-2 border-dashed border-outline-variant/40 p-6 space-y-3">
        <h3 className="font-semibold text-on-surface-variant">Add certification</h3>
        <CertFields value={draft} onChange={(patch) => setDraft((d) => ({ ...d, ...patch }))} />
        <button type="submit" disabled={busy} className="bg-primary text-white font-semibold rounded-full px-6 py-2 disabled:opacity-60">
          Add
        </button>
      </form>
    </div>
  );
}
