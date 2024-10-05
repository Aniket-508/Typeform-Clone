export default function Progress({ width, total }) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 bg-[#0077ff] opacity-50"></div>
      <div
        className="fixed top-0 left-0 h-1 bg-[#0077ff] transition-all ease-in-out duration-500"
        style={{
          width: `${(width / total) * 100}%`,
        }}
      />
    </>
  );
}
