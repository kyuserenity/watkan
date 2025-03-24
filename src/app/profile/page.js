import Artwork from "./components/artworks";
import Profile from "./components/profile";

export default function Page() {
  return (
    <>
      <Profile />
      <div className="mt-6 grid grid-cols-2 gap-4 border-t pt-6">
        <Artwork />
        <Artwork />
        <Artwork />
        <Artwork />
      </div>
    </>
  );
}
