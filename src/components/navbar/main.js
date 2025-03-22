import DesktopNavbar from "./desktop";
import MobileNavbar from "./mobile";

export default function Navbar() {
  return (
    <div>
      <MobileNavbar />
      <DesktopNavbar />
    </div>
  );
}
