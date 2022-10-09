export default function Backdrop({ clickFunction }) {
  return (
    <div
      onClick={clickFunction}
      className="fixed top-0 w-full h-full z-40 bg-backdrop-500"
    ></div>
  );
}
