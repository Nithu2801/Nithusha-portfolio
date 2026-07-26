import { createClient } from "@/lib/supabase/server";
import type {
  Profile,
  SocialLink,
  SkillGroup,
  Experience,
  Project,
  ProjectWithDetails,
  Education,
  Certification,
} from "@/lib/types";

export async function getProfile(): Promise<Profile> {
  const supabase = await createClient();
  const { data } = await supabase.from("profile").select("*").eq("id", 1).single();
  return data as Profile;
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("social_links").select("*").order("sort_order");
  return (data ?? []) as SocialLink[];
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("skill_groups")
    .select("*, skill_items(*)")
    .order("sort_order");
  const groups = (data ?? []) as SkillGroup[];
  return groups.map((g) => ({
    ...g,
    skill_items: (g.skill_items ?? []).slice().sort((a, b) => a.sort_order - b.sort_order),
  }));
}

export async function getExperience(): Promise<Experience[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("experience").select("*").order("sort_order");
  return (data ?? []) as Experience[];
}

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("projects").select("*").order("sort_order");
  return (data ?? []) as Project[];
}

export async function getProjectById(id: string): Promise<ProjectWithDetails | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*, project_media(*), project_links(*)")
    .eq("id", id)
    .single();
  if (!data) return null;
  const project = data as ProjectWithDetails;
  return {
    ...project,
    project_media: (project.project_media ?? []).slice().sort((a, b) => a.sort_order - b.sort_order),
    project_links: (project.project_links ?? []).slice().sort((a, b) => a.sort_order - b.sort_order),
  };
}

export async function getEducation(): Promise<Education[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("education").select("*").order("sort_order");
  return (data ?? []) as Education[];
}

export async function getCertifications(): Promise<Certification[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("certifications").select("*").order("sort_order");
  return (data ?? []) as Certification[];
}
