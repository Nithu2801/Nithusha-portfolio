"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm font-semibold text-on-surface-variant hover:text-error transition-colors flex items-center gap-2"
    >
      <span className="material-symbols-outlined text-lg">logout</span>
      Log out
    </button>
  );
}
