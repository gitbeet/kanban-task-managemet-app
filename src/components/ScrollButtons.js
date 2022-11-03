import { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import arrowRight from "../assets/icon-arrow-right.png";

const ScrollButtons = ({ scrollToLeft, scrollToRight }) => {
  // const [innerHeight, setInnerHeight] = useState();
  // useEffect(() => {
  //   function setHeight() {
  //     let vh = Math.floor(window.innerHeight * 0.1);
  //     setInnerHeight(vh);
  //   }

  //   window.addEventListener("resize", setHeight());
  //   return () => window.removeEventListener("resize", setHeight);
  // });

  // let inner = `top-[${innerHeight}vh]`;

  return ReactDOM.createPortal(
    <div
      className={`fixed w-fit z-[0] top-[65vh]   space-y-4 flex flex-col items-center justify-center left-[calc(100%-4rem)]`}
    >
      <div
        onClick={scrollToLeft}
        className="shadow-lg flex items=center justify-center cursor-pointer -left-[4rem] w-10 h-10 bg-primary-600 rounded-full hover-hover:hover:bg-primary-700 transition-all"
      >
        <img
          className="scale-50 invert rotate-180"
          src={arrowRight}
          alt="scroll to left"
        />
      </div>
      <div
        onClick={scrollToRight}
        className="shadow-lg flex items=center justify-center cursor-pointer  left-[4rem] w-10 h-10 bg-primary-600 rounded-full hover-hover:hover:bg-primary-700 transition-all"
      >
        <img
          className="scale-50 invert"
          src={arrowRight}
          alt="scroll to right"
        />
      </div>
    </div>,
    document.getElementById("root")
  );
};

export default ScrollButtons;
