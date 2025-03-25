import { createClient } from "@/utils/supabase/server";

export default async function Layout({ children }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  return (
    <>
      <div className="p-4">{children}</div>
      <div className="mt-40"></div>
    </>
  );
}
