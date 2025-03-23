import Artwork from "./components/artworks";

export default function Page() {
  return (
    <div className="grid grid-cols-2 gap-4 border-t pt-6">
      <Artwork />
      <Artwork />
      <Artwork />
      <Artwork />
    </div>
  );
}
