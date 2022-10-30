import { useEffect } from "react";

export default function useKeyboardControl(onPressEnter, onPressEscape) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Enter") {
        onPressEnter();
      }
      if (e.key === "Escape") {
        onPressEscape();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });
}
