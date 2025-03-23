import Profile from "./profile";

export default function Layout({ children }) {
  return (
    <>
      <Profile />
      <div className="px-6">{children}</div>
      <div className="mt-40"></div>
    </>
  );
}
