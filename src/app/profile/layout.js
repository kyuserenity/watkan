export default async function Layout({ children }) {
  return (
    <>
      <div className="p-6">{children}</div>
      <div className="mt-40"></div>
    </>
  );
}
