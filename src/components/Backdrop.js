export default function Backdrop({ clickFunction, zIndex = "40" }) {
  return (
    <div
      onClick={clickFunction}
      className={`fixed top-0 w-full h-full z-[${zIndex}] bg-backdrop-500`}
    ></div>
  );
}
