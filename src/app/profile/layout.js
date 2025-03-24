export default function Layout({ children, modal }) {
  return (
    <>
      <div className="p-6">{children}</div>
      <div className="mt-40"></div>
      {modal}
    </>
  );
}
