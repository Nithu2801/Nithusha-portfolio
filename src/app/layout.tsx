import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { getProfile, getSkillGroups } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const [profile, skillGroups] = await Promise.all([getProfile(), getSkillGroups()]);
  const title = `${profile?.name || "Portfolio"} | ${profile?.title || "Full Stack Developer"}`;
  const description =
    profile?.bio ||
    profile?.tagline ||
    `${profile?.name || "Full stack developer"} — ${profile?.title || "Full Stack Developer"} based in ${
      profile?.location || "Sri Lanka"
    }.`;
  const keywords = [
    profile?.name,
    profile?.title,
    "Full Stack Developer",
    "Web Developer",
    profile?.location,
    ...skillGroups.flatMap((g) => g.skill_items.map((s) => s.name)),
  ].filter(Boolean) as string[];

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s | ${profile?.name || "Portfolio"}` },
    description,
    keywords,
    authors: profile?.name ? [{ name: profile.name, url: SITE_URL }] : undefined,
    creator: profile?.name,
    alternates: { canonical: "/" },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: SITE_URL,
      siteName: `${profile?.name || "Portfolio"}`,
      title,
      description,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${hankenGrotesk.variable} h-full scroll-smooth`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased" style={{ fontFamily: "var(--font-hanken-grotesk)" }}>
        {children}
      </body>
    </html>
  );
}
