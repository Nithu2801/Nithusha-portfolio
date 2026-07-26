"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Experience } from "@/lib/types";

const empty = { role: "", company: "", period: "", description: "" };

export default function ExperienceManager({ initialItems }: { initialItems: Experience[] }) {
  const [items, setItems] = useState(initialItems);
  const [draft, setDraft] = useState(empty);
  const [busy, setBusy] = useState(false);

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.role || !draft.company) return;
    setBusy(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("experience")
      .insert({ ...draft, sort_order: items.length })
      .select()
      .single();
    setBusy(false);
    if (!error && data) {
      setItems((l) => [...l, data as Experience]);
      setDraft(empty);
    }
  }

  async function removeItem(id: string) {
    const supabase = createClient();
    await supabase.from("experience").delete().eq("id", id);
    setItems((l) => l.filter((i) => i.id !== id));
  }

  async function updateItem(id: string, patch: Partial<Experience>) {
    setItems((l) => l.map((i) => (i.id === id ? { ...i, ...patch } : i)));
    const supabase = createClient();
    await supabase.from("experience").update(patch).eq("id", id);
  }

  return (
    <div className="space-y-4 max-w-3xl">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-2xl border border-outline-variant/30 p-6 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className="input" value={item.role} onChange={(e) => updateItem(item.id, { role: e.target.value })} placeholder="Role" />
            <input className="input" value={item.company} onChange={(e) => updateItem(item.id, { company: e.target.value })} placeholder="Company" />
          </div>
          <input className="input" value={item.period} onChange={(e) => updateItem(item.id, { period: e.target.value })} placeholder="Period (e.g. Jan 2025 – June 2025)" />
          <textarea
            className="input min-h-20"
            value={item.description}
            onChange={(e) => updateItem(item.id, { description: e.target.value })}
            placeholder="Description"
          />
          <button onClick={() => removeItem(item.id)} className="text-error text-sm font-semibold hover:bg-error/10 rounded-lg px-3 py-1">
            Remove
          </button>
        </div>
      ))}

      <form onSubmit={addItem} className="bg-white rounded-2xl border-2 border-dashed border-outline-variant/40 p-6 space-y-3">
        <h3 className="font-semibold text-on-surface-variant">Add experience</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input className="input" value={draft.role} onChange={(e) => setDraft((d) => ({ ...d, role: e.target.value }))} placeholder="Role" />
          <input className="input" value={draft.company} onChange={(e) => setDraft((d) => ({ ...d, company: e.target.value }))} placeholder="Company" />
        </div>
        <input className="input" value={draft.period} onChange={(e) => setDraft((d) => ({ ...d, period: e.target.value }))} placeholder="Period" />
        <textarea
          className="input min-h-20"
          value={draft.description}
          onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
          placeholder="Description"
        />
        <button type="submit" disabled={busy} className="bg-primary text-white font-semibold rounded-full px-6 py-2 disabled:opacity-60">
          Add
        </button>
      </form>
    </div>
  );
}
