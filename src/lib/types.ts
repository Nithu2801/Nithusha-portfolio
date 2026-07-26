export type Profile = {
  id: number;
  name: string;
  title: string;
  tagline: string;
  bio: string;
  about_text: string;
  location: string;
  email: string;
  phone: string;
  whatsapp_number: string;
  hero_image_url: string | null;
  cv_url: string | null;
  stat_projects: string | null;
  stat_satisfaction: string | null;
};

export type SocialLink = {
  id: string;
  platform: string;
  url: string;
  icon: string;
  sort_order: number;
};

export type SkillItem = {
  id: string;
  group_id: string;
  name: string;
  level: number;
  sort_order: number;
};

export type SkillGroup = {
  id: string;
  title: string;
  icon: string;
  sort_order: number;
  skill_items: SkillItem[];
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  sort_order: number;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  long_description: string;
  category: string;
  icon: string;
  image_url: string | null;
  link_url: string | null;
  layout_size: "large" | "medium" | "small";
  is_featured: boolean;
  sort_order: number;
};

export type ProjectMedia = {
  id: string;
  project_id: string;
  media_type: "image" | "video";
  url: string;
  sort_order: number;
};

export type ProjectLink = {
  id: string;
  project_id: string;
  label: string;
  url: string;
  icon: string;
  sort_order: number;
};

export type ProjectWithDetails = Project & {
  project_media: ProjectMedia[];
  project_links: ProjectLink[];
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description: string;
  sort_order: number;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  issued_date: string;
  credential_url: string | null;
  image_url: string | null;
  sort_order: number;
};
