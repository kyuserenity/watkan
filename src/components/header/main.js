import DesktopHeader from "./desktop";
import MobileHeader from "./mobile";

export default function Header() {
  return (
    <div className="sticky top-0 z-10 bg-zinc-50/75 backdrop-blur-xs dark:bg-zinc-950/75">
      <MobileHeader />
      <DesktopHeader />
    </div>
  );
}
