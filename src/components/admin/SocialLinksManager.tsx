"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SocialLink } from "@/lib/types";

export default function SocialLinksManager({ initialLinks }: { initialLinks: SocialLink[] }) {
  const [links, setLinks] = useState(initialLinks);
  const [draft, setDraft] = useState({ platform: "", url: "", icon: "link" });
  const [busy, setBusy] = useState(false);

  async function addLink(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.platform || !draft.url) return;
    setBusy(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("social_links")
      .insert({ ...draft, sort_order: links.length })
      .select()
      .single();
    setBusy(false);
    if (!error && data) {
      setLinks((l) => [...l, data as SocialLink]);
      setDraft({ platform: "", url: "", icon: "link" });
    }
  }

  async function removeLink(id: string) {
    const supabase = createClient();
    await supabase.from("social_links").delete().eq("id", id);
    setLinks((l) => l.filter((link) => link.id !== id));
  }

  async function updateLink(id: string, patch: Partial<SocialLink>) {
    setLinks((l) => l.map((link) => (link.id === id ? { ...link, ...patch } : link)));
    const supabase = createClient();
    await supabase.from("social_links").update(patch).eq("id", id);
  }

  return (
    <div className="bg-white rounded-2xl border border-outline-variant/30 p-6 space-y-4 max-w-3xl">
      <div className="space-y-3">
        {links.map((link) => (
          <div key={link.id} className="flex flex-col sm:flex-row gap-2 sm:items-center border-b border-outline-variant/20 pb-3">
            <input
              className="input sm:w-32"
              value={link.platform}
              onChange={(e) => updateLink(link.id, { platform: e.target.value })}
              placeholder="Platform"
            />
            <input
              className="input flex-1"
              value={link.url}
              onChange={(e) => updateLink(link.id, { url: e.target.value })}
              placeholder="URL"
            />
            <input
              className="input sm:w-32"
              value={link.icon}
              onChange={(e) => updateLink(link.id, { icon: e.target.value })}
              placeholder="Icon"
            />
            <button
              onClick={() => removeLink(link.id)}
              className="text-error text-sm font-semibold px-3 py-2 hover:bg-error/10 rounded-lg"
            >
              Remove
            </button>
          </div>
        ))}
        {links.length === 0 && <p className="text-on-surface-variant text-sm">No links yet.</p>}
      </div>

      <form onSubmit={addLink} className="flex flex-col sm:flex-row gap-2 sm:items-center pt-2">
        <input
          className="input sm:w-32"
          value={draft.platform}
          onChange={(e) => setDraft((d) => ({ ...d, platform: e.target.value }))}
          placeholder="Platform (e.g. GitHub)"
        />
        <input
          className="input flex-1"
          value={draft.url}
          onChange={(e) => setDraft((d) => ({ ...d, url: e.target.value }))}
          placeholder="https://github.com/you"
        />
        <input
          className="input sm:w-32"
          value={draft.icon}
          onChange={(e) => setDraft((d) => ({ ...d, icon: e.target.value }))}
          placeholder="Icon (code)"
        />
        <button
          type="submit"
          disabled={busy}
          className="bg-primary text-white font-semibold rounded-full px-6 py-2 whitespace-nowrap disabled:opacity-60"
        >
          Add link
        </button>
      </form>
    </div>
  );
}
