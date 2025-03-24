import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default async function Layout({ children, modal }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");
  return (
    <>
      <div className="p-6">{children}</div>
      <div className="mt-40"></div>
      {modal}
    </>
  );
}
