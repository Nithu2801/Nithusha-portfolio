"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadAsset } from "@/lib/upload";
import type { Project } from "@/lib/types";

const empty = {
  title: "",
  description: "",
  category: "",
  icon: "dashboard_customize",
  image_url: null as string | null,
  link_url: null as string | null,
  layout_size: "medium" as Project["layout_size"],
};

type ProjectDraftFields = typeof empty;

function ProjectFields({
  value,
  onChange,
}: {
  value: ProjectDraftFields;
  onChange: (patch: Partial<ProjectDraftFields>) => void;
}) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadAsset(file, "projects");
      onChange({ image_url: url });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className="input" value={value.title} onChange={(e) => onChange({ title: e.target.value })} placeholder="Title" />
        <input className="input" value={value.category} onChange={(e) => onChange({ category: e.target.value })} placeholder="Category (e.g. Enterprise)" />
      </div>
      <textarea
        className="input min-h-20"
        value={value.description}
        onChange={(e) => onChange({ description: e.target.value })}
        placeholder="Description"
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input className="input" value={value.icon} onChange={(e) => onChange({ icon: e.target.value })} placeholder="Icon (Material Symbols name)" />
        <input className="input" value={value.link_url ?? ""} onChange={(e) => onChange({ link_url: e.target.value })} placeholder="Link URL (optional)" />
        <select
          className="input"
          value={value.layout_size}
          onChange={(e) => onChange({ layout_size: e.target.value as Project["layout_size"] })}
        >
          <option value="large">Large (featured)</option>
          <option value="medium">Medium</option>
          <option value="small">Small</option>
        </select>
      </div>
      <div className="flex items-center gap-4">
        {value.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value.image_url} alt="" className="w-20 h-14 object-cover rounded-lg border" />
        )}
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          className="border-2 border-primary text-primary px-4 py-2 rounded-full font-semibold text-sm"
        >
          {uploading ? "Uploading..." : "Upload image"}
        </button>
        <input ref={fileInput} type="file" accept="image/*" hidden onChange={handleUpload} />
      </div>
    </div>
  );
}

export default function ProjectsManager({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [draft, setDraft] = useState<typeof empty>(empty);
  const [busy, setBusy] = useState(false);

  async function addProject(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.title) return;
    setBusy(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("projects")
      .insert({ ...draft, sort_order: projects.length })
      .select()
      .single();
    setBusy(false);
    if (!error && data) {
      setProjects((p) => [...p, data as Project]);
      setDraft(empty);
    }
  }

  async function removeProject(id: string) {
    const supabase = createClient();
    await supabase.from("projects").delete().eq("id", id);
    setProjects((p) => p.filter((proj) => proj.id !== id));
  }

  async function updateProject(id: string, patch: Partial<Project>) {
    setProjects((p) => p.map((proj) => (proj.id === id ? { ...proj, ...patch } : proj)));
    const supabase = createClient();
    await supabase.from("projects").update(patch).eq("id", id);
  }

  return (
    <div className="space-y-4 max-w-3xl">
      {projects.map((project) => (
        <div key={project.id} className="bg-white rounded-2xl border border-outline-variant/30 p-6 space-y-3">
          <ProjectFields value={project} onChange={(patch) => updateProject(project.id, patch)} />
          <button
            onClick={() => removeProject(project.id)}
            className="text-error text-sm font-semibold hover:bg-error/10 rounded-lg px-3 py-1"
          >
            Remove
          </button>
        </div>
      ))}

      <form onSubmit={addProject} className="bg-white rounded-2xl border-2 border-dashed border-outline-variant/40 p-6 space-y-3">
        <h3 className="font-semibold text-on-surface-variant">Add project</h3>
        <ProjectFields value={draft} onChange={(patch) => setDraft((d) => ({ ...d, ...patch }))} />
        <button type="submit" disabled={busy} className="bg-primary text-white font-semibold rounded-full px-6 py-2 disabled:opacity-60">
          Add
        </button>
      </form>
    </div>
  );
}
