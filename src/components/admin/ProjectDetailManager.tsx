"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { uploadAsset } from "@/lib/upload";
import type { ProjectWithDetails, ProjectLink, ProjectMedia } from "@/lib/types";

export default function ProjectDetailManager({ project }: { project: ProjectWithDetails }) {
  const router = useRouter();
  const [longDescription, setLongDescription] = useState(project.long_description);
  const [saving, setSaving] = useState(false);
  const [media, setMedia] = useState(project.project_media);
  const [links, setLinks] = useState(project.project_links);
  const [videoUrl, setVideoUrl] = useState("");
  const [linkDraft, setLinkDraft] = useState({ label: "", url: "", icon: "description" });
  const imageInput = useRef<HTMLInputElement>(null);
  const videoFileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<"image" | "video" | null>(null);

  async function saveDescription() {
    setSaving(true);
    const supabase = createClient();
    await supabase.from("projects").update({ long_description: longDescription }).eq("id", project.id);
    setSaving(false);
    router.refresh();
  }

  async function addImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading("image");
    try {
      const url = await uploadAsset(file, `project-media/${project.id}`);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("project_media")
        .insert({ project_id: project.id, media_type: "image", url, sort_order: media.length })
        .select()
        .single();
      if (!error && data) setMedia((m) => [...m, data as ProjectMedia]);
    } finally {
      setUploading(null);
    }
  }

  async function addVideoFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading("video");
    try {
      const url = await uploadAsset(file, `project-media/${project.id}`);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("project_media")
        .insert({ project_id: project.id, media_type: "video", url, sort_order: media.length })
        .select()
        .single();
      if (!error && data) setMedia((m) => [...m, data as ProjectMedia]);
    } finally {
      setUploading(null);
    }
  }

  async function addVideoUrl(e: React.FormEvent) {
    e.preventDefault();
    if (!videoUrl) return;
    const supabase = createClient();
    const { data, error } = await supabase
      .from("project_media")
      .insert({ project_id: project.id, media_type: "video", url: videoUrl, sort_order: media.length })
      .select()
      .single();
    if (!error && data) {
      setMedia((m) => [...m, data as ProjectMedia]);
      setVideoUrl("");
    }
  }

  async function removeMedia(id: string) {
    const supabase = createClient();
    await supabase.from("project_media").delete().eq("id", id);
    setMedia((m) => m.filter((item) => item.id !== id));
  }

  async function addLink(e: React.FormEvent) {
    e.preventDefault();
    if (!linkDraft.label || !linkDraft.url) return;
    const supabase = createClient();
    const { data, error } = await supabase
      .from("project_links")
      .insert({ project_id: project.id, ...linkDraft, sort_order: links.length })
      .select()
      .single();
    if (!error && data) {
      setLinks((l) => [...l, data as ProjectLink]);
      setLinkDraft({ label: "", url: "", icon: "description" });
    }
  }

  async function removeLink(id: string) {
    const supabase = createClient();
    await supabase.from("project_links").delete().eq("id", id);
    setLinks((l) => l.filter((link) => link.id !== id));
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="bg-white rounded-2xl border border-outline-variant/30 p-6 space-y-3">
        <h2 className="font-bold">Full case-study write-up</h2>
        <textarea
          className="input min-h-40"
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
          placeholder="Write the full story: the problem, your approach, key features, challenges and outcome. Separate paragraphs with a blank line."
        />
        <button
          onClick={saveDescription}
          disabled={saving}
          className="bg-vibrant-gradient text-white font-bold rounded-full px-6 py-2.5 text-sm disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save write-up"}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant/30 p-6 space-y-4">
        <h2 className="font-bold">Gallery (photos &amp; videos)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {media.map((item) => (
            <div key={item.id} className="relative rounded-xl overflow-hidden border border-outline-variant/30 aspect-video bg-surface-container-low">
              {item.media_type === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.url} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-3xl">smart_display</span>
                </div>
              )}
              <button
                onClick={() => removeMedia(item.id)}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                aria-label="Remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => imageInput.current?.click()}
            className="border-2 border-primary text-primary px-4 py-2 rounded-full font-semibold text-sm"
          >
            {uploading === "image" ? "Uploading..." : "Upload photo"}
          </button>
          <input ref={imageInput} type="file" accept="image/*" hidden onChange={addImage} />
          <button
            type="button"
            onClick={() => videoFileInput.current?.click()}
            className="border-2 border-primary text-primary px-4 py-2 rounded-full font-semibold text-sm"
          >
            {uploading === "video" ? "Uploading..." : "Upload video file"}
          </button>
          <input ref={videoFileInput} type="file" accept="video/*" hidden onChange={addVideoFile} />
        </div>
        <form onSubmit={addVideoUrl} className="flex gap-2">
          <input
            className="input"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Or paste a YouTube / Vimeo link"
          />
          <button type="submit" className="bg-primary text-white font-semibold rounded-full px-5 whitespace-nowrap">
            Add link
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant/30 p-6 space-y-4">
        <h2 className="font-bold">Links &amp; documents</h2>
        <div className="space-y-2">
          {links.map((link) => (
            <div key={link.id} className="flex items-center gap-2 border-b border-outline-variant/20 pb-2">
              <span className="material-symbols-outlined text-primary text-lg">{link.icon}</span>
              <span className="text-sm font-semibold w-32 truncate">{link.label}</span>
              <span className="text-sm text-on-surface-variant flex-1 truncate">{link.url}</span>
              <button onClick={() => removeLink(link.id)} className="text-error text-xs font-semibold hover:bg-error/10 rounded-lg px-2 py-1">
                Remove
              </button>
            </div>
          ))}
          {links.length === 0 && <p className="text-on-surface-variant text-sm">No links yet.</p>}
        </div>
        <form onSubmit={addLink} className="flex flex-col sm:flex-row gap-2">
          <input
            className="input sm:w-32"
            value={linkDraft.label}
            onChange={(e) => setLinkDraft((d) => ({ ...d, label: e.target.value }))}
            placeholder="Label (e.g. GitHub Repo)"
          />
          <input
            className="input flex-1 min-w-0"
            value={linkDraft.url}
            onChange={(e) => setLinkDraft((d) => ({ ...d, url: e.target.value }))}
            placeholder="https://..."
          />
          <input
            className="input sm:w-28"
            value={linkDraft.icon}
            onChange={(e) => setLinkDraft((d) => ({ ...d, icon: e.target.value }))}
            placeholder="Icon"
          />
          <button type="submit" className="bg-primary text-white font-semibold rounded-full px-6 whitespace-nowrap">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
