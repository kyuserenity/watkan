import Artwork from "./components/artworks";
import Profile from "./components/profile";

export default async function Page() {
  return (
    <>
      <Profile />
      <Artwork />
      <div className="mt-40"></div>
    </>
  );
}
