export default function Backdrop({
  clickFunction,
  zIndex = "1000",
  opacity = "100",
}) {
  return (
    <div
      onClick={clickFunction}
      className={`fixed top-0 bottom-0 left-0 right-0 w-full h-full z-[${zIndex}] opacity-${opacity} bg-backdrop-500 overflow-x-hidden`}
    ></div>
  );
}
