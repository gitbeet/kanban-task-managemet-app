const Backdrop = ({ clickFunction, opacity = "100" }) => {
  return (
    <div
      onClick={clickFunction}
      className={`fixed top-0 bottom-0 left-0 right-0 w-full h-full opacity-${opacity} bg-backdrop-500 overflow-x-hidden`}
    ></div>
  );
};

export default Backdrop;
