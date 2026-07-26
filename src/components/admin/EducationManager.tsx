"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Education } from "@/lib/types";

const empty = { institution: "", degree: "", period: "", description: "" };

export default function EducationManager({ initialItems }: { initialItems: Education[] }) {
  const [items, setItems] = useState(initialItems);
  const [draft, setDraft] = useState(empty);
  const [busy, setBusy] = useState(false);

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.institution || !draft.degree) return;
    setBusy(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("education")
      .insert({ ...draft, sort_order: items.length })
      .select()
      .single();
    setBusy(false);
    if (!error && data) {
      setItems((l) => [...l, data as Education]);
      setDraft(empty);
    }
  }

  async function removeItem(id: string) {
    const supabase = createClient();
    await supabase.from("education").delete().eq("id", id);
    setItems((l) => l.filter((i) => i.id !== id));
  }

  async function updateItem(id: string, patch: Partial<Education>) {
    setItems((l) => l.map((i) => (i.id === id ? { ...i, ...patch } : i)));
    const supabase = createClient();
    await supabase.from("education").update(patch).eq("id", id);
  }

  return (
    <div className="space-y-4 max-w-3xl">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-2xl border border-outline-variant/30 p-6 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className="input" value={item.degree} onChange={(e) => updateItem(item.id, { degree: e.target.value })} placeholder="Degree / Qualification" />
            <input className="input" value={item.institution} onChange={(e) => updateItem(item.id, { institution: e.target.value })} placeholder="Institution" />
          </div>
          <input className="input" value={item.period} onChange={(e) => updateItem(item.id, { period: e.target.value })} placeholder="Period (e.g. 2025 – Present)" />
          <textarea
            className="input min-h-16"
            value={item.description}
            onChange={(e) => updateItem(item.id, { description: e.target.value })}
            placeholder="Description (optional)"
          />
          <button onClick={() => removeItem(item.id)} className="text-error text-sm font-semibold hover:bg-error/10 rounded-lg px-3 py-1">
            Remove
          </button>
        </div>
      ))}

      <form onSubmit={addItem} className="bg-white rounded-2xl border-2 border-dashed border-outline-variant/40 p-6 space-y-3">
        <h3 className="font-semibold text-on-surface-variant">Add education</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input className="input" value={draft.degree} onChange={(e) => setDraft((d) => ({ ...d, degree: e.target.value }))} placeholder="Degree / Qualification" />
          <input className="input" value={draft.institution} onChange={(e) => setDraft((d) => ({ ...d, institution: e.target.value }))} placeholder="Institution" />
        </div>
        <input className="input" value={draft.period} onChange={(e) => setDraft((d) => ({ ...d, period: e.target.value }))} placeholder="Period" />
        <textarea
          className="input min-h-16"
          value={draft.description}
          onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
          placeholder="Description (optional)"
        />
        <button type="submit" disabled={busy} className="bg-primary text-white font-semibold rounded-full px-6 py-2 disabled:opacity-60">
          Add
        </button>
      </form>
    </div>
  );
}
