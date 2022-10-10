export default function Backdrop({ clickFunction, zIndex = "40", opacity }) {
  return (
    <div
      onClick={clickFunction}
      className={`fixed top-0 bottom-0 -left-50 right-0 w-full h-full z-[${zIndex}] opacity-${opacity} bg-backdrop-500 overflow-x-hidden`}
    ></div>
  );
}
