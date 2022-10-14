import * as ReactDOM from "react-dom";
import arrowRight from "../assets/icon-arrow-right.png";

export default function ScrollButtons({ scrollToLeft, scrollToRight }) {
  return ReactDOM.createPortal(
    <div className="absolute w-fit z-[0] top-[90vh] left-1/2 -translate-x-1/2 space-x-8  flex items-center justify-center md:left-[calc(100%-8rem)]">
      <div
        onClick={scrollToLeft}
        className="shadow-lg flex items=center justify-center cursor-pointer -left-[4rem] w-12 h-12 bg-primary-600 rounded-full hover:bg-primary-700 transition-all"
      >
        <img
          className="scale-50 invert rotate-180"
          src={arrowRight}
          alt="scroll to left"
        />
      </div>
      <div
        onClick={scrollToRight}
        className="shadow-lg flex items=center justify-center cursor-pointer  left-[4rem] w-12 h-12 bg-primary-600 rounded-full hover:bg-primary-700 transition-all"
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
}
