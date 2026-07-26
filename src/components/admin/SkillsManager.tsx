"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SkillGroup, SkillItem } from "@/lib/types";

export default function SkillsManager({ initialGroups }: { initialGroups: SkillGroup[] }) {
  const [groups, setGroups] = useState(initialGroups);
  const [newGroup, setNewGroup] = useState({ title: "", icon: "code_blocks" });
  const [newItem, setNewItem] = useState<Record<string, { name: string; level: number }>>({});

  async function addGroup(e: React.FormEvent) {
    e.preventDefault();
    if (!newGroup.title) return;
    const supabase = createClient();
    const { data, error } = await supabase
      .from("skill_groups")
      .insert({ ...newGroup, sort_order: groups.length })
      .select()
      .single();
    if (!error && data) {
      setGroups((g) => [...g, { ...(data as SkillGroup), skill_items: [] }]);
      setNewGroup({ title: "", icon: "code_blocks" });
    }
  }

  async function removeGroup(id: string) {
    const supabase = createClient();
    await supabase.from("skill_groups").delete().eq("id", id);
    setGroups((g) => g.filter((group) => group.id !== id));
  }

  async function updateGroup(id: string, patch: Partial<SkillGroup>) {
    setGroups((g) => g.map((group) => (group.id === id ? { ...group, ...patch } : group)));
    const supabase = createClient();
    await supabase.from("skill_groups").update(patch).eq("id", id);
  }

  async function addItem(groupId: string) {
    const draft = newItem[groupId];
    if (!draft?.name) return;
    const group = groups.find((g) => g.id === groupId);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("skill_items")
      .insert({ group_id: groupId, name: draft.name, level: draft.level ?? 80, sort_order: group?.skill_items.length ?? 0 })
      .select()
      .single();
    if (!error && data) {
      setGroups((gs) =>
        gs.map((g) => (g.id === groupId ? { ...g, skill_items: [...g.skill_items, data as SkillItem] } : g))
      );
      setNewItem((n) => ({ ...n, [groupId]: { name: "", level: 80 } }));
    }
  }

  async function removeItem(groupId: string, itemId: string) {
    const supabase = createClient();
    await supabase.from("skill_items").delete().eq("id", itemId);
    setGroups((gs) =>
      gs.map((g) => (g.id === groupId ? { ...g, skill_items: g.skill_items.filter((i) => i.id !== itemId) } : g))
    );
  }

  async function updateItem(groupId: string, itemId: string, patch: Partial<SkillItem>) {
    setGroups((gs) =>
      gs.map((g) =>
        g.id === groupId
          ? { ...g, skill_items: g.skill_items.map((i) => (i.id === itemId ? { ...i, ...patch } : i)) }
          : g
      )
    );
    const supabase = createClient();
    await supabase.from("skill_items").update(patch).eq("id", itemId);
  }

  return (
    <div className="space-y-4 max-w-3xl">
      {groups.map((group) => (
        <div key={group.id} className="bg-white rounded-2xl border border-outline-variant/30 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <input
              className="input sm:w-56"
              value={group.title}
              onChange={(e) => updateGroup(group.id, { title: e.target.value })}
              placeholder="Group title"
            />
            <input
              className="input sm:w-40"
              value={group.icon}
              onChange={(e) => updateGroup(group.id, { icon: e.target.value })}
              placeholder="Icon"
            />
            <button
              onClick={() => removeGroup(group.id)}
              className="text-error text-sm font-semibold hover:bg-error/10 rounded-lg px-3 py-1 sm:ml-auto"
            >
              Remove group
            </button>
          </div>

          <div className="space-y-3 pl-2 border-l-2 border-outline-variant/20">
            {group.skill_items.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-2 sm:items-center pl-4">
                <input
                  className="input sm:w-40"
                  value={item.name}
                  onChange={(e) => updateItem(group.id, item.id, { name: e.target.value })}
                  placeholder="Skill name"
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={item.level}
                  onChange={(e) => updateItem(group.id, item.id, { level: Number(e.target.value) })}
                  className="flex-1 accent-primary"
                />
                <span className="text-sm font-bold text-primary w-10">{item.level}%</span>
                <button
                  onClick={() => removeItem(group.id, item.id)}
                  className="text-error text-xs font-semibold hover:bg-error/10 rounded-lg px-2 py-1"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row gap-2 sm:items-center pl-4">
              <input
                className="input sm:w-40"
                value={newItem[group.id]?.name ?? ""}
                onChange={(e) => setNewItem((n) => ({ ...n, [group.id]: { name: e.target.value, level: n[group.id]?.level ?? 80 } }))}
                placeholder="New skill"
              />
              <input
                type="range"
                min={0}
                max={100}
                value={newItem[group.id]?.level ?? 80}
                onChange={(e) => setNewItem((n) => ({ ...n, [group.id]: { name: n[group.id]?.name ?? "", level: Number(e.target.value) } }))}
                className="flex-1 accent-primary"
              />
              <span className="text-sm font-bold text-primary w-10">{newItem[group.id]?.level ?? 80}%</span>
              <button
                onClick={() => addItem(group.id)}
                className="bg-primary/10 text-primary text-xs font-bold rounded-lg px-3 py-1.5"
              >
                Add skill
              </button>
            </div>
          </div>
        </div>
      ))}

      <form onSubmit={addGroup} className="bg-white rounded-2xl border-2 border-dashed border-outline-variant/40 p-6 flex flex-col sm:flex-row gap-3 sm:items-center">
        <input
          className="input sm:w-56"
          value={newGroup.title}
          onChange={(e) => setNewGroup((g) => ({ ...g, title: e.target.value }))}
          placeholder="New group title"
        />
        <input
          className="input sm:w-40"
          value={newGroup.icon}
          onChange={(e) => setNewGroup((g) => ({ ...g, icon: e.target.value }))}
          placeholder="Icon"
        />
        <button type="submit" className="bg-primary text-white font-semibold rounded-full px-6 py-2">
          Add group
        </button>
      </form>
    </div>
  );
}
